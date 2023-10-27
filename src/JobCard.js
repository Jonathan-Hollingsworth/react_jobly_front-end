import React from "react";
import './Card.css'

function JobCard({job}) {
    return (
        <div className="card">
                <b>{job.title}</b>
                <br />
                <i>Salary: {job.salary}</i>
                <br />
                <i>Equity: {job.equity}</i>
        </div>
    )
}

export default JobCard;