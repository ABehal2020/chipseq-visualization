import axios from 'axios';

const getCorrelationRecords = (submittedExp) => {
    let url = "http://localhost:8000/values/correlations/?experimentName=samplerun";
    let ob = {"content-type": "application/json"};
    if (submittedExp && submittedExp.length > 0) {
        url = "http://localhost:8000/values/correlations/?experimentName=" + submittedExp;
        console.log(url);
    }
    return axios.get(url, {headers: ob});
}

export const loadMapAction = async (dispatch, submittedExp) => {
    const response = await getCorrelationRecords(submittedExp);
    if (response) {
        let payload = {
            correlations_data: response.data
        }
        return dispatch({
            type: "correlations_success",
            payload: payload
        });
    } else {
        console.log("Server error");
    }
}