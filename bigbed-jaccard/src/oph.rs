use crate::hash::hash;

use rand::prelude::*;

use std::error::Error;
use std::fmt;

#[derive(Debug)]
pub struct EmptySketchError;

impl fmt::Display for EmptySketchError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "All bins of sketch were empty, could not densify.")
    }
}

impl Error for EmptySketchError {}

#[derive(Debug)]
pub struct SketchLengthMismatchError;

impl fmt::Display for SketchLengthMismatchError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Sketches to compare must be the same length")
    }
}

impl Error for SketchLengthMismatchError {}

const OPH_SEED: u64 = 12_963_566_592_248_599_713;

enum DensificationMethod {
    Optimal,
    Improved,
}

pub struct OnePermutationHasher {
    num_bins: usize,
    offset: u32,
    rng: StdRng,
    indicators: Option<Vec<bool>>,
    densification_method: Option<DensificationMethod>,
}

impl OnePermutationHasher {
    /// Initalize struct that will use optimal densification. To use the improved
    /// densification from Shrivastava and Li 2014, use the other constructor
    /// `new_with_improved_densification`
    pub fn new(num_bins: usize) -> Self {
        let rng: StdRng = SeedableRng::seed_from_u64(OPH_SEED);
        let offset = std::u32::MAX / (num_bins as u32) + 1;
        OnePermutationHasher {
            num_bins,
            offset,
            rng,
            indicators: None,
            densification_method: Some(DensificationMethod::Optimal)
        }
    }

    pub fn with_improved_densification(mut self) -> Self {
        self.densification_method = Some(DensificationMethod::Improved);
        self
    }

    pub fn get_indicators(&mut self) -> &Vec<bool> {
        match &self.indicators {
            Some(_) => {}
            None => {
                let mut indicators = vec![false; self.num_bins];
                for elem in indicators.iter_mut() {
                    *elem = self.rng.gen_bool(0.5);
                }
                self.indicators = Some(indicators);
            }
        }
        self.indicators.as_ref().unwrap()
    }

    /// Given a sketch containing potentially empty values (None), densify it according
    /// to the improved densification scheme of Shrivastava and Li 2014
    /// http://www.auai.org/uai2014/proceedings/individuals/225.pdf
    /// Basically, to fill empty bins, we find the next non-empty bin in the direction
    /// depending on the value for the indicator for that bin. Then we fill the bin with
    /// the value of the neighboring non-empty bin plus a constant times the number of
    /// bins traveled to reach the non-empty bin (always at least 1).
    fn densify_improved(&mut self, sketch: &[Option<u32>]) -> Result<Vec<u32>, EmptySketchError> {
        let mut dense = vec![0; self.num_bins];
        let offset = self.offset;
        let indicators = self.get_indicators();
        for (i, value) in sketch.iter().enumerate() {
            dense[i] = match value {
                Some(val) => *val,
                None => {
                    let search_result = if indicators[i] {
                        // Look for closest non-empty bin to the right
                        sketch[i + 1..sketch.len()]
                            .iter()
                            .chain(sketch[0..i].iter())
                            .enumerate()
                            .find(|(_, x)| !x.is_none())
                    } else {
                        // Look to the left, note the reversal of the iterator order
                        sketch[i + 1..sketch.len()]
                            .iter()
                            .chain(sketch[0..i].iter())
                            .rev()
                            .enumerate()
                            .find(|(_, x)| !x.is_none())
                    };
                    match search_result {
                        // We already checked above that value is Some.
                        Some((index, Some(value))) => value + (index as u32 + 1) * offset,
                        _ => return Err(EmptySketchError),
                    }
                }
            };
        }
        Ok(dense)
    }

