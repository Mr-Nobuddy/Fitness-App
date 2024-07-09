import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Slide from "@mui/material/Slide";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Loader from "./Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = ({ snackbar }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentWT, setCurrentWT] = useState("");
  const [currentHeight, setCurrentHeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [bmi, setBMI] = useState("");
  const [maintainCal, setMaintainCal] = useState("");
  const [Gender, setGender] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [age, setAge] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showBMIGauge, setShowBMIGauge] = useState(false);
  const [check, setCheck] = React.useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState({
    oldPass: false,
    newPass: false,
    confirmPass: false,
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowOldPassword = () =>
    setShowOldPassword((showOldPassword) => !showOldPassword);

  const handleClickShowNewPassword = () =>
    setShowNewPassword((showNewPassword) => !showNewPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);

  const updatePassword = () => {
    if (newPassword === confirmPassword) {
      axios
        .put("/updatepassword", {
          oldPassword: oldPassword.trim(),
          newPassword: newPassword.trim(),
        })
        .then((_) => {
          snackbar({ message: "Password Updated Successfully" });
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setPasswordErr({
            oldPass: false,
            newPass: false,
            confirmPass: false,
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 401) {
            setPasswordErr({ oldPass: true });
          } else {
            snackbar({
              message: "Error Occurred while updating password",
              severity: "error",
            });
          }
        });
    } else {
      setPasswordErr({ newPass: true, confirmPass: true });
    }
  };

  const updateProfile = () => {
    setShowBMIGauge(!showBMIGauge);
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
        snackbar({ message: "Profile Updated Successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setCheck(true);
    axios
      .get("/getprofile")
      .then((response) => {
        // console.log(response)
        setName(response.data[0].name);
        setEmail(response.data[0].email);
        setProfileImg(response.data[0].image);
        setCurrentWT(response.data[0].weight);
        setCurrentHeight(response.data[0].height);
        setGoalWeight(response.data[0].goal_weight);
        setBMI(response.data[0].bmi);
        setMaintainCal(response.data[0].maintainance_cal);
        setGender(response.data[0].gender);
        setAge(response.data[0].age);
        setCheck(false);
        // console.log(bmi)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showBMIGauge]);

  const gender = ["Male", "Female", "Other"];
  // const activity = [{}]
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: check ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          // border: "1px solid black",
        }}
      >
        <Loader />
      </Box>
      <Box
        sx={{
          margin: 0,
          padding: "20px",
          paddingTop: "10px",
          // backgroundColor: "yellow",
          display: check ? "none" : "",
          // background:"linear-gradient(#FFF9D0,#76ABAE)",
          // background:"linear-gradient(rgba(160,222,255,1) 0%, rgba(38,53,93,1) 62%)"
          backgroundImage: "url('images/3d-gym-equipment.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <NavBar />
        <Stack
          sx={{
            // border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              // border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
              // boxShadow: "5px 5px 20px grey",
              borderRadius: "20px",
              padding: "15px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
            direction="column"
            gap={3}
          >
            <Avatar src={profileImg} sx={{ width: "200px", height: "200px" }} />
            <Box sx={{ width: "80%" }}>
              <TextField
                variant="outlined"
                label="Full Name"
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
                  marginBottom: "10px",
                }}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <TextField
                variant="outlined"
                label="Your Email"
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
                  marginBottom: "10px",
                }}
                InputProps={{
                  readOnly: true,
                }}
                value={email}
              />
              <Typography
                sx={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: `"Fraunces", serif`,
                  fontSize: "1.5em",
                  fontWeight: "700",
                }}
              >
                Enter your details
              </Typography>
              <TextField
                variant="outlined"
                label="What is your Current Weight in Kgs"
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
                  marginBottom: "10px",
                }}
                value={currentWT}
                onChange={(e) => setCurrentWT(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="What is your Current Height in meters"
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
                  marginBottom: "10px",
                }}
                value={currentHeight}
                onChange={(e) => setCurrentHeight(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="What is your Weight Goal in Kgs"
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
                  marginBottom: "10px",
                }}
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
              />
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
                  marginBottom: "10px",
                }}
              />
              <TextField
                variant="outlined"
                label="What is your age"
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
                  marginBottom: "10px",
                }}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <Typography
                sx={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: `"Fraunces", serif`,
                  fontSize: "1.5em",
                  fontWeight: "700",
                }}
              >
                Calculated based on your input
              </Typography>
              <TextField
                variant="outlined"
                label="Your Current BMI"
                type="number"
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
                  marginBottom: "10px",
                }}
                value={bmi}
                InputProps={{
                  readOnly: true,
                }}
              />

              {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Gauge
                width={200}
                height={200}
                value={bmi}
                valueMin={0}
                valueMax={60}
              />
            </Box> */}

              <TextField
                variant="outlined"
                label="Your Current Maintainance Calories"
                onChange={(e) => setMaintainCal(e.target.value)}
                value={maintainCal}
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
                  marginBottom: "10px",
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Stack direction="row" gap={3}>
              <Button
                variant="contained"
                sx={{
                  fontFamily: `"Fraunces", serif`,
                  fontSize: "1.1em",
                  transition: "all ease 0.2s",
                  "&:hover": { backgroundColor: "black", scale: "110%" },
                  "&:active": { scale: "99%" },
                }}
                onClick={handleClickOpen}
              >
                Change Password
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle sx={{ fontFamily: `"Fraunces", serif` }}>
                  {"Change Password"}
                  <IconButton
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      right: 15,
                      "&:hover": { scale: "110%" },
                      "&:active": { scale: "99%" },
                      transition: "all ease 0.2s",
                    }}
                  >
                    <AiOutlineCloseCircle color="black" />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        padding: "20px",
                      }}
                    >
                      <TextField
                        variant="outlined"
                        label="Old Password"
                        type={showOldPassword ? "text" : "password"}
                        onChange={(e) => {
                          setOldPassword(e.target.value);
                        }}
                        value={oldPassword}
                        error={passwordErr.oldPass}
                        helperText={
                          passwordErr.oldPass ? "Incorrect Old Password" : ""
                        }
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
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowOldPassword}>
                                {showOldPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        variant="outlined"
                        label="New Password"
                        type={showNewPassword ? "text" : "password"}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                        value={newPassword}
                        error={passwordErr.newPass}
                        helperText={
                          passwordErr.newPass
                            ? "Not same to confirm password"
                            : ""
                        }
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
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowNewPassword}>
                                {showNewPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        variant="outlined"
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        value={confirmPassword}
                        error={passwordErr.confirmPass}
                        helperText={
                          passwordErr.confirmPass
                            ? "Not same to new password"
                            : ""
                        }
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
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowConfirmPassword}
                              >
                                {showConfirmPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      fontFamily: `"Fraunces", serif`,
                      transition: "all ease 0.2s",
                      "&:hover": { backgroundColor: "black", scale: "110%" },
                      "&:active": { scale: "99%" },
                    }}
                    onClick={updatePassword}
                  >
                    Change Password
                  </Button>
                  {/* <Button onClick={handleClose}>Agree</Button> */}
                </DialogActions>
              </Dialog>
              <Button
                variant="contained"
                sx={{
                  fontFamily: `"Fraunces", serif`,
                  fontSize: "1.1em",
                  transition: "all ease 0.2s",
                  "&:hover": { backgroundColor: "black", scale: "110%" },
                  "&:active": { scale: "99%" },
                }}
                onClick={updateProfile}
              >
                Update Profile
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
export default Profile;
