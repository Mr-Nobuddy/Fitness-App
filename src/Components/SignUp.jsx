import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SignUp = () => {
  const gender = ["Male", "Female", "Other"];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentWT, setCurrentWT] = useState("");
  const [currentHeight, setCurrentHeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [age, setAge] = useState("");
  const [Gender, setGender] = useState("");

  const handleBodyData = () => {
    axios
      .put("/updateprofile", {
        name: name,
        currentwt: currentWT,
        currentht: currentHeight,
        goalwt: goalWeight,
        bmi: Math.round(currentWT / (currentHeight * currentHeight)),
        maintainance_cal:
          Gender === "Male"
            ? 10 * currentWT + 6.25 * currentHeight * 100 - (5 * age + 5)
            : 10 * currentWT + 6.25 * currentHeight * 100 - (5 * age - 161),
        gender: Gender,
        age: age,
      })
      .then((_) => {
        // snackbar({ message: "Profile Updated Successfully" });
        document.location.replace('/profile')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios.get('/getsignup')
    .then((response) => {
      setName(response.data[0].name)
      setEmail(response.data[0].email)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(#FFF9D0,#76ABAE)",
        paddingTop: "20px",
        paddingBottom: "31px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Looks like you are new to our website!</h1>
      <Box sx={{ width: "80%" }}>
        <Stack direction="row">
          {/* this box contains image */}
          <Box sx={{ width: "40%"}}>
            <img
              src="/images/fitness-gym_932514-10974.jpg"
              alt=""
              width="100%"
              height="100%"
              style={{
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
              }}
            />
          </Box>

          {/* this box contains form */}
          <Box
            sx={{
              width: "60%",
              // border: "1px solid black",
              paddingLeft: "40px",
              paddingRight: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/images/dumbbell_17042215.png"
                sx={{ width: 60, height: 60 }}
              />
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "600",
                fontFamily: `"Fraunces", serif`,
                mb: 2,
              }}
            >
              Sign Up
            </Typography>
            <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
              <Stack direction="column" spacing={2} sx={{ width: "50%" }}>
                <TextField
                  variant="outlined"
                  label="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    "& fieldset": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& label": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& input": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "&:hover": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Email Address"
                  value={email}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& fieldset": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& label": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& input": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "&:hover": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  label="What is your current weight ?"
                  onChange={(e) => setCurrentWT(e.target.value)}
                  value={currentWT}
                  sx={{
                    "& fieldset": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& label": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& input": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "&:hover": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                  }}
                />
              </Stack>
              <Stack direction="column" spacing={2} sx={{ width: "50%" }}>
                <TextField
                  variant="outlined"
                  label="What is your current height in meters"
                  onChange={(e) => setCurrentHeight(e.target.value)}
                  value={currentHeight}
                  sx={{
                    "& fieldset": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& label": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& input": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "&:hover": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  label="What is your goal weight ?"
                  onChange={(e) => setGoalWeight(e.target.value)}
                  value={goalWeight}
                  sx={{
                    "& fieldset": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& label": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& input": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "&:hover": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  label="What is your age ?"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                  sx={{
                    "& fieldset": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& label": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "& input": {
                      color: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                    "&:hover": {
                      borderColor: "#222831",
                      fontFamily: `"Fraunces", serif`,
                    },
                  }}
                />
              </Stack>
            </Box>
            <Autocomplete
              // multiple
              id="tags-outlined"
              options={gender}
              // getOptionLabel={(option) => option.title}
              // defaultValue={[top100Films[13]]}
              filterSelectedOptions
              onChange={(e, v) => setGender(v)}
              value={Gender}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Your Gender"
                  placeholder="Favorites"
                />
              )}
              sx={{
                "& fieldset": {
                  borderColor: "black",
                  fontFamily: `"Fraunces", serif`,
                },
                "& label": {
                  color: "black",
                  fontFamily: `"Fraunces", serif`,
                },
                "& input": {
                  color: "black",
                  fontFamily: `"Fraunces", serif`,
                },
                "&:hover": {
                  borderColor: "black",
                  fontFamily: `"Fraunces", serif`,
                },
                width: "100%",
                marginTop: "20px",
                mb: 2,
              }}
            />
            <Button
              variant="contained"
              sx={{
                width: "100%",
                fontFamily: `"Fraunces", serif`,
                "&:hover": {
                  backgroundColor: "black",
                  scale: "110%",
                  borderRadius: "50px",
                },
                "&:active": { scale: "90%" },
                transition: "ease-in-out 0.2s",
                height: "40px",
              }}
              onClick={handleBodyData}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignUp;
