import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import JoblyApi from "./api";
import JobList from "./JobList";

function CompanyDetail() {
    const [company, setCompany] = useState({})
    const {handle} = useParams()
    useEffect(() => {
        async function getCompany() {
          let company = await JoblyApi.getCompany(handle)
          setCompany(company)
          console.log(company)
        }
        getCompany();
      }, []);

    if(company.jobs){
        return (
            <div>
                <h1>{company.name}</h1>
                <i>{company.description}</i>
                <JobList company={company}/>
            </div>
        )
    }

    return (
        <div>
            <h1>{company.name}</h1>
            <i>{company.description}</i>
        </div>
    )
}

export default CompanyDetail