import { LinkContainer } from "react-router-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  function handleLogout() {
    userHasAuthenticated(false);
  }
  return (
    <div className="App container">
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
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, user, setUser }}>
  <Routes />
</AppContext.Provider>
    </div>
  );
}

export default App;