import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import AuthDetails from "../AuthDetails";
import { useSelector, useDispatch } from 'react-redux';
import {setAuthUser, setUserLoginStatus} from '../features/authSlice';

export default function Navbar() {
  const authUser = useSelector(state => state.auth.authUser)
    const activeStyles = {
        color: "white",
        fontWeight: "bold"
      };

  return (
    <div className="nav-main">
      <div className="nav">
        <div className="logo-container">
          <h1><NavLink to={authUser? "/" : "/home"}>Graham</NavLink></h1>
        </div>

        <div className="menu-items">
          
            {authUser ? <ul><li>
              <NavLink to="/" style={({ isActive }) => (isActive ? activeStyles : null)}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/profile" style={({ isActive }) => (isActive ? activeStyles : null)}>Profile</NavLink>
            </li> 
            <li>
              <NavLink to="/" style={({ isActive }) => (isActive ? activeStyles : null)}><AuthDetails /></NavLink>
            </li></ul> : ""}
            
            
          
        </div>
      </div>
    </div>
  );
}
