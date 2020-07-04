import React, { useState, useEffect } from "react";
import "./styles/jobdetails.css";
import { } from "react-bootstrap";
import Layout from '../components/layout';
import axios from 'axios';

export default function Jobdetails() {
    const [job, setJob] = useState({posicion:"", address:"", url_logo: "", description:"", created_time:"", category:"", city:"", owner:{id:"", name:"", email:"", url:""}, type:""});
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE1OTM4OTYzMTEsImV4cCI6MTU5Mzg5OTkxMX0.VQj27SieiSDGLW5Mu41X4ZUYkID6AL_Vyds3ILIhkmc";
    const config= {headers: {"Authorization": `Bearer ${token}`}};
     useEffect(()=> {
       
         async function fetchData(){
                         
         const responsejob = await axios.get(`http://69.55.55.239:8080/api/jobs/6`, config);
            
            //console.log(x);
          //console.log(responsejob.data);
          setJob(responsejob.data);


     }
     fetchData();
     }, []);

     


         
return (
    <>
    <Layout>
    <div  className="jobdetails">
         <div  className="details">
             <h1>{job.owner.name}</h1>  
            <h2>{job.address}, {job.city}</h2>
            <hr />
            <p>{job.category} - {job.type}</p>
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

