import React, {useContext, useState} from "react";
import {Redirect} from 'react-router-dom'
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import {DataContext} from "./Context";

function CompanyList() {
    const {companies, user} = useContext(DataContext)
    const [listedCompanies, setListedCompanies] = useState(companies)
    const [formData, setFormData] = useState({query: ''});
    console.log(listedCompanies)

    if (!user.username) {
        return (<Redirect to='/' />)
    }

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(fData => ({
          ...fData,
          [name]: value
        }));
    };

    async function updateSearchTerm(evt) {
        evt.preventDefault();
        const { query } = formData;
        if (query.length === 0) {
            const companies = await JoblyApi.getCompanies()
            setListedCompanies(companies)
        } else {
            const companies = await JoblyApi.getCompaniesByName(query)
            setListedCompanies(companies)
        }
    }

    return(
        <div>
            <form onSubmit={updateSearchTerm}>
              <input name="query" type="text" onChange={handleChange}/>
              <button type="submit">Search by Name</button>
            </form>
            {listedCompanies.map(company => (
                <CompanyCard company={company} key={company.handle}/>
            ))}
        </div>
    )
}

export default CompanyList