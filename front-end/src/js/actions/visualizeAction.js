import axios from 'axios';

const postSubmission = (encodeLink, experimentName, assembly, outputType, fileInput) => {
    let linkValue = "https://www.encodeproject.org/search/?searchTerm=H3K4ME3&type=Experiment&replication_type=isogenic&assembly=GRCh38&award.rfa=ENCODE4&format=json";
    let expValue = "test9";
    if (encodeLink && encodeLink.length > 4) {
        linkValue = encodeLink;
    }
    if (experimentName) {
        expValue = experimentName;
    }
    console.log("assembly");
    console.log(assembly);
    console.log("output type");
    console.log(outputType);
    let url = "http://127.0.0.1:8000/processlink/pushlink";
    let ob = { "content-type": "application/json" };
    let data = {
        "encodeLink": linkValue,
        "experimentName": expValue,
        "assembly": assembly,
        "outputType": outputType,
        "fileInput": fileInput
    }
    return axios.post(url, data, { headers: ob });
}

export const stopSpinner = (dispatch) => {
    let payload = {
        loading: false
    }
    return dispatch({
        type: "stop_spinner",
        payload: payload
    })
}

export const startSpinner = (dispatch) => {
    let payload = {
        loading: true
    }
    return dispatch({
        type: "start_spinner",
        payload: payload
    })
}

export const visualizeAction = async (dispatch, encodeLink, experimentName, assembly, outputType, fileInput) => {
    console.log(encodeLink);
    console.log(experimentName);
    console.log(assembly);
    console.log(outputType);
    const response = await postSubmission(encodeLink, experimentName, assembly, outputType, fileInput);
    if (response) {
        let payload = {
            submission_data: response.data,
            loading: false
        }
        return dispatch({
            type: "submission_post",
            payload: payload
        });
    } else {
        console.log("Server error");
        let payload = {
            loading: false,
            server_message: "backend error"
        }
        return dispatch({
            type: "submission_server_error",
            payload: payload
        })
    }
}