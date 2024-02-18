import React from 'react';
import { NavLink } from 'react-router-dom';
// import VerticalNav from './VerticalNav';

export default function Nav(props) {
    // toggleVerticalMenu = () => {
        
    // }
  return (
    <>
        <nav>
            <NavLink to="/" className={(e)=>{return e.isActive?"navLogo activeNavItem": "navLogo" }}>
                <i class="zmdi zmdi-home"></i>
                <span id="one">Shop</span>
                <span id="two">Easy</span>
                <span id="three">.com</span>
            </NavLink>
        
            <NavLink to={props.slug1} className={(e)=>{return e.isActive?"navMenu activeNavItem": "navMenu" }}>
                <i class={`zmdi zmdi-${props.iName1}`}></i>
                {props.menuTitle1}
            </NavLink>
        
            <NavLink to={props.slug2} className={(e)=>{return e.isActive?"navMenu activeNavItem": "navMenu" }}>
                <i class={`zmdi zmdi-${props.iName2}`}></i>
                {props.menuTitle2}
            </NavLink>
        
            <NavLink to={props.slug3} className={(e)=>{return e.isActive?"navMenu activeNavItem": "navMenu" }}>
                <i class={`zmdi zmdi-${props.iName3}`}></i>
                {props.menuTitle3}    
            </NavLink>
        
            <label htmlFor="search" className='navMenu'>
                <i className="zmdi zmdi-search"></i>
                <input type="search" id="search" placeholder="Search"/>
            </label>
        
            <span id="hello">
                <i className="zmdi zmdi-account"></i>Hello, user
            </span>
        
        
            <img src="../../hamburger-icon.svg" alt="Menu" title="Open Menu" className='nav_menu' />
            
        </nav>
    </>
  )
}