import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Nav(props) {

  const navigate = useNavigate();

  useEffect(
    () => {handleUser()}
  , []);

  const handleUser = async (e) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/auth/me",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
        { withCredentials: true }
      );

      if (response.status == 200) {
        console.log(response);
        console.log(response.user);
        console.log(response.user.email);
      }
    } catch (error) {
      // console.log(error);
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/logout",
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
        { withCredentials: true }
      );

      console.log(response);
      if (response.status == 200) {
        console.log(response);
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }


  };
  return (
    <>
      <nav>
        <NavLink to="/shopkeeperhome" className={(e) => { return e.isActive ? "navLogo activeNavItem" : "navLogo" }}>
          <i className="zmdi zmdi-home"></i>
          <span id="one">Shop</span>
          <span id="two">Easy</span>
          <span id="three">.com</span>
        </NavLink>

        <NavLink to={props.slug1} className={(e) => { return e.isActive ? "navMenu activeNavItem" : "navMenu" }}>
          <i className={`zmdi zmdi-${props.iName1}`}></i>
          {props.menuTitle1}
        </NavLink>

        <NavLink to={props.slug2} className={(e) => { return e.isActive ? "navMenu activeNavItem" : "navMenu" }}>
          <i className={`zmdi zmdi-${props.iName2}`}></i>
          {props.menuTitle2}
        </NavLink>

        <NavLink to={props.slug3} className={(e) => { return e.isActive ? "navMenu activeNavItem" : "navMenu" }}>
          <i className={`zmdi zmdi-${props.iName3}`}></i>
          {props.menuTitle3}
        </NavLink>

        {/* <label htmlFor="search" className='navMenu'>
                <i className="zmdi zmdi-search"></i>
                <input type="search" id="search" placeholder="Search"/>
            </label> */}

        {/* <span id="hello">
                <i className="zmdi zmdi-account"></i>Hello, user
            </span> */}

        <NavLink to={props.slug4} className={(e) => { return e.isActive ? "navMenu activeNavItem" : "navMenu" }}>
          <i className={`zmdi zmdi-${props.iName4}`}></i>
          {props.menuTitle4}
        </NavLink>

        <span id="logOut" onClick={handleLogout}>
          <i className="zmdi zmdi-power"></i>Log Out
        </span>


        {/* <img src="../../hamburger-icon.svg" alt="Menu" title="Open Menu" className='nav_menu' onClick={showVerticalNav}/> */}

      </nav>
      {/* <div className="verticalNav" ref={verNav}>
            <nav>
                <NavLink className='closeVerticalNav'><i className="zmdi zmdi-close" onClick={closeVerticalNav}></i>Close</NavLink>
                <NavLink to="/account"><i className="zmdi zmdi-account"></i>Account</NavLink>
                <NavLink to="/settings"><i className="zmdi zmdi-settings"></i>Settings</NavLink>
                <NavLink to="/logout"><i className="zmdi zmdi-power"></i>Log Out</NavLink>
            </nav>
        </div> */}
    </>
  )
}