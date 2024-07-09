import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const SignIn = ({ snackbar }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const validate = () => {
    if(email !== "" && pass !== ""){
      axios
      .post("/validate", { email: email, pass:pass })
      .then((response) => {
        // console.log(response.data.message);
        if (response.data.message === "allowed") {
          document.location.replace("/caloriecounter");
        } else {
          snackbar({ message: "Wrong email or password", severity: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      snackbar({ message: "Please fill all the fields", severity: "warning" });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "20px",
        paddingBottom: "31px",
        background: "linear-gradient(#FFF9D0,#76ABAE)",
      }}
    >
      <Box sx={{ width: "65%" }}>
        <Stack direction="row" sx={{ borderRadius: "20px", height: "500px",display:{xs:"flex"},justifyContent:{xs:"center"}}}>
          <Box sx={{ width: "50%",display:{xs:"none",md:"flex"}}}>
            <img
              src="/images/fitness-gym.jpg"
              alt=""
              width="100%"
              height="100%"
              style={{
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
              }}
            />
          </Box>
          <Box
            sx={{
              width: {sm:"60%",xl:"50%"},
              paddingLeft: "30px",
              paddingRight: "30px",
              // paddingTop:"125px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              borderTopLeftRadius:{xs:"20px",md:0},
              borderBottomLeftRadius:{xs:"20px",md:0},
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
              Sign In
            </Typography>
            <Stack direction="column" spacing={2}>
              <TextField
                variant="outlined"
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
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
                label="Password"
                onChange={(e) => setPass(e.target.value)}
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
            <Typography
              sx={{
                textDecoration: "underline",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                fontSize: "12px",
                color: "blue",
                paddingTop: "10px",
                paddingBottom: "10px",
                fontFamily: `"Fraunces", serif`,
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </Typography>
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
                mt: 1,
                mb: 2,
              }}
              onClick={validate}
            >
              Sign In
            </Button>
            <Divider sx={{ fontFamily: `"Fraunces", serif` }}>OR</Divider>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                mt: 2,
                mb: 2,
                fontFamily: `"Fraunces", serif`,
                transition: "all ease 0.2s",
                borderColor: "black",
                color: "black",
                "&:hover": {
                  backgroundColor: "black",
                  scale: "110%",
                  color: "white",
                  borderColor: "black",
                  borderRadius: "50px",
                },
                "&:active": { scale: "99%" },
              }}
              href="http://localhost:2604/auth/google"
            >
              <FcGoogle size={33} style={{ marginRight: "5px" }} /> Sign In
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignIn;