    /// Implementation of optimal densification scheme from Shrivastava 2017, see
    /// https://arxiv.org/pdf/1703.04664.pdf . Rather than borrowing from neighboring
    /// bins, we randomly search the bin indexed by the evauluation of a hash function.
    /// We feed the number of attempts to avoid cycles.
    fn densify_optimal(&self, sketch: &[Option<u32>]) -> Result<Vec<u32>, EmptySketchError> {
        let mut dense = vec![0; self.num_bins];
        for (i, value) in sketch.iter().enumerate() {
            dense[i] = match value {
                Some(val) => *val,
                None => {
                    let mut attempts = 1;
                    let mut next_bin = hash(i as u32 + attempts) % self.num_bins as u32;
                    while sketch[next_bin as usize].is_none() {
                        attempts += 1;
                        next_bin = hash(i as u32 + attempts) % self.num_bins as u32;
                    }
                    match sketch[next_bin as usize] {
                        // We already checked above that value is Some.
                        Some(value) => value,
                        _ => return Err(EmptySketchError),
                    }
                }
            };
        }
        Ok(dense)
    }

    /// Return an un-densified sketch of the data using the one-permutation hashing (OPH).
    fn sketch(&self, data: &[u32]) -> Vec<Option<u32>> {
        let mut output = vec![None; self.num_bins];
        for &i in data.iter() {
            let current_hash = hash(i);
            let bin = (current_hash % self.num_bins as u32) as usize;
            match output[bin] {
                Some(val) => {
                    if current_hash < val {
                        output[bin] = Some(current_hash);
                    }
                }
                None => output[bin] = Some(current_hash),
            }
        }
        output
    }

    pub fn dense_sketch(&mut self, data: &[u32]) -> Result<Vec<u32>, EmptySketchError> {
        let sketch = self.sketch(data);
        match self.densification_method {
            Some(DensificationMethod::Optimal) => self.densify_optimal(&sketch),
            Some(DensificationMethod::Improved) => self.densify_improved(&sketch),
            None => panic!("No densification method set")
        }
    }

    /// Compute Jaccard estimator, see Anshumali & Li `Densifying One Permutation
    /// Hashing via Rotation for Fast Near Neighbor Search` for details,
    /// http://proceedings.mlr.press/v32/shrivastava14.pdf
    /// Take the number of matching elements and divide by the total length.
    pub fn jaccard<T: Eq>(
        dense_sketch_1: &[T],
        dense_sketch_2: &[T],
    ) -> Result<f64, SketchLengthMismatchError> {
        let total = dense_sketch_1.len();
        if dense_sketch_2.len() != total {
            return Err(SketchLengthMismatchError);
        }
        let mut shared = 0;
        for (val1, val2) in dense_sketch_1.iter().zip(dense_sketch_2.iter()) {
            if val1 == val2 {
                shared += 1;
            }
        }
        Ok(shared as f64 / total as f64)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use float_cmp::approx_eq;

    /// Test using the constant RNG seed.
    #[test]
    fn test_one_permutation_hasher_new() {
        let mut oph = OnePermutationHasher::new(3);
        assert_eq!(oph.get_indicators(), &vec![true, false, true]);
    }

    #[test]
    fn test_one_permutation_hasher_densify_improved() {
        let mut oph = OnePermutationHasher::new(4).with_improved_densification();
        let data = [None, None, None, Some(2)];
        let dense = oph.densify_improved(&data).unwrap();
        assert_eq!(
            dense,
            vec![2 + 3 * oph.offset, 2 + 2 * oph.offset, 2 + oph.offset, 2]
        );
    }

    #[test]
    fn test_one_permutation_hasher_densify_optimal() {
        let oph = OnePermutationHasher::new(4);
        let data = [None, None, Some(1), Some(2)];
        let dense = oph.densify_optimal(&data).unwrap();
        assert_eq!(dense, vec![2, 1, 1, 2]);
    }

    #[test]
    #[allow(clippy::match_wild_err_arm)]
    fn test_one_permutation_hasher_jaccard() {
        let sketch1 = vec![1, 2, 0];
        let sketch2 = vec![1, 0, 2];
        let result = match OnePermutationHasher::jaccard(&sketch1, &sketch2) {
            Ok(val) => val,
            Err(_) => panic!("This test should not error."),
        };
        let expected = 1. / 3.;
        assert!(approx_eq!(f64, result, expected, ulps = 2));
    }

    #[test]
    #[should_panic]
    fn test_one_permutation_hasher_jaccard_length_mismatch_raises() {
        let sketch1 = vec![1, 2, 0];
        let sketch2 = vec![1, 0];
        let _ = OnePermutationHasher::jaccard(&sketch1, &sketch2).unwrap();
    }
}
