import React, { useState } from 'react'
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material"
import { Navbar } from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const initForm = { email: "", password: "" }

export const Login = () => {
    const [form, setForm] = useState(initForm)
    const [emailOk, setEmailOk] = useState(false)
    const [errorSnack, setErrorSnack] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate()

    //Funcion para la snackbar
    const handleSnackbar = (message) => {
        setErrorMessage(message);
        setErrorSnack(true);

        setTimeout(() => {
            setErrorSnack(false);
            setErrorMessage('');
        }, 6000);
    };

    // Funcion que guarda valores 
    const handleChange = ({ target }) => {
        const { value, name } = target;
        setForm((prop) => ({
            ...prop, [name]: value
        }))
    };

    //Funcion submit
    const handleSubmit = async () => {
        const emailRegEx = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

        const emailOk = !emailRegEx.test(form.email)

        if (!emailOk) {
            try {
                const response = await axios.post('https://api.jedidiazfagundez.site/api/user/login', { email: form.email, password: form.password })
                console.log(response.data)

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.userJson));

                if (response.data.userJson.role === "admin") {
                    navigate("/admin")
                } else {
                    navigate("/user")
                }
            } catch (error) {
                handleSnackbar(error.response.data.msg)
            }
        }
    }

    return (
        <Stack maxWidth={"100%"} justifyContent={'center'} alignItems={"center"} >
            <Navbar></Navbar>
            <Stack maxWidth={"250px"} justifyContent={'center'} spacing={2} marginTop={"80px"}>
                <TextField label="Email" name='email' onChange={handleChange} error={emailOk} helperText={emailOk ? "Email invalido" : ""} />
                <TextField label="Password" name='password' type='password' onChange={handleChange} />
                <Button variant='contained' onClick={handleSubmit}>Submit</Button>

                <Snackbar open={errorSnack} autoHideDuration={6000}>
                    <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>
            </Stack>
        </Stack>

    )
}

