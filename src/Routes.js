import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import CompanyList from './CompanyList'
import CompanyDetail from './CompanyDetail'
import JobList from './JobList'
import UserSignupForm from './UserSignupForm'
import UserLoginForm from './UserLoginForm'
import Profile from './Profile'

function Routes() {
    return(
        <Switch>
            <Route exact path='/companies/:handle'><CompanyDetail /></Route>
            <Route exact path='/companies'><CompanyList /></Route>
            <Route exact path='/jobs'><JobList /></Route>
            <Route exact path='/profile'><Profile /></Route>
            <Route exact path='/login'><UserLoginForm /></Route>
            <Route exact path='/signup'><UserSignupForm /></Route>
            <Route exact path='/'><h1>Coming soon</h1></Route>
            <Redirect to='/'/>
        </Switch>
    )
}

export default Routes