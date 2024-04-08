// import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CalorieCounter from "./Components/CalorieCounter";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NavBar from "./Components/NavBar";
import TrackWorkout from "./Components/TrackWorkout";
function App() {
  return (
    <div className="App" style={{backgroundColor:"yellow",paddingTop:"5px"}}>
      <NavBar/>
      <Router>
        <Routes>
          <Route path="/" element={<CalorieCounter/>}/>
          <Route path='/caloricounter' element={<TrackWorkout/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
