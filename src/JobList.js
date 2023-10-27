import React, {useContext} from "react";
import DataContext from "./Context";
import JobCard from "./JobCard";

function JobList({company}) {
    const {jobs} = useContext(DataContext)
    if(company){
        return(
            <div>
                {company.jobs.map(job => (
                    <JobCard job={job} key={job.id}/>
                ))}
            </div>
        )
    }

    return(
        <div>
            {jobs.map(job => (
                <JobCard job={job} key={job.id}/>
            ))}
        </div>
    )
}

export default JobList