export const showPageAction = (dispatch, navKey) => {
    console.log('show page action');
    let ob = {
        type: "SET_NAVIGATION_PAGE",
        payload: navKey
    };
    console.log(ob);
    return dispatch(ob);
}

export const showToggleDoorAction = (dispatch, navKey) => {
    let ob = {
        type: "EVENT_SHUTTER_FLY_OPEN"

    };
    return dispatch(ob);
}