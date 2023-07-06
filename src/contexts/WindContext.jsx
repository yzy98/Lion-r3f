import { createContext } from "react";

export const WindContext = createContext(null);

export const WindContextProvider = ({children, wind}) => {
  return (
    <WindContext.Provider value={wind}>
      {children}
    </WindContext.Provider>
  );
};