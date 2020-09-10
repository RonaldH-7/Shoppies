import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <Navbar className="nav-bar" expand="lg">
                <Navbar.Brand href="#home" className="logo">
                    <img src={require('../images/shoppies_logo.png')} alt="Shoppies logo" style={{width: "40px", height: "auto"}} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Item>
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link" to="/contact">
                                Contact
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;