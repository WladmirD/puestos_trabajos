import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from '../components/layout';


const urlJobsGet = "http://69.55.55.239:8080/api/jobs?page=1"
export default function F1({}) {

    const [apiNow, setApiNow] = useState([]);

    useEffect( ()=>  {
        async function fetchData(){
        var api = await axios.get( urlJobsGet);
        setApiNow(api.data.jobs);
        console.log(api);
        
        }

        fetchData();

        

    },[]);

//Change this to change table size per category
var limitTable = 0;

return (
    <>
        <Layout>
        <div>
        <div>
            <p>IT</p>
        </div>
        <div id="table1">
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Posicion</th>
                            <th scope="col">Address</th>
                            <th scope="col">Created Time</th>
                            <th scope="col">Category</th>
                            <th scope="col">City</th>
                            <th scope="col">Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        apiNow.map((job) => {
                            if (job.category == "Salud" && limitTable < 3 ){
                                limitTable++;
                            return (
                                <tr>
                                    <td>{job.posicion}</td>
                                    <td>{job.address}</td>
                                    <td>{job.created_time}</td>
                                    <td>{job.category}</td>
                                    <td>{job.city}</td>
                                    <td>{job.owner}</td>
                                </tr>
                            )
                            }
                        })}
                    </tbody>
                </table>
            </div>
    </div>
        </Layout>
    </>
)





}
