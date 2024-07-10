// import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CalorieCounter from "./Components/CalorieCounter";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TrackWorkout from "./Components/TrackWorkout";
import SignIn from "./Components/SignIn";
import SearchWorkout from "./Components/SearchWorkout";
import SearchRecepies from "./Components/SearchRecepies";
import Profile from "./Components/Profile";
import { Alert, Snackbar } from "@mui/material";
import SignUp from "./Components/SignUp";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import FitnessContext from "./FitnessContext";
import axios from "axios";
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
function App() {
  //   const THEME = createMuiTheme({
  //     typography: {
  //      "fontFamily": `"Fraunces", serif`,
  //     }
  //  });
  const [snackbar, setSnackbar] = React.useState(null);
  const [cookie, setCookie] = React.useState(false);

  // const value = React.useMemo(
  //   () => ({
  //     cookie,
  //     setCookie,
  //   }),
  //   [cookie, setCookie]
  // );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(null);
  };
  // React.useEffect(() => {
  //   axios
  //     .get("/checkcookie")
  //     .then((response) => {
  //       if (response.data.message == "nocookie") {
  //         setCookie(false);
  //       } else {
  //         setCookie(true);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });
  return (
    <div className="App">
      {/* <NavBar/> */}
      <FitnessContext.Provider>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn snackbar={setSnackbar} />} />
            {/* <Route element={<ProtectedRoutes />}>
            </Route> */}
            <Route
              path="/caloriecounter"
              element={<CalorieCounter snackbar={setSnackbar} />}
            />
            <Route
              path="/trackworkout"
              element={<TrackWorkout snackbar={setSnackbar} />}
            />
            <Route path="/searchworkout" element={<SearchWorkout />} />
            <Route path="/searchrecepies" element={<SearchRecepies />} />
            <Route
              path="/profile"
              element={<Profile snackbar={setSnackbar} />}
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </FitnessContext.Provider>

      {!!snackbar && (
        <Snackbar open={true} autoHideDuration={8000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default App;
