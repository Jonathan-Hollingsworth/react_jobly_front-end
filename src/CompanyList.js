import React, {useContext} from "react";
import CompanyCard from "./CompanyCard";
import DataContext from "./Context";

function CompanyList() {
    const {companies} = useContext(DataContext)
    return(
        <div>
            {companies.map(company => (
                <CompanyCard company={company} key={company.handle}/>
            ))}
        </div>
    )
}

export default CompanyList