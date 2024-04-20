import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const SearchWorkout = () => {
  const [search_ex, setSearchEx] = useState("");
  const [show, setShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [bodypart, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [gif, setGif] = useState("");
  const [workout_name, setWorkOutName] = useState("");
  const [targetMuscle, setTargetMuscle] = useState("");
  const [secondaryMuscles, setSecondaryMuscles] = useState([]);
  const [instruction, setInstructions] = useState([]);

  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/name/${search_ex}`,
    params: { limit: "1000" },
    headers: {
      "X-RapidAPI-Key": "f775f70b37msh97fa7ed0c6cd78cp17d0a4jsn0725e9aaad31",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };
  const handleSearch = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "yellow", padding: "10px", height: "96.2vh" }}>
      <NavBar />
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
          label="Search for your workouts"
          onChange={(e) => setSearchEx(e.target.value.split(" ").join("%20"))}
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
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box>
        {show ? (
          <Box
            sx={{
              borderRadius: "50px",
              marginLeft: "50px",
              marginRight: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{ minWidth: 275, width: "50%", borderRadius: "20px" }}
              elevation={3}
            >
              <CardContent>
                <Stack direction="row" sx={{ marginBottom: "10px" }}>
                  {/* <Typography
                    sx={{
                      fontWeight: "900",
                      fontSize: "1.5rem",
                      textAlign: "start",
                      width: "70%",
                    }}
                  >
                    {}
                  </Typography> */}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default SearchWorkout;
