import React from 'react';
import { LinkContainer } from "react-router-bootstrap";

import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { removeJwt } from '../services/headers';


const Header = () => {
  const context = useAppContext();
    function handleLogout() {
        context.userHasAuthenticated(false);
        context.setUser({});
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
          {context.isAuthenticated
  ? <NavItem onClick={handleLogout}>Logout</NavItem>
  : <>
      <LinkContainer to="/signup">
        <NavItem>Signup</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem>Login</NavItem>
      </LinkContainer>
      <LinkContainer to='/admin'>
        <NavItem>Admin</NavItem>
      </LinkContainer>
      <LinkContainer to="/jobdetails">
        <NavItem>Job Details</NavItem>
      </LinkContainer>
      <LinkContainer to="/F1">
        <NavItem>F1</NavItem>
      </LinkContainer>
      <LinkContainer to="/jobs/1/edit">
        <NavItem>Edit Post</NavItem>
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