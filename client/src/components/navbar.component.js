import React from 'react';
import {Navbar, Nav, Image} from 'react-bootstrap'
import Logo from '../images/NavLogo.png'
//TODO: Change Brand to have jakes logo

export default function NavBar(props) {
    return(
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
            <Image src={Logo}
                width="100"
                height="50"
                className="d-inline-block align-top"
                alt="MexiJake"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto display-6">
                <Nav.Link href="/events" style={{margin: 'auto 10px'}}>Events</Nav.Link>
                <Nav.Link href="/shop" style={{margin: 'auto 10px'}}>Shop</Nav.Link>
                <Nav.Link href="/cart" style={{margin: 'auto 10px'}}>Cart</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
}
