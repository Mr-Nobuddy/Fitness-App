// import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CalorieCounter from "./Components/CalorieCounter";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import NavBar from "./Components/NavBar";
import TrackWorkout from "./Components/TrackWorkout";
import SignIn from "./Components/SignIn";
import SearchWorkout from './Components/SearchWorkout';
import SearchRecepies from './Components/SearchRecepies';
import Profile from "./Components/Profile";
function App() {
  return (
    <div className="App" >
      {/* <NavBar/> */}
      <Router>
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path="/caloriecounter" element={<CalorieCounter/>}/>
          <Route path='/trackworkout' element={<TrackWorkout/>}/>
          <Route path="/searchworkout" element={<SearchWorkout/>}/>
          <Route path="/searchrecepies" element={<SearchRecepies/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
