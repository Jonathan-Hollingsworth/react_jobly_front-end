import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'

function Routes() {
    return(
        <Switch>
            <Route exact path='/companies/:handle'></Route>
            <Route exact path='/companies'></Route>
            <Route exact path='/jobs'></Route>
            <Route exact path='/profile'></Route>
            <Route exact path='/login'></Route>
            <Route exact path='/signup'></Route>
            <Route exact path='/'></Route>
            <Redirect to='/'/>
        </Switch>
    )
}