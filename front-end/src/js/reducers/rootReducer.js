import {NavReducer} from './navReducer';

export const RootReducer = (state, action) => {
    console.log('JanuRootReducer');
    console.log(action);
    console.log(state);
    console.log('JanuRootReducer..');
    switch (true) {
        case action.type === "GET_GENES_AND_INIT":
            const departments = action.payload;
          
            return {
                ...state,
                departments: departments,
               
               navigation: { ...state.navigation }
            };
        case action.type.includes("NAVIGATION"):
            return NavReducer(state, action);
        case action.type === "GET_GENE_INFO":
           
            return { ...state};
        default:
            console.log('bo action type found');
            return state;
    }
}