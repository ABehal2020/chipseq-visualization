let initStore = {
    loading: false,
    error: false,
    server_message: "",
    submission_data: {
        "name": "ASP",
        "type": "sv",
        "experimentName": "test9",
        "x": "https://www.encodeproject.org/search/?searchTerm=H3K4ME3&type=Experiment&replication_type=isogenic&assembly=GRCh38&award.rfa=ENCODE4&format=json"
    }
}

export default (state = initStore, action) => {
    console.log("visualize reducer");
    console.log(action.type);
    switch (action.type) {
        case "submission_post":
            return { ...state, submission_data: action.payload.submission_data, loading: action.payload.loading}
        case "submissions_begin":
            return { ...state, loading: true }
        case "submissions_error":
            return { ...state, error: true }
        case "server_message":
            return { ...state, server_message: action.payload.server_message }
        case "start_spinner":
            return { ...state, loading: action.payload.loading }
        case "stop_spinner":
            return { ...state, loading: action.payload.loading }
        case "submissions_server_error":
            return {...state, loading: action.payload.loading, server_message: action.payload.server_message}
    }
}