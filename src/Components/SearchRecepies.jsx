import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const SearchRecepies = () => {
  const [recepies, setRecepies] = useState([]);
  const [searchRec, setSearchRec] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [show, setShow] = useState(false);

  const options = {
    method: "GET",
    url: "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe",
    params: {
      query: searchRec,
    },
    headers: {
      "X-RapidAPI-Key": "f775f70b37msh97fa7ed0c6cd78cp17d0a4jsn0725e9aaad31",
      "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
    },
  };
  const handleSearch = async () => {
    try {
      setShowLoader(true);
      setShow(false);
      const response = await axios.request(options);
      // console.log(response.data);
      setShowLoader(false);
      setRecepies(response.data);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ backgroundColor: "yellow", padding: "10px", height: "200vh" }}>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "center",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <TextField
          variant="outlined"
          label="Search for tasty yet healthy recepies"
          sx={{
            width: "40%",
            "& fieldset": { borderColor: "black" ,fontFamily:`"Fraunces", serif`},
            "& label": { color: "black" ,fontFamily:`"Fraunces", serif`},
            "& input": { color: "black" ,fontFamily:`"Fraunces", serif`},
            "&:hover": { borderColor: "black",fontFamily:`"Fraunces", serif` },
          }}
          onChange={(e) => setSearchRec(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            width: "10%",
            "&:hover": { backgroundColor: "black" ,scale:"110%"},
            "&:active":{scale:"90%"},
            transition: "0.2s ease-in-out",
            fontFamily:`"Fraunces", serif`
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          display: showLoader ? "flex" : "none",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
      
        {show ? (
          recepies.map((item) => (
            <Accordion sx={{marginBottom:"20px"}}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon sx={{color:"white"}}/>}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{backgroundColor:"#000",color:"#fff"}}
              >
                <Typography sx={{fontSize:"2em",fontFamily:`"Fraunces", serif`}}>{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography sx={{fontSize:"1.3em",fontWeight:800,marginBottom:"10px",fontFamily:`"Fraunces", serif`}}>Ingredients</Typography>
                  <Typography sx={{marginBottom:"20px",fontFamily:`"Fraunces", serif`}}>{item.ingredients}</Typography>
                </Box>
                <Box>
                  <Typography sx={{fontSize:"1.3em",fontWeight:800,marginBottom:"10px",fontFamily:`"Fraunces", serif`}}>Instructions</Typography>
                  <Typography sx={{marginBottom:"20px",fontFamily:`"Fraunces", serif`}}>{item.instructions}</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <></>
        )}
    </Box>
  );
};

export default SearchRecepies;
