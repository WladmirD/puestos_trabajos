import React from 'react';
import { LinkContainer } from "react-router-bootstrap";

import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { removeJwt } from '../services/headers';
import { admin, poster, user as userConst} from '../libs/constant';


const Header = () => {
  const history = useHistory();
  const context = useAppContext();
    function handleLogout() {
        context.userHasAuthenticated(false);
        context.setUser({});
        removeJwt();
        history.replace('/');
    }
    function user(user) {
      if(user === poster) {
        return (
          <>
            <LinkContainer to='/createJob'>
              <NavItem>Create Job</NavItem>
            </LinkContainer>
            <NavItem onClick={handleLogout}>Logout</NavItem>
          </>
        )
      }
      else if(user === admin) {
        return (
          <>
            <LinkContainer to='/admin'>
              <NavItem>Admin</NavItem>
            </LinkContainer>
            <NavItem onClick={handleLogout}>Logout</NavItem>
          </>
        )
      }
      else if (user === userConst){
        return (
          <>
          <NavItem onClick={handleLogout}>Logout</NavItem>
          </>
        )
      }
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
          {
            !context.isAuthenticated ?
            <>
            <LinkContainer to="/signup">
              <NavItem>Signup</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
            </>
            :
            <>
            </>
          }
          <LinkContainer to="/workStation">
              <NavItem>Buscar Trabajos</NavItem>
          </LinkContainer>
          {
          context.isAuthenticated ? user(context.user.type) : <></>
          }
          </Nav>

        </Navbar.Collapse>
      </Navbar>
        </>
    )
}


export default Header;