let initStore = {
    loading: false,
    error: false,
    correlations_data: [
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 0,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF017NXL.bed.gz",
            "corrValue": 1
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 1,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF071XMA.bed.gz",
            "corrValue": 0.401480573670878
        },
        {
            "experimentName": "test9",
            "rowNum": 0,
            "colNum": 2,
            "rowLabel": "ENCFF017NXL.bed.gz",
            "colLabel": "ENCFF106NXV.bed.gz",
            "corrValue": 0.653801541642514
        }
    ]
}

export default (state = initStore, action) => {
    switch (action.type) {
        case "correlations_success":
            return {...state, loading: false, correlations_data: action.payload.correlations_data}
        case "correlations_begin":
            return {...state, loading: true}
        case "correlations_error":
            return {...state, error: true}
    }
}