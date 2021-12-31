import './App.css';
import React from 'react';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Interest from './pages/Interest'
import MyNavbar from "./components/navbar/Navbar";
import WeatherWidget from './components/tools/WeatherWidget/weatherWidget';
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import CurrencyExchangeWidget from './components/tools/CurrencyExchange/currencyExchange';

function App() {
  return (
    <HashRouter>
      <MyNavbar/>
      <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route exact path="/projects" element={<Projects/>}/>
       <Route path='/interest' element={<Interest/>} />
       <Route path='/tools/weather_widget' element={<WeatherWidget/>}></Route>
       <Route path='/tools/currency_exchange' element={<CurrencyExchangeWidget/>}> </Route>
       </Routes>
    </HashRouter>
  );
}

export default App;



