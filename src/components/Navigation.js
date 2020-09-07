import React from 'react';
import Nav from 'react-bootstrap/Nav'

class Navigation extends React.Component {
    render() {
        return (
            <Nav>
                <Nav.Item>
                    <Nav.Link className="nav-link" href="/">
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="nav-link" href="/about">
                        About
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="nav-link" href="/contact">
                        Contact
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default Navigation;