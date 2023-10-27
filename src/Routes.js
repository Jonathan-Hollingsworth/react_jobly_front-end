import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import CompanyList from './CompanyList'

function Routes() {
    return(
        <Switch>
            <Route exact path='/companies/:handle'><h1>Coming soon</h1></Route>
            <Route exact path='/companies'><h1><CompanyList /></h1></Route>
            <Route exact path='/jobs'><h1>Coming soon</h1></Route>
            <Route exact path='/profile'><h1>Coming soon</h1></Route>
            <Route exact path='/login'><h1>Coming soon</h1></Route>
            <Route exact path='/signup'><h1>Coming soon</h1></Route>
            <Route exact path='/'><h1>Coming soon</h1></Route>
            <Redirect to='/'/>
        </Switch>
    )
}

export default Routes