import React, { useState, useEffect } from "react";
import "./styles/jobdetails.css";
import { } from "react-bootstrap";
import Layout from '../components/layout';
import axios from 'axios';

export default function Jobdetails({}) {

    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE1OTM3MzgzMTAsImV4cCI6MTU5Mzc0MTkxMH0.1DfA94_naFsrr1HRnrY3tUh0NOiIbHjVaDz9dn6sd18";
    const config= {headers: {"Authorization": `Bearer ${token}`}};
    const [job, setJob] = useState({});
    

     useEffect(()=> {
         async function fetchData(){
             
         const responsejob = await axios.get(`http://69.55.55.239:8080/api/jobs/6`, config);


         setJob(responsejob.data);
         //console.log(job); 
     }
     fetchData();
     }, []);


         
return (
    <>
    <Layout>
    <div  className="jobdetails">
         <div  className="details">
              <h1>{job.owner}</h1>
            {/* <h2>{job.address},{job.city}</h2>
            <hr />
            <p>{job.category} - {job.type}</p>
            <hr />
            <p>{job.posicion}</p>
            <p>{job.description}</p>
            <p>Send your resume to {job.owner}</p> */}
        </div>
        <div  className="LogoJob" >
        {/* <img src={job.url_logo} alt="Broken" /> */}
        </div> 
    </div>
    </Layout>
    </>

);
}

