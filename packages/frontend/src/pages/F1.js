import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from '../components/layout';


const urlJobsGet = "http://69.55.55.239:8080/api/jobs?category=IT";
const urlCategoryGet = "http://69.55.55.239:8080/api/category";
export default function F1({}) {

    const [jobsGet, setJobsGet] = useState([]);
    const [categoryGet, setCategoryGet] = useState([]);


    useEffect( ()=>  {
        async function fetchData(){
        var apiJobs = await axios.get( urlJobsGet);
        setJobsGet(apiJobs.data);
        console.log(apiJobs);

        var apiCategory = await axios.get( urlCategoryGet);
        setCategoryGet(apiCategory);
        console.log(apiCategory);
        
        }

        fetchData();

        

    },[]);

//Change this to change table size per category
var limit_table = 5;
var counter_rows =0;

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
                        jobsGet.map((job) => {
                            if (counter_rows < limit_table ){
                                counter_rows++;
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
