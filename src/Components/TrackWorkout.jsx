import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { MdDelete } from "react-icons/md";
// import { makeStyles } from "@material-ui/core/styles";/
// import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const TrackWorkout = ({ snackbar }) => {
  const [ex_name, setExName] = useState("");
  const [burnedCalories, setBurnedCalories] = useState("");
  const [duration, setDuration] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [workouts, setWorkouts] = useState([]);

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

  const handleTrackWorkout = () => {
    axios
      .post("/trackworkout", {
        name: message,
        calories: burnedCalories,
        duration: duration,
      })
      .then((_) => {
        snackbar({ message: "Added workout" });
        setExName(message);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("/getworkout")
      .then((response) => {
        console.log(response.data);
        setWorkouts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "yellow",
        padding: "10px",
        height: show ? "120vh" : "96.2vh",
        // background: "linear-gradient(#FFF9D0,#76ABAE)",
        backgroundImage: "url('images/gymimage.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
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
          color: "white",
        }}
      >
        Track your workouts here
      </Typography>
      <Box
        sx={{
          // border: "1px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "center",
            marginBottom: "20px",
            marginTop: "20px",
            // border: "1px solid white",
            width: "50%",
            padding: "40px",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: "20px",
          }}
        >
          <TextField
            variant="outlined"
            label="Enter your workouts with the duration in minutes"
            onChange={(e) => setMessage(e.target.value)}
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
              height: "5%",
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
      {show ? (
        ""
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Accordion sx={{ width: "55%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              // sx={{'& .MuiAccordionSummary-content':{textAlign:'center'}}}
              sx={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
            >
              Today's Workouts
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    border: "2px solid black",
                    width: "33%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: workouts.length === 0 ? "10px" : "",
                    height: "50px",
                    fontSize: "20px",
                    fontWeight: "700",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  Name
                </span>
                <span
                  style={{
                    border: "2px solid black",
                    width: "33%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50px",
                    fontSize: "20px",
                    fontWeight: "700",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  Calories Burned
                </span>
                <span
                  style={{
                    border: "2px solid black",
                    width: "33%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius:workouts.length === 0 ? "10px":"",
                    height: "50px",
                    fontSize: "20px",
                    fontWeight: "700",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  Duration
                </span>
              </Typography>
              {workouts.map((item, i) => (
                <Typography
                  key={i}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      border: "2px solid black",
                      width: "33%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // borderTopLeftRadius: i === workouts.length-1 ? "10px":"",
                      borderBottomLeftRadius: i === workouts.length-1 ? "10px":"",
                      height: "50px",
                      fontSize: "15px",
                      fontWeight: "700",
                      fontFamily: `"Fraunces", serif`,
                    }}
                    
                  >
                    {item.workout_name}
                  </span>
                  <span
                    style={{
                      border: "2px solid black",
                      width: "33%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "50px",
                      fontSize: "15px",
                      fontWeight: "700",
                      fontFamily: `"Fraunces", serif`,
                    }}
                  >
                    {item.workout_calories}
                  </span>
                  <span
                    style={{
                      border: "2px solid black",
                      width: "33%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // borderTopRightRadius: "10px",
                      borderBottomRightRadius: i === workouts.length-1 ? "10px":"",
                      height: "50px",
                      fontSize: "15px",
                      fontWeight: "700",
                      fontFamily: `"Fraunces", serif`,
                    }}
                  >
                    {item.workout_duration}
                  </span>
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
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
              sx={{
                minWidth: 275,
                width: "50%",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255,255,255,0.4)",
              }}
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
                  onClick={handleTrackWorkout}
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
