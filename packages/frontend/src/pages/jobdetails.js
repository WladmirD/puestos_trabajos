import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./styles/jobdetails.css";
import { } from "react-bootstrap";
import Layout from '../components/layout';
import { config } from '../services/headers';
import axios from 'axios';

export default function Jobdetails() {
    const { id } = useParams();
    const [job, setJob] = useState({posicion:"", address:"", url_logo: "", description:"", created_time:"", category:"", city:"", owner:{id:"", name:"", email:"", url:""}, type:""});
     useEffect(()=> {
         async function fetchData(){
         const responsejob = await axios.get(`http://69.55.55.239:8080/api/jobs/${id}`, config());
          setJob(responsejob.data);
     }
     fetchData();
     }, [id]);
return (
    <>
    <Layout>
    <div  className="jobdetails">
         <div  className="details">
             <h1>{job.owner.name}</h1>  
            <h2>{job.address}, {job.city}</h2>
            <hr />
            <p>{job.category} | {job.type}</p>
            <hr />
            <p>{job.posicion}</p>
            <p>{job.description}</p>
            <p>Send your resume to {job.owner.email}</p>
        </div>
        <div  className="LogoJob" >
         <img src={job.url_logo} alt="Broken" /> 
        </div> 
    </div>
    </Layout>
    </>

);
}

