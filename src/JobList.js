import React, {useContext} from "react";
import {Redirect} from 'react-router-dom'
import {DataContext} from "./Context";
import JobCard from "./JobCard";

function JobList({company}) {
    const {jobs, user} = useContext(DataContext)

    if (!user.username) {
        return (<Redirect to='/' />)
    }

    if(company){
        return(
            <div>
                {company.jobs.map(job => (
                    <JobCard endpoint={`/companies/${company.handle}`} job={job} key={job.id}/>
                ))}
            </div>
        )
    }

    return(
        <div>
            {jobs.map(job => (
                <JobCard endpoint='/jobs' job={job} key={job.id}/>
            ))}
        </div>
    )
}

export default JobList