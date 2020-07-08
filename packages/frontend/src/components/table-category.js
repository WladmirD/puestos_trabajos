/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import './styles/table-category.css';

const urlJobsGet = "/api/jobs";
export default function tableCategory({ categoryName }) {
    const [category] = useState(categoryName);
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios.get(`${urlJobsGet}?category=${category}`)
            .then((res) => {
                setJobs(res.data);
            })
            .catch(err => alert(err || 'Problem'));
    })

    return (
        <>
        <div className="scroll-bar">
        <div id="table1">
                <h6 className="line"><span><strong>{category}</strong></span></h6>

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
                    </tbody>
            </table>
        </div>
        </div>
        </>
    )
}