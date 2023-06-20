import { useContext, useState } from "react";
import { createContext } from "react";
import { themeOptions } from "../Utils/themeOptins";

const ThemeContext = createContext();

export const ThemeContextProivider = ({ children }) => {

    //using localStorage to getItem.
    const defaultTheme = JSON.parse(localStorage.getItem('theme')) || themeOptions[0].value;
    const [theme, setTheme] = useState(defaultTheme);

    const values = {
        theme, setTheme
    }

    return (<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>)
}

export const useTheme = () => useContext(ThemeContext
)