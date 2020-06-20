import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from "react-bootstrap";

export default function () {

    const styles = {
        Navbar: {
            backgroundImage: "linear-gradient(90deg, #13547a 0%, #80d0c7 100%)"
        }
    }


    return (
        <Navbar className="shadow" style={styles.Navbar}>
            <Navbar.Brand>
                <Link to="/">NewsApp</Link>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link>
                    <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link to="/sources">Sources</Link>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}