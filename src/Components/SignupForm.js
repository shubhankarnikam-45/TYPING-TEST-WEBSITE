import { Box, Button, TextField, useAutocomplete } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../Constext/themeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';


const SignupForm = ({ handleClose }) => {

    //storing the email and password & confirm password in the state.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('')

    //importing the `theme` object to apply styling according to the `theme`.\
    const { theme } = useTheme();

    //when user click on the submit button.
    function handleSubmit(e) {
        if (!email || !password || !confirmPassword) {
            toast.warning('Fill the fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (password !== confirmPassword) {
            toast.warning('Password Mismatch', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        //firebase.

        auth.createUserWithEmailAndPassword(email, password).then((res) => {
            //when user is sign up  in successfully then.
            //momdal is colse.
            handleClose();
            toast.success('Sign Up Sucessfully ', {
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
                toast.error(errorMapping[err.code] || 'some error occured', {
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
        <div style={{ textAlign: 'center' }}>
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

                <TextField
                    label='Enter Confirm Password'
                    type='password'
                    variant='outlined'
                    onChange={(e) => setConfirmPassword(e.target.value)}

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
                >Sign Up</Button>
            </Box>


        </div>
    )
}

export default SignupForm