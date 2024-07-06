import {
  Box,
  Button,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const SearchWorkout = () => {
  const [search_ex, setSearchEx] = useState("");
  const [show, setShow] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const [bodypart, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [gif, setGif] = useState("");
  const [workout_name, setWorkOutName] = useState("");
  const [targetMuscle, setTargetMuscle] = useState("");
  const [secondaryMuscles, setSecondaryMuscles] = useState([]);
  const [instruction, setInstructions] = useState([]);
  const [page, setPage] = useState(1);

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
      setShowLoader(true);
      setShow(false);
      const response = await axios.request(options);
      console.log(response.data);
      setShowLoader(false);
      setExercises(response.data);
      setShow(true);
      handlePagination()
      // console.log(exercises);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePagination = () => {
    // console.log(page)
    if (show === true) {
      setBodyPart(exercises[page].bodyPart);
      setEquipment(exercises[page].equipment);
      setGif(exercises[page].gifUrl);
      setWorkOutName(exercises[page].name);
      setTargetMuscle(exercises[page].target);
      setSecondaryMuscles(exercises[page].secondaryMuscles);
      setInstructions(exercises[page].instructions);
    }
  };

  useEffect(() => {
    handlePagination();
  }, [page]);

  

  return (
    <Box
      sx={{
        backgroundColor: "#FFF9D0",
        padding: "10px",
        height: show ? "" : "96.2vh",
        background: "linear-gradient(#FFF9D0,#76ABAE)",
        // backgroundImage: "url('images/barbell.jpg')",
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
      }}
    >
      <NavBar />
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: `"Fraunces", serif`,
          fontWeight: "700",
          fontSize: "40px",
          color: " black",
        }}
      >
        Search for Workouts here
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "center",
            marginBottom: "10px",
            marginTop: "20px",
            width: "70%",
            padding: "40px 30px",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.4)",
            borderRadius: "20px",
          }}
        >
          <TextField
            variant="outlined"
            label="Search for your workouts"
            onChange={(e) => setSearchEx(e.target.value.split(" ").join("%20"))}
            sx={{
              width: "70%",
              "& fieldset": {
                borderColor: "black",
                fontFamily: `"Fraunces", serif`,
              },
              "& label": { color: "black", fontFamily: `"Fraunces", serif` },
              "& input": { color: "black", fontFamily: `"Fraunces", serif` },
              "&:hover": {
                borderColor: "black",
                fontFamily: `"Fraunces", serif`,
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              width: "20%",
              "&:hover": { backgroundColor: "black", scale: "110%" },
              "&:active": { scale: "90%" },
              transition: "0.2s ease-in-out",
              fontFamily: `"Fraunces", serif`,
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
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

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {show ? (
          <Box
            sx={{
              // border: "1px solid white",
              padding: "20px 20px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: "20px",
              width: "50%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
                borderRadius: "20px",
                // border:"1px solid black"
              }}
            >
              <img
                src={gif}
                alt="food"
                width="100%"
                height={350}
                style={{ borderRadius: "20px" }}
              />
            </Box>
            <Stack
              direction="row"
              sx={{ display: "flex", justifyContent: "space-between",width:"100%",marginBottom:"15px" }}
              spacing={2}
            >
              <Typography
                sx={{
                  fontFamily: `"Fraunces", serif`,
                  fontWeight: "700",
                  fontSize: "20px",
                  width:"50%",
                  display:"flex",
                  justifyContent:"flex-start",
                  gap:1,
                }}
              >
                <span style={{marginLeft:"10px"}}>Name:</span> {workout_name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: `"Fraunces", serif`,
                  fontWeight: "700",
                  fontSize: "20px",
                  width:"50%",
                  display:"flex",
                  justifyContent:"flex-start",
                  gap:1
                }}
              >
                <span style={{marginLeft:"10px"}}>BodyPart:</span>{bodypart}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{ display: "flex", justifyContent: "space-between",width:"100%",marginBottom:"15px"}}
              spacing={2}
            >
              <Typography
                sx={{
                  fontFamily: `"Fraunces", serif`,
                  fontWeight: "700",
                  fontSize: "20px",
                  width:"50%",
                  display:"flex",
                  justifyContent:"flex-start",
                  gap:1
                }}
              >
                <span style={{marginLeft:"10px"}}>Target muscle:</span>
                {targetMuscle}
              </Typography>
              <Typography
                sx={{
                  fontFamily: `"Fraunces", serif`,
                  fontWeight: "700",
                  fontSize: "20px",
                  width:"50%",
                  display:"flex",
                  justifyContent:"flex-start",
                  gap:1
                }}
              >
                <span style={{marginLeft:"10px"}}>Equipment:</span> {equipment}
              </Typography>
            </Stack>
            <Stack
              direction="column"
              // sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{
                  fontFamily: `"Fraunces", serif`,
                  fontWeight: "700",
                  fontSize: "20px",
                  
                }}
              >
                Secondary Muscles:
                <ul>
                  {secondaryMuscles.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </Typography>

              <Typography
                sx={{
                  fontFamily: `"Fraunces", serif`,
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                Instructions:
                <ul>
                  {instruction.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </Typography>
            </Stack>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                count={exercises.length-1}
                color="primary"
                defaultPage={1}
                onChange={(e,p) => setPage(p)}
              />
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default SearchWorkout;
