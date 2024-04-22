import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import NavBar from './NavBar'

const SearchRecepies = () => {
  return (
    <Box sx={{ backgroundColor: "yellow", padding: "10px", height: "200vh" }}>
      <NavBar/>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "center",
          marginBottom: "10px",
          marginTop: "20px",
        }}
      >
        <TextField
          variant="outlined"
          label="Search for tasty yet healthy recepies"
          sx={{
            width: "40%",
            "& fieldset": { borderColor: "black" },
            "& label": { color: "black" },
            "& input": { color: "black" },
            "&:hover": { borderColor: "black" },
          }}
        />
        <Button
          variant="contained"
          sx={{
            width: "10%",
            "&:hover": { backgroundColor: "black", color: "#fff" },
            transition: "0.2s ease-in-out",
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  )
}

export default SearchRecepies