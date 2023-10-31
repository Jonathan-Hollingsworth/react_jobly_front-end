import React, {useContext} from "react";
import {useHistory} from "react-router-dom"
import { DataContext, MethodContext } from "./Context";
import './Card.css'

function JobCard({job, endpoint}) {
    const {user} = useContext(DataContext)
    const {apply} = useContext(MethodContext)
    const history = useHistory()

    async function handleApplication() {
        await apply(user.username, job.id)
        history.push(endpoint)
    }

    for (const app of user.applications) {
        if (app === job.id) {
            return (
                <div className="card">
                        <b>{job.title}</b>
                        <br />
                        <i>Salary: {job.salary}</i>
                        <br />
                        <i>Equity: {job.equity}</i>
                        <br />
                        <button disabled>Applied</button>
                </div>
            )
        }
    }

    return (
        <div className="card">
                <b>{job.title}</b>
                <br />
                <i>Salary: {job.salary}</i>
                <br />
                <i>Equity: {job.equity}</i>
                <br />
                <button onClick={handleApplication}>Apply</button>
        </div>
    )
}

export default JobCard;