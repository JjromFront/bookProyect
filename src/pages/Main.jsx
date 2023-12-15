import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Navbar } from '../components/Navbar'


export const Main = () => {
    return (
        <Stack>
            <Navbar></Navbar>
            <Typography>Main</Typography>
        </Stack>
    )
}
