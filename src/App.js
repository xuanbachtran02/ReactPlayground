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
       <Route exact path="/ReactPlayground" element={<Home/>}/>
       <Route path='/ReactPlayground/interest' element={<Interest/>} />
       <Route path='/ReactPlayground/tools/weather_widget' element={<WeatherWidget/>}></Route>
       <Route path='/ReactPlayground/tools/currency_exchange' element={<CurrencyExchangeWidget/>}> </Route>
       </Routes>
    </Router>
  );
}

export default App;



