import React, {Component} from 'react';
import './Navbar.css';
// import {  Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';
import {MenuItems} from './MenuItems'
import { Container } from 'reactstrap';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';


class MyNavbar extends Component {
    // state = {clicked: false}
    render() {
        return(
            <Navbar className="topnav" >
                <Container>
                    {/* <Navbar.Brand href="#home">Peter's Site</Navbar.Brand> */}
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        {MenuItems.map((item, index) => {
                            return (
                                <NavLink activeClassName="active" className='nav-links' to={item.link_to}>{item.section}</NavLink>
                            )
                        })}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

}

export default MyNavbar;
