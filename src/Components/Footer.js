import React, { useContext, useState } from "react";
import Select from "react-select";
import { themeOptions } from "../Utils/themeOptins";
import { useTheme } from "../Constext/themeContext";
const Footer = () => {

    //using the value we created using the context.
    let { theme, setTheme } = useTheme();


    //handleChange() functon.
    function handleChange(e) {
        setTheme(e.value);

        //for applying default theme we use the local storage.
        //default theme for the user enter the value of theme when they visit last time in website.
        localStorage.setItem("theme", JSON.stringify(e.value));


    }
    return (
        <div className="footer">
            <div className="links">
                Links
            </div>

            <div className="theme-select">

                <Select
                    onChange={handleChange}
                    options={themeOptions}
                    menuPlacement="top"
                    defaultValue={{ label: theme.label, value: theme }}
                    styles={{
                        control: (style) => ({
                            ...style,
                            backgroundColor: theme.background
                        }),

                        menu: (style) => ({
                            ...style,
                            backgroundColor: theme.background
                        }),

                        option: (styles, { isFocused }) => {
                            return {
                                ...styles,
                                backgroundColor: (!isFocused) ? theme.background : theme.textColor,
                                color: (!isFocused) ? theme.textColor : theme.background,
                                cursor: 'pointer'
                            }
                        }
                    }}

                //change the color of menu according to theme.
                />
            </div>
        </div>
    )
}

export default Footer;