import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from '../components/layout';
import { render } from "@testing-library/react";

//Incomplete, needs append of a specficic category
const urlJobsGet = "http://69.55.55.239:8080/api/jobs?page=";
const urlCategoryGet = "http://69.55.55.239:8080/api/category";


export default function F1({}) {

    const [jobsGet, setJobsGet] = useState([]);
    const [categoryGet, setCategoryGet] = useState([]);
    const [jobsPage, setJobsPage] = useState(1);
    const [jobsPageLimit,setJobsPageLimit ] = useState(0);


    useEffect( ()=>  {
        async function fetchData(){

        //Get all categories
        var apiCategory = await axios.get( urlCategoryGet);
        setCategoryGet(apiCategory.data);
        console.log("Category Dentro")
        console.log(apiCategory.data);

        //Get recent jobs
        var apiJobsGet = await axios.get( urlJobsGet + jobsPage);
        setJobsGet(apiJobsGet.data.jobs);
        console.log("JobsGet Dentro")
        console.log(apiJobsGet.data);
        
        setJobsPageLimit(apiJobsGet.data.total);
        

        
        

        

        }

        fetchData();
        

        

    },[jobsPage]);

    


 


function nextPage(){
    if (jobsPage < jobsPageLimit)
        setJobsPage(jobsPage + 1);
    else 
        alert("No hay mas trabajos " );
        render();
}

function previousPage(){
    if (jobsPage > 1)
        setJobsPage(jobsPage - 1);
    else 
        alert("No hay paginas anteriores");
        
}

return (
    <>
        <Layout>



        <div>
            <div>
            
            {
            //For each category, create table with all jobs of that category that match.
            categoryGet.map((categ) =>{
                //Change this to change table size per category
                var limit_table = 5;
                var counter_rows =0;                
                return (

                <div>

                    
        <div>
            <p id={categ.name} >{jobsGet.city}</p>
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
                            
                            if (    counter_rows < limit_table  && categ.name ==job.category  ){
                                counter_rows++;

                                document.getElementById(categ.name).innerHTML=job.category; 
                                
                                
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
                        })
                        
                        }
                        
                    </tbody>
                </table>
                
            </div>

                </div>            

                )


            })
            
            
            
            }
            
            
            <div>
                   
                            <button className="btn btn-secondary fixed-bottom" id="button-previous-page" onClick={previousPage} >
                             Previous
                            </button>
                    
                    
                
                        
                <button className="btn btn-secondary fixed-bottom" id="button-page" onClick={nextPage} >
                    Next
                </button>
                
            </div>

            


            </div>
            
    </div>
        </Layout>
    </>
)





}
