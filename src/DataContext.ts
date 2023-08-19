// DataContext.js
import React, { createContext, useContext } from "react";
import { defaultUserSession } from "./interface/UserSession";
const initialState = defaultUserSession;
const DataContext = createContext(initialState);

export const useDataContext = () => useContext(DataContext);

export default DataContext;
