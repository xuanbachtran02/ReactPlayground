import React, {Component} from 'react';
import './Navbar.css';
import {MenuItems} from './MenuItems'
import {DropdownItems} from './DropdownItems'
import { Container } from 'reactstrap';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom';


class MyNavbar extends Component {
    // state = {clicked: false}
    render() {
        return(
           
            <Navbar collapseOnSelect expand="lg" className="topnav">
                <Container>
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto" defaultActiveKey="/">
                            {MenuItems.map((item, index) => {
                                return (
                                    <Nav.Link as={Link} to={item.link_to}>{item.section}</Nav.Link>
                                )
                            })}
                        <NavDropdown title="Tools" id="collasible-nav-dropdown">
                            {DropdownItems.map((item, index) => {
                                return (
                                    <NavDropdown.Item as={Link} to={item.link_to} className="dd_item" href="#action/3.2">{item.name}</NavDropdown.Item>
                                )
                            })}
                            
                        </NavDropdown>
                        </Nav>
                        {/* <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                        </Nav> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

}

export default MyNavbar;
