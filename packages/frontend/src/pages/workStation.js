import React, { useState } from "react";
import Moment from 'react-moment';

import "./styles/workStation.css";
import Layout from '../components/layout';

//URL API
const urlWorkStacionGet = "http://69.55.55.239:8080/api/jobs?search=";

export default function WorkStation() {

    const [search, setSearch] = useState("");
    const [workStation, setWorkStation] = useState([]);

    function getWorkStacion() {

        if (search.length > 1) {
            alert(`Searching : ${search} `);
            fetch(urlWorkStacionGet + search)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    console.log(myJson);
                    setWorkStation(myJson);
                });
        }

    }

    function postWorkStacion() {
        alert(`POST a Join`);
    }

    function ListJobs({ jobs }) {
        console.log(jobs)
        return (
            <div id="table1">
                <h6 className="line"><span><strong>{search}</strong></span></h6>

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
                        {jobs.map((job) => {
                            return (
                                <tr>
                                    <td>{job.posicion}</td>
                                    <td>{job.address}</td>
                                    <td><Moment fromNow>{job.created_time}</Moment></td>
                                    <td>{job.category}</td>
                                    <td>{job.city}</td>
                                    <td>{job.owner}</td>
                                </tr>
                            )
                        })}


                        {/* <tr className="table-secondary">
                            <td colspan="3">

                                <nav aria-label="Page navigation example float_right" >
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>

                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <Layout>
        <div>
            <div className="main-workStation">
                <div>
                    <div className="form-group inline">
                        <input className="form-control" defaultValue={search} onChange={(e) => { setSearch(e.target.value) }} />
                    </div>
                    <button className="btn btn-primary inline" onClick={() => getWorkStacion()}><strong>Search</strong></button>

                    <button className="btn btn-success float_right" onClick={() => postWorkStacion()} ><strong>Post a Job</strong></button>
                </div>
            </div>

            <div className="scroll-bar">
                {
                    workStation.length ?
                    (<ListJobs jobs={workStation} />) 
                    :
                    (<h1>Welcome</h1>)
                }

            </div>

        </div>
        </Layout>
    );
}