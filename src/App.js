import './App.css';
import React from 'react';
import Home from './pages/Home';
import Interest from './pages/Interest'
import MyNavbar from "./components/navbar/Navbar";
import MyComponent from './components/tools/WeatherWidget/weatherWidget';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <MyNavbar/>
      <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route path='/interest' element={<Interest/>} />
       <Route path='/tools/weather_widget' element={<MyComponent/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;



