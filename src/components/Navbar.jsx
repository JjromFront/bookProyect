import { Stack, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {

  const navigate = useNavigate()

  return (
    <>
      <Stack width="100%" bgcolor="#4996FF" padding="15px" justifyContent="space-between" direction="row">
        <Stack width="45px" height="45px" marginLeft="10px">
          <img src='.././public/vite.svg'></img>
        </Stack>

        <Stack  direction="row" spacing={3} marginRight="30px">
          <Button variant="contained" onClick={() => navigate("/login")} sx={{color: "#000000", backgroundColor: "#FFFFFF", fontWeight: "600", ":hover": {bgcolor: "#EEEEEE", color: "#000000"}}}  >
            Sign in
          </Button>
          <Button variant="contained" onClick={() => navigate("/register")} sx={{color: "#FFFFFF", backgroundColor: "#000000", fontWeight: "600", ":hover": {bgcolor: "#202020", color: '#FFFFFF'} }} >
            Sign up
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
