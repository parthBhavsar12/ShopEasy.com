import React from 'react';

export default function Nav(props) {
  return (
    <>
        <nav>
            
            <a href="/" className="navLogo">
                <i class="zmdi zmdi-home"></i>
                <span id="one">Shop</span>
                <span id="two">Easy</span>
                <span id="three">.com</span>
            </a>
        
        
            <a href="/" className="navMenu">
                <i class={`zmdi zmdi-${props.iName1}`}></i>
                {props.menuTitle1}
            </a>
        
        
            <a href="/" className="navMenu">
                <i class={`zmdi zmdi-${props.iName2}`}></i>
                {props.menuTitle2}
            </a>
        
        
            <a href="/" className="navMenu">
                <i class={`zmdi zmdi-${props.iName3}`}></i>
                {props.menuTitle3}    
            </a>
        
        
            <label htmlFor="search" className='navMenu'>
                <i className="zmdi zmdi-search"></i>
                <input type="search" id="search" placeholder="Search"/>
            </label>
        
        
            <span id="hello">
                <i className="zmdi zmdi-account"></i>Hello, user
            </span>
        
        
            <img src="../../hamburger-icon.svg" alt="Menu" title="Open Menu" className='nav_menu'/>
            
        </nav>
    </>
  )
}