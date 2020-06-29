import React, { useState, useEffect } from "react";
import "./styles/jobdetails.css";
import { } from "react-bootstrap";
import axios from 'axios';

export default function Jobdetails(id) {

const [idtitulojob, setIdtitulojob] = useState("");
//setIdtitulojob (id);
    useEffect( async () => {
        const fetchData = async () =>{
        const responsejob = await axios.get(`http://69.55.55.239:8080/api/jobs/${id}`,{});

        setIdtitulojob(responsejob.idtitulojob)
        //console.log(responsejob); 
    }
    fetchData();
    }, []);
    const { posicion, category, address, city, url_logo,
         description,  owner, type} = setIdtitulojob;  

return (
    <div class="row" className="jobdetails">
        <div class="column" className="details">
            <h1>{owner}</h1>
            <h2>{address},{city}</h2>
            <hr />
            <p>{category} - {type}</p>
            <hr />
            <p>{posicion}</p>
            <p>{description}</p>
            <p>Send your resume to {owner}</p>
        </div>
        <div class="column" className="LogoJob" >
        <img src={url_logo} alt="Broken" />
        </div>
    </div>

);
}

