import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert, Button, Checkbox, FormControlLabel, Snackbar, Stack, TextField } from '@mui/material';

// Inicializamos dos objetos uno que guarda el formulario y otro que lo valida
const initForm = { user: '', email: '', password1: '', password2: '', isAdmin: true };
const initFormVal = { userVal: false, emailVal: false, passwordVal: false };

export const Register = () => {
    // Iniciamos funciones useState
    const [form, setForm] = useState(initForm);
    const [valid, setValid] = useState(initFormVal);
    const [errorSnack, setErrorSnack] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    //funcion para las alertas
    const handleSnackbar = (message) => {
        setErrorMessage(message);
        setErrorSnack(true);

        setTimeout(() => {
            setErrorSnack(false);
            setErrorMessage('');
        }, 6000);
    };

    // funcion para guardar el contenido en el formulario
    const handleChange = ({ target }) => {
        const { value, name } = target;

        if (name === 'isAdmin') {
            setForm((prop) => ({
                ...prop,
                [name]: !prop.isAdmin,
            }));
        } else {
            setForm((prop) => ({
                ...prop,
                [name]: value,
            }));
        }
    };

    // funcion para que cuando le des click al boton valide y haga una solicitud post a la api
    const handleSubmit = async () => {
        const emailRegEx = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
        const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        setValid({
            ...valid,
            userVal: form.user.length <= 3,
            emailVal: !emailRegEx.test(form.email),
            passwordVal: !(form.password1 === form.password2 && passwordRegEx.test(form.password1)),
        });

        if (!valid.userVal && !valid.emailVal && !valid.passwordVal) {
            try {
                const data = await axios.post('https://api.jedidiazfagundez.site/api/user/register', {
                    username: form.user,
                    email: form.email,
                    password: form.password1,
                    role: form.isAdmin ? 'admin' : 'user',
                });

                console.log(data);
                navigate('/login');
                setErrorSnack(false);
            } catch (error) {
                handleSnackbar(error.response.data.msg)
            }
        } else {

        }
    };

    return (
        <Stack maxWidth={'100%'} justifyContent={'center'} alignItems={'center'}>
            <Navbar></Navbar>
            <Stack width={'400px'} justifyContent={'center'} spacing={2} marginTop={'80px'}>
                <TextField
                    label="User"
                    name="user"
                    onChange={handleChange}
                    error={valid.userVal}
                    helperText={valid.userVal ? 'Usuario debe tener 3 caracteres o mas' : ''}
                />
                <TextField
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    error={valid.emailVal}
                    helperText={valid.emailVal ? 'Email invalido' : ''}
                />
                <TextField
                    label="Password"
                    name="password1"
                    type="password"
                    onChange={handleChange}
                    error={valid.passwordVal}
                    helperText={
                        valid.passwordVal
                            ? 'La contraseña debe tener al menos 8 caracteres y contener al menos un número y un carácter especial, o debe coincidir con la otra contraseña ingresada.'
                            : ''
                    }
                />

                <TextField
                    label="Repeat Password"
                    name="password2"
                    type="password"
                    onChange={handleChange}
                    error={valid.passwordVal}
                    helperText={
                        valid.passwordVal
                            ? 'La contraseña debe tener al menos 8 caracteres y contener al menos un número y un carácter especial, o debe coincidir con la otra contraseña ingresada.'
                            : ''
                    }
                />

                <FormControlLabel name="isAdmin" onChange={handleChange} control={<Checkbox defaultChecked />} label="Admin" />
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>

                <Snackbar open={errorSnack} autoHideDuration={6000}>
                    <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>
            </Stack>
        </Stack>
    );
};
