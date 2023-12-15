import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { Navbar } from '../components/Navbar';
import axios from 'axios';

export const User = () => {
    // Inicializamos estados y cojemos el token del local storage
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const token = localStorage.getItem("token")

    // Solicitud get para conseguir los libros
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://api.jedidiazfagundez.site/api/books', {headers: {Authorization: `Bearer ${token}`}});
                setBooks(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBooks();
    }, []);

    // Funcion para manejar el click a un libro
    const handleBookClick = (book) => {
        setSelectedBook(book);
        setDialogOpen(true);
    };

    // Funcion para cerrar el
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Navbar />
            </Grid>
            {books.map((book) => (
                <Grid  item xs={12} sm={6} md={4} key={book.id}>
                    <Card>
                        <CardActionArea onClick={() => handleBookClick(book)}>
                            <CardContent>
                                <Typography variant="h6" component="h2" gutterBottom>
                                    {book.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {book.author}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                {selectedBook && (
                    <>
                        <DialogTitle>{selectedBook.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Typography fontWeight="600">Author:</Typography> {selectedBook.author}<br />
                                <Typography fontWeight="600">Resume:</Typography> {selectedBook.resume}<br />
                                <Typography fontWeight="600">Pages:</Typography> {selectedBook.pages}<br />
                                <Typography fontWeight="600">Active:</Typography> {selectedBook.isActive ? 'Yes' : 'No'}<br />
                            </DialogContentText>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </Grid>
    );
};
