import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from '@mui/material/CircularProgress';

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
      // console.log(response.data);
      setShowLoader(false);
      setExercises(response.data);
      setShow(true);
      // console.log(exercises);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "bodypart",
      headerName: "Body Part",
      width: 200,
      editable: true,
    },
    {
      field: "equipment",
      headerName: "Equipment",
      width: 200,
      editable: true,
    },
    {
      field: "gif",
      headerName: "Representation",
      width: 200,
      editable: true,
      renderCell : (params) => <img src={params.value} alt="GIF" width={200} height={200}/>
    },
    {
      field: "workout",
      headerName: "Exercise Name",
      width: 200,
      editable: true,
    },
    {
      field: "targetmuscle",
      headerName: "Target Muscle",
      width: 200,
      editable: true,
    },
    {
      field: "secondarymuscles",
      headerName: "Secondary Muscles",
      width: 200,
      editable: true,
    },
    {
      field: "instructions",
      headerName: "Instructions",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      valueGetter: (value, row) =>
        `${row.instructions || ""}`,
    },
  ];
  const rows = exercises.map((item) => ({
    id: item.id,
    bodypart: item.bodyPart,
    equipment: item.equipment,
    gif: item.gifUrl,
    workout: item.name,
    targetmuscle: item.target,
    secondarymuscles: [item.secondaryMuscles],
    instructions: [item.instructions],
  }));

  return (
    <Box sx={{ backgroundColor: "yellow", padding: "10px", height: "200vh" }}>
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
      <Box sx={{ display: showLoader ? "flex" : "none",width:"100%",justifyContent:"center",alignItems:"center"}}>
        <CircularProgress />
      </Box>
      <Box>
        {show ? (
          <Box sx={{ height: 800, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              rowHeight={200}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{borderColor:"black"}}
            />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default SearchWorkout;
