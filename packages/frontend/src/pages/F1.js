import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from '../components/layout';

//Incomplete, needs append of a specficic category
const urlJobsGet = "http://69.55.55.239:8080/api/jobs?category=";
const urlCategoryGet = "http://69.55.55.239:8080/api/category";
export default function F1({}) {

    const [jobsGet, setJobsGet] = useState([]);
    const [categoryGet, setCategoryGet] = useState([]);

    var tableInfos = [];
    


    useEffect( ()=>  {
        async function fetchData(){

        //Get all categories
        var apiCategory = await axios.get( urlCategoryGet);
        setCategoryGet(apiCategory.data);
        console.log("Category Dentro")
        console.log(apiCategory.data);
        
        

        //For each category, get all entries...needs limit, coming soon
        apiCategory.data.map(async (category) => {


            var apiJobs = await axios.get( urlJobsGet + category.name);
            setJobsGet(jobsGet=> jobsGet.concat(apiJobs.data));
            
            console.log("Jobsget Dentro");
            console.log(jobsGet);
            

        })

        
        }

        fetchData();

        

    },[]);

//Change this to change table size per category
var limit_table = 20;
var counter_rows =0;
var categoryOld ="";
var categoryNew = "";


console.log("TableInfos fuera");
console.log(tableInfos);
console.log("Jobsget fuera");   



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
                            console.log("Jobsget Dentro del map ese");
                            console.log(jobsGet);
                            if (counter_rows < limit_table  ){
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
