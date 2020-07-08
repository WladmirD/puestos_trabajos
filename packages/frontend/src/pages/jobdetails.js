import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "./styles/jobdetails.css";
import Layout from '../components/layout';
import { useAppContext } from '../libs/contextLib';
import { admin } from '../libs/constant';
import { config } from '../services/headers';
import axios from 'axios';

export default function Jobdetails() {
    const history = useHistory();
    const context = useAppContext();
    const configSet = config();
    const { id } = useParams();
    const url = 'http://69.55.55.239:8080/api/jobs/'
    const [job, setJob] = useState({posicion:"", address:"", url_logo: "", description:"", created_time:"", category:"", city:"", owner:{id:"", name:"", email:"", url:""}, type:""});
     useEffect(()=> {
         async function fetchData(){
         const responsejob = await axios.get(`${url}${id}`, configSet);
          setJob(responsejob.data);
     }
     fetchData();
     }, [id, configSet]);
     function edit() {
         history.push(`${id}/edit`);
     }
     function deleteJob() {
         axios.delete(`${url}${id}`, configSet)
            .then((res) => alert(res.data.message || 'Borrado'))
            .catch(err => alert(err.message || 'Error'));
        history.replace('/');
     }
return (
    <>
    <Layout>
    <div  className="jobdetails">
         <div  className="details">
            <a href={job.owner.url} rel="noopener noreferrer" target="_blank"><h1>{job.owner.name}</h1></a>
             {/* <h1>{job.owner.name}</h1> */}
            <h2>{job.address}, {job.city}</h2>
            <hr />
            <p>{job.category} | {job.type}</p>
            <hr />
            <p>Posicion: {job.posicion}</p>
            <p>{job.description}</p>
            <p>Send your resume to {job.owner.email}</p>
            {
                context.isAuthenticated && context.user.type === admin ?
                <div className="button">
                    <Button bsSize="small" onClick={() => edit()} className="btn-admin">
                        Edit
                    </Button>
                    <Button bsSize="small" onClick={() => deleteJob()} className="btn-admin">
                        Delete
                    </Button>
                </div>
                : <></>
            }
        </div>
        <div  className="LogoJob" >
         <img src={job.url_logo} alt="Broken" />
        </div>
    </div>
    </Layout>
    </>

);
}
