import React from "react";
import './CompanyCard.css'
import { Link } from 'react-router-dom'

function CompanyCard({company}) {
    return (
        <div className="card">
            <Link to={`/companies/${company.handle}`}>
                <b>{company.name}</b>
                <br />
                <i>{company.description}</i>
            </Link>
        </div>
    )
}

export default CompanyCard;