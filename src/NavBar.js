import React, { useContext } from "react";
import { NavLink, useHistory } from 'react-router-dom'
import './NavBar.css'
import {DataContext, MethodContext} from "./Context";

function NavBar() {

    const {user} = useContext(DataContext)
    const {logout} = useContext(MethodContext)
    const history = useHistory()

    if(!user.username) {
        return (
            <div className="navbar">
                <NavLink exact to='/'>Home</NavLink>
                <NavLink to='/signup'>Signup</NavLink>
                <NavLink to='/login'>Login</NavLink>
            </div>
        )
    }

    function handleLogout(evt) {
        evt.preventDefault();
        logout()
        history.push('/')
    }


    return (
        <div className="navbar">
            <NavLink exact to='/'>Home</NavLink>
            <NavLink to='/companies'>Companies</NavLink>
            <NavLink to='/jobs'>Jobs</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
            <NavLink exact to='/logout' onClick={handleLogout}>Logout</NavLink>
        </div>
    )
}

export default NavBar;