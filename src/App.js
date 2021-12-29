import './App.css';
import React from 'react';
import Home from './pages/Home';
import Interest from './pages/Interest'
import MyNavbar from "./components/navbar/Navbar";
import WeatherWidget from './components/tools/WeatherWidget/weatherWidget';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrencyExchangeWidget from './components/tools/CurrencyExchange/currencyExchange';

function App() {
  return (
    <Router>
      <MyNavbar/>
      <Routes>
       <Route exact path="/home" element={<Home/>}/>
       <Route path='/interest' element={<Interest/>} />
       <Route path='/tools/weather_widget' element={<WeatherWidget/>}></Route>
       <Route path='/tools/currency_exchange' element={<CurrencyExchangeWidget/>}> </Route>
       </Routes>
    </Router>
  );
}

export default App;



