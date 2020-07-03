import React, {createContext, useReducer} from 'react';
import {RootReducer} from '../reducers/rootReducer';
import {ROOT_OBJECT} from '../definitions/rootObject';

export const Store = createContext(ROOT_OBJECT);

export const RootProvider = (props) => {
    const [state, dispatch] = useReducer(RootReducer, ROOT_OBJECT);
    console.log('dsipatch');
    console.log(dispatch);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
};