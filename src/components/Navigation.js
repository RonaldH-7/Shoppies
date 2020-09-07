import React from 'react';
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
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
        );
    }
}

export default Navigation;