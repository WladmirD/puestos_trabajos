import React, { useState, useEffect } from "react";
import "./styles/jobdetails.css";
import { } from "react-bootstrap";
import axios from 'axios';

export default function Jobdetails({id}) {

const [idtitulojob, setIdtitulojob] = useState("");
setIdtitulojob (id);
    useEffect( async () => {
        const fetchData = async () =>{
        const responsejob = await axios.get(`http://69.55.55.239:8080/api/jobs/${id}`,{});

        setIdtitulojob(responsejob.idtitulojob)
        //console.log(responsejob); 
    }
    fetchData();
    }, []);
    const {id, posicion, category, address, city, url_logo,
         description, created_time, owner, type} = setIdtitulojob;  

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

