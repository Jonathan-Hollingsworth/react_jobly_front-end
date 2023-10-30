import React, {useState, useEffect, useContext} from "react";
import {useParams, Redirect} from 'react-router-dom'
import JoblyApi from "./api";
import {DataContext} from "./Context";
import JobList from "./JobList";

function CompanyDetail() {
    const [company, setCompany] = useState({})
    const {user} = useContext(DataContext)
    const {handle} = useParams()

    useEffect(() => {
        async function getCompany() {
          let company = await JoblyApi.getCompany(handle)
          setCompany(company)
          console.log(company)
        }
        getCompany();
      }, []);

    if (!user.username) {
        return (<Redirect to='/' />)
    }

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