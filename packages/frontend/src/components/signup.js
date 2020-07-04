/* eslint-disable no-new-object */
import React, { useState} from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./styles/signup.css";
import { user, poster } from '../libs/constant';
import axios from 'axios';

export default function SignUp() {
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [url,setUrl] = useState("");
    const [role, setRole] = useState("");
    function validateForm() {
        return email.length > 0 && password.length > 0;
      }
    
      async function handleSubmit(event) {
        event.preventDefault();
        try {
          let formData = new Object();
          formData.name = name;
          formData.email = email;
          formData.password = password;
          formData.url = url;
          formData.role = role;
          const responseLog = await axios.post('http://69.55.55.239:8080/api/register',formData);
          alert(responseLog.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setUrl("");
          setRole("");
        } catch (e) {
          alert(e.message);
        }
      }
    return (
        <>
        <div className="Login">
        <form onSubmit={handleSubmit}>
            <FormGroup controlId="name" bsSize="small">
                <ControlLabel>Nombre</ControlLabel>
                <FormControl
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </FormGroup>
            <FormGroup controlId="email" bsSize="small">
            <ControlLabel>Email</ControlLabel>
            <FormControl
                autoFocus
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            </FormGroup>
            <FormGroup controlId="password" bsSize="small">
            <ControlLabel>Password</ControlLabel>
            <FormControl
                value={password}
                type="password"
                onChange={e => setPassword(e.target.value)}
                required
            />
            </FormGroup>
            <FormGroup controlId="url" bsSize="sm">
                <ControlLabel>Url personal o de la compañia</ControlLabel>
                <FormControl
                    value={url}
                    type="url"
                    onChange={e => setUrl(e.target.value)}
                />
            </FormGroup>
            <select name={role} onChange={e => setRole(e.target.value)} required className="select-box">
                <option value="" defaultValue>Tipo de usuario</option>
                <option value={user}>{user}</option>
                <option value={poster}>{poster}</option>
            </select>
            <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Sign Up
            </Button>
        </form>
        </div>
        </>
    )
}