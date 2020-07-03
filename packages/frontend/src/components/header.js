import React, {useState} from 'react';
import { LinkContainer } from "react-router-bootstrap";

import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { AppContext } from "../libs/contextLib";
import { removeJwt } from '../services/headers';


const Header = () => {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    function handleLogout() {
        userHasAuthenticated(false);
        removeJwt();
    }
    return (
        <>
        <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Bolsa de Trabajos</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
          {isAuthenticated
  ? <NavItem onClick={handleLogout}>Logout</NavItem>
  : <>
      <LinkContainer to="/signup">
        <NavItem>Signup</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem>Login</NavItem>
      </LinkContainer>
      <LinkContainer to="/jobdetails">
        <NavItem>Job Details</NavItem>
      </LinkContainer>
      <LinkContainer to="/F1">
        <NavItem>F1</NavItem>
      </LinkContainer>
    </>

}
              <LinkContainer to="/workStation">
              <NavItem>Buscar Trabajos</NavItem>
            </LinkContainer>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
        </>
    )
}

export default Header;