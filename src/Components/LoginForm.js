import { Box, Button, TextField, useAutocomplete } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../Constext/themeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';


const LoginForm = ({ handleClose }) => {

    //storing the email and password in the state.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    //importing the `theme` object to apply styling according to the `theme`.\
    const { theme } = useTheme();

    //when user click on the submit button.
    function handleSubmit(e) {
        if (!email || !password) {
            alert("fill the fields")
            return;
        }
        console.log("in login button")

        auth.signInWithEmailAndPassword(email, password).then((res) => {
            //when user is login in successfully then.
            //momdal is colse.
            handleClose();
            toast.success('Login Sucessful ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
            .catch((err) => {
                // console.log("Ef")
                toast.error(errorMapping[err.code] || "some error occured", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }
    return (
        <div style={{ textAlign: "center" }}>
            <Box
                p={3}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                }}
            >
                <TextField
                    label='Enter Email'
                    type='email'
                    variant='outlined'
                    onChange={(e) => setEmail(e.target.value)}

                    //props to change the label.
                    InputLabelProps={
                        {
                            style: {
                                color: theme.textColor
                            }
                        }
                    }

                    //props to change the input typeing color.
                    inputProps={
                        {
                            style: {
                                color: theme.textColor
                            }
                        }
                    }
                />

                <TextField
                    label='Enter Password'
                    type='password'
                    variant='outlined'
                    onChange={(e) => setPassword(e.target.value)}

                    //props to change the label.
                    InputLabelProps={
                        {
                            style: {
                                color: theme.textColor
                            }
                        }
                    }

                    //props to change the input typeing color.
                    inputProps={
                        {
                            style: {
                                color: theme.textColor
                            }
                        }
                    }
                />
                <Button
                    variant='contained'
                    size='large'
                    style={{
                        backgroundColor: theme.textColor,
                        color: theme.background
                    }}

                    onClick={handleSubmit}
                >Login</Button>
            </Box>




        </div>
    )
}

export default LoginForm