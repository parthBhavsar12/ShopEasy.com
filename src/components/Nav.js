import React from 'react';
import '../css/nav.css';

export default function Nav() {
  return (
    <>
        <nav>
            
            <a href="/" className="navLogo">
                <i class="zmdi zmdi-home"></i>
                <span id="one">Shop</span>
                <span id="two">Easy</span>
                <span id="three">.com</span>
            </a>
        
        
            <a href="/">
                <i class="zmdi zmdi-edit"></i>
                Make Order
            </a>
        
        
            <a href="/">
                <i class="zmdi zmdi-balance"></i>
                Make Payment
            </a>
        
        
            <a href="/">
                <i class="zmdi zmdi-store"></i>
                Find Shops
            </a>
        
        
            <label htmlFor="search">
                <i className="zmdi zmdi-search"></i>
                <input type="search" id="search" placeholder="Search"/>
            </label>
        
        
            <span id="hello">
                <i className="zmdi zmdi-account"></i>Hello, user
            </span>
        
        
            <img src="../../hamburger-icon.svg" alt="Menu" title="Open Menu"/>
            
        </nav>
    </>
  )
}