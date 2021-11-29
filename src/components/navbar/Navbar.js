import React from 'react';
import {  Link } from "react-router-dom";
const Navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/contribution">Contribution</Link>
    </li>
    <li>
      <Link to="/interest">Interest</Link>
    </li>
    <li>
      <Link to="/tools">Tools</Link>
    </li>
  </div>
  );
}
export default Navbar;