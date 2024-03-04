import { createContext, useContext, useReducer } from "react";

const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => {
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>;
};

//  custom hook to consume the state and dispatch function in components
export const useStateProvider = () => useContext(StateContext);
