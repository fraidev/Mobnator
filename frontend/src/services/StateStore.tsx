import React, { createContext, useReducer, Dispatch } from "react";
import StateReducer from "./StateReducer";
import { GlobalState } from "../models/types";


const initialState: GlobalState = {
    started: false,
    firstStarted: false,
    people: [],
    config: {
        roundMinutes: 10,
        breakMinutes: 5,
        roundCount: 6,
    }
}

export const StateContext = createContext<{
    state: GlobalState;
    dispatch: Dispatch<{
        type: any;
        payload: any;
    }>;
}>({
    state: initialState,
    dispatch: () => null
});

export const StateStoreProvider: React.FC<any> = ({ children }) => {
    const [state, dispatch] = useReducer(StateReducer, initialState);
    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    )
};

export default StateStoreProvider;