import React, {Component} from 'react';
import {  Link } from "react-router-dom";
import {MenuItems} from './MenuItems'


class Navbar extends Component {
    state = {clicked: false}

    render() {
        return(
            <div /*className="topnav" */>
                <h1 className="navbar-logo"></h1>
                <div className="menu-icon">

                </div>

                <ul>
                    {MenuItems.map((item, index) => {
                        return (
                            <li>
                                <Link to={item.link_to}>{item.section}</Link>
                            </li>
                        )
                    })}

                </ul>
            </div>
        )
    }
  

}

export default Navbar;