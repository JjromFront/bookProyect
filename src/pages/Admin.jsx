import React, { useEffect, useState } from 'react'
import { Button, Checkbox, FormControlLabel, Stack, TextField, Typography, Modal } from '@mui/material'
import { Navbar } from '../components/Navbar'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import LoadingButton from '@mui/lab/LoadingButton';


const initForm = { title: "", author: "", resume: "", pages: "", isActive: true }
const initValidation = { titleVal: false, autorVal: false, resumeVal: false, pagesVal: false }

export const Admin = () => {
    const [form, setForm] = useState(initForm)
    const [validation, setValidation] = useState(initValidation)
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)

    const token = localStorage.getItem("token")
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);

    // Funcion para guardar los valores del formulario
    const handleChange = ({ target }) => {
        const { value, name } = target

        if (name === "isActive") {
            setForm((prop) => ({
                ...prop,
                [name]: !prop.isActive
            }))
        } else {
            setForm((prop) => ({
                ...prop,
                [name]: value
            }))
        }
    }

    // Funcion para manejar el submit
    const handleSubmit = async () => {
        setLoading(true)
        setValidation({
            titleVal: form.title === "",
            autorVal: form.author === "",
            resumeVal: form.resume === "",
            pagesVal: form.pages === "",
        })

        if (!validation.titleVal && !validation.autorVal && !validation.resumeVal && !validation.pagesVal) {
            try {
                console.log(form)
                const response = await axios.post('https://api.jedidiazfagundez.site/api/books/create', {
                    title: form.title,
                    author: form.author,
                    resume: form.resume,
                    pages: form.pages
                }, { headers: { Authorization: `Bearer ${token}` } })
                console.log(response)
                setLoading(false)
                setOpen(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    // Solicitud get para obtener todos los libros
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://api.jedidiazfagundez.site/api/books', { headers: { Authorization: `Bearer ${token}` } });
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBooks();
    }, [open]);

    // 

    // Columnas de cada item de libros
    const columns = [
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'author', headerName: 'Author', width: 150 },
        { field: 'resume', headerName: 'Resume', width: 200 },
        { field: 'pages', headerName: 'Pages', width: 100 },
        { field: 'isActive', headerName: 'Active', width: 100 },
    ];
    return (
        <Stack>
            <Navbar></Navbar>
            <Stack width={'100%'} justifyContent={'center'} alignItems={'center'} direction="row" gap="6px" >
                {/* Formulario */}
                <Modal
                    open={open}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
                >
                    <Stack
                        maxWidth={'400px'}
                        spacing={2}
                        mt={'30px'}
                        ml={"10px"}
                        flexGrow={1}
                        bgcolor={"#ffffff"}
                        padding="20px"
                        borderRadius="15px"
                    >
                        <Typography variant="h3" textAlign="center">Hello, {user.username}</Typography>
                        <TextField
                            label="Title of the book"
                            name="title"
                            onChange={handleChange}
                            error={validation.titleVal}
                            helperText={validation.titleVal ? "required" : ""}
                        />
                        <TextField
                            label="Autor of the book"
                            name="author"
                            onChange={handleChange}
                            error={validation.autorVal}
                            helperText={validation.autorVal ? "required" : ""}
                        />
                        <TextField
                            label="Resume of the book"
                            name="resume"
                            onChange={handleChange}
                            error={validation.resumeVal}
                            helperText={validation.resumeVal ? "required" : ""}
                        />

                        <TextField
                            label="Pages of the book"
                            name="pages"
                            type="number"
                            onChange={handleChange}
                            error={validation.pagesVal}
                            helperText={validation.pagesVal ? "required" : ""}
                        />

                        <FormControlLabel name="isActive" control={<Checkbox defaultChecked />} label="Active" onChange={handleChange} />
                        <LoadingButton variant="contained" onClick={handleSubmit} loading={loading}>
                            Submit
                        </LoadingButton>
                    </Stack>
                </Modal>
                {/* Ver libros */}
                <Stack flexGrow={1} margin={4}>
                    <Stack direction="row" justifyContent="space-between" margin={2}>
                        <Typography variant="h4" marginBottom={2}>Books</Typography>
                        <Button variant='contained' sx={{
                            padding: 2
                        }} onClick={() => setOpen(true)}>New Book</Button>
                    </Stack>
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : (
                        <Stack style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={books}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                checkboxSelection
                            />
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Stack>
    )
}
