import React, { useEffect, useState } from 'react'
import "./header.css";
import { Link, Navigate } from 'react-router-dom';
import logout from './logout_icon.jpeg';
import logo from "./rr.png";
const Header = (props) => {

  const handleChange = (e) => {
    const data = e.target.value;
    props.onDataReceived(data);
  }

  const handleLogoutClick = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }



  return (
    <>

      <div className="logoContainer">
        <div className="logo-1">
          <img src={logo} alt="gfg" />
          <div className="logo" >Recipe App</div>
        </div>
        <div>
          <div className="Logout" onClick={handleLogoutClick}><img src={logout} alt="" /></div>
        </div>
      </div>
      <div className="searchContainer" >
        <input className="search" type="search" placeholder='search' onChange={handleChange} />
      </div>
    </>
  )
}

export default Header