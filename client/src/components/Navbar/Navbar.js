import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Nav, Navbar, Button } from "react-bootstrap";
import auth from '../../helpers/auth';

export default function () {
    const history = useHistory();
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
                <Link to="/">Home</Link>
                <Link to="/sources">Sources</Link>
            </Nav>
            <Button className="mr-3" onClick={() => auth.logout(() => history.push("/login"))}>Logout</Button>
        </Navbar>
    );
}