export const NavReducer = (state, action) => {
    console.log('chipNavigationReducer');
    console.log(action);
    console.log(state);
    console.log('chipNavigationReducer..');

    switch (action.type) {
        case "SET_NAVIGATION_PAGE":
            console.log("state");
            let ob = {
                ...state,
                navigation: { ...state.navigation, page: action.payload }
            };
            console.log("state changed");
            console.log(ob);
            return ob;
        case "EVENT_SHUTTER_FLY_OPEN":
            console.log(state);
            let ob2 = {
                ...state,
                navigation: {
                    ...state.navigation,
                     shutterflyOpen: !state.navigation. shutterflyOpen
                }
            };
            console.log("after state change - EVENT_SHUTTER_FLY_OPEN");
            console.log(ob2);
            return ob2;
        default:
            return state;
    }
};