import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();


export const TestModeContextProvider = ({ children }) => {

    const [testTime, setTestTime] = useState(15);
    console.log(testTime)

    const values = {
        testTime, setTestTime
    }

    return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}


//now we use the `useContext` hook for the passing state between the different componenets.
//here we use the one method which is 'consumer' but we use the 'useContext' hook because we dot's want to export the 
//context in line no. 3.
export const useTestMode = () => useContext(TestModeContext);