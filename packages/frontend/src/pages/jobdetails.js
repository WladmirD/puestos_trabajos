import React, { useState, useEffect } from "react";
import "./styles/jobdetails.css";
import { } from "react-bootstrap";
import axios from 'axios';

export default function Jobdetails({id}) {

const [idtitulojob, setIdtitulojob] = useState("");
setIdtitulojob (id);
    useEffect(() => {
        async function fetchMyAPI(){
            return await axios.get(`http://69.55.55.239:8080/api/jobs/${id}`,{})

        }
        console.log(responsejob);
        const {id, posicion, category, address, city, url_logo, description,
            created_time, owner, type} = responsejob;    
    });
    const responsejob = await fetchMyAPI();  

return (
    <div className="jobdetails">
        <div className="details">
            <h1>{owner.name}</h1>
            <h2>{city}</h2>
            <hr />
            <p>{category} - {type}</p>
            <hr />
            <p>{posicion}</p>
            <p>{description}</p>
            <p>Send your resume to {owner.email}</p>
        </div>
        <div className="LogoJob" >
            <img src={url_logo} />
        </div>
    </div>

);
}

