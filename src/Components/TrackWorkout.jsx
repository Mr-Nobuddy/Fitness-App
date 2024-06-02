import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const TrackWorkout = () => {
  const [ex_name, setExName] = useState("");
  const [burnedCalories, setBurnedCalories] = useState("");
  const [duration, setDuration] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setShowLoader(true);
      setShow(false);
      const response = await axios.post(
        "https://trackapi.nutritionix.com/v2/natural/exercise",
        {
          query: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "1a299a7b",
            "x-app-key": "eedf9d333e690c05a2e66f2f26ff301c",
          },
        }
      );
      // console.log(response.data.exercises[0].name);
      setShowLoader(false);
      setExName(response.data.exercises[0].name);
      setBurnedCalories(response.data.exercises[0].nf_calories);
      setDuration(response.data.exercises[0].duration_min);
      setShow(true);
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
          label="Enter your workouts with the duration in minutes"
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            width: "40%",
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
            width: "10%",
            "&:hover": { backgroundColor: "black" ,scale:"110%"},
            "&:active":{scale:"90%"},
            transition: "0.2s ease-in-out",
            fontFamily: `"Fraunces", serif`,
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
                  <Typography
                    sx={{
                      fontWeight: "900",
                      fontSize: "1.5rem",
                      textAlign: "start",
                      width: "70%",
                      fontFamily: `"Fraunces", serif`,
                    }}
                  >
                    {ex_name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: "30%",
                      cursor: "pointer",
                      fontFamily: `"Fraunces", serif`,
                    }}
                    onClick={() => setShow(false)}
                  >
                    <IoIosCloseCircleOutline size={40} />
                  </Typography>
                </Stack>

                <Stack sx={{ marginBottom: "10px" }} direction="row">
                  <Typography
                    sx={{
                      fontWeight: "900",
                      fontSize: "1.5rem",
                      width: "50%",
                      fontFamily: `"Fraunces", serif`,
                    }}
                  >
                    Burned Calories
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: "100%",
                      fontFamily: `"Fraunces", serif`,
                    }}
                  >
                    {burnedCalories}
                  </Typography>
                </Stack>

                <Stack sx={{ marginBottom: "10px" }} direction="row">
                  <Typography
                    sx={{
                      fontWeight: "900",
                      fontSize: "1.5rem",
                      width: "50%",
                      fontFamily: `"Fraunces", serif`,
                    }}
                  >
                    Duration
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: "100%",
                      fontFamily: `"Fraunces", serif`,
                    }}
                  >
                    {duration} minutes
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    width: "50px",
                    fontFamily: `"Fraunces", serif`,
                    "&:hover": { backgroundColor: "black", scale: "110%" },
                    "&:active": { scale: "90%" },
                    transition: "0.2s ease-in-out",
                  }}
                >
                  Add
                </Button>
              </CardActions>
            </Card>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default TrackWorkout;
