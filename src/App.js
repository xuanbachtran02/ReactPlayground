import './App.css';
import Home from './pages/Home';
import Interest from './pages/Interest'
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route path='/Interest' element={<Interest/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
