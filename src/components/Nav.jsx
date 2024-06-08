import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav(props) {

    // const verNav = useRef();

    // const showVerticalNav = () => {
    //     verNav.current.style.display = 'flex';
    // }

    // const closeVerticalNav = () => {
    //     verNav.current.style.display = 'none';
    //     // verNav.current.children.style.display = 'none';
    // }
  return (
    <>
        <nav>
            <NavLink to="/" className={(e)=>{return e.isActive?"navLogo activeNavItem": "navLogo" }}>
                <i className="zmdi zmdi-home"></i>
                <span id="one">Shop</span>
                <span id="two">Easy</span>
                <span id="three">.com</span>
            </NavLink>
        
            <NavLink to={props.slug1} className={(e)=>{return e.isActive?"navMenu activeNavItem": "navMenu" }}>
                <i className={`zmdi zmdi-${props.iName1}`}></i>
                {props.menuTitle1}
            </NavLink>
        
            <NavLink to={props.slug2} className={(e)=>{return e.isActive?"navMenu activeNavItem": "navMenu" }}>
                <i className={`zmdi zmdi-${props.iName2}`}></i>
                {props.menuTitle2}
            </NavLink>
        
            <NavLink to={props.slug3} className={(e)=>{return e.isActive?"navMenu activeNavItem": "navMenu" }}>
                <i className={`zmdi zmdi-${props.iName3}`}></i>
                {props.menuTitle3}    
            </NavLink>
        
            <label htmlFor="search" className='navMenu'>
                <i className="zmdi zmdi-search"></i>
                <input type="search" id="search" placeholder="Search"/>
            </label>
        
            <span id="hello">
                <i className="zmdi zmdi-account"></i>Hello, user
            </span>

            <span id="logOut">
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