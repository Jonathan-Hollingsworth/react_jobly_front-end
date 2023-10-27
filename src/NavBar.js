import React, { useContext } from "react";
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import DataContext from "./Context";

function NavBar() {

    // const {user} = useContext(DataContext)

    // if(!user) {
    //     return (
    //         <div>
    //             <NavLink to='/'>Home</NavLink>
    //             <NavLink to='/signup'>Signup</NavLink>
    //             <NavLink to='/login'>Login</NavLink>
    //         </div>
    //     )
    // }

    function logout(evt) {
        evt.preventDefault();

    }


    return (
        <div className="navbar">
            <NavLink exact to='/'>Home</NavLink>
            <NavLink to='/companies'>Companies</NavLink>
            <NavLink to='/jobs'>Jobs</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
        </div>
    )
}

export default NavBar;