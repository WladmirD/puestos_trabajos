import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./styles/Login.css";
import { useAppContext } from "../libs/contextLib";
import { setJwt } from '../services/headers';
import Layout from '../components/layout';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated, setUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const responseLog = await axios.post('/api/logIn',{
        email ,
        password
      })
      setUser(responseLog.data.user);
      setJwt(responseLog.data.token);
      userHasAuthenticated(true);
      setEmail("");
      setPassword("");
      history.replace('/');
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <>
    <Layout>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
    </Layout>
    </>
  );
}