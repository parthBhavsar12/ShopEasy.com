import React from 'react';

export default function VerticalNav() {
    const closeVerticalNav = ()=>{
        
    }
  return (
    <div className="verticalNav">
        <a href="/" className='closeVerticalNav' onClick={closeVerticalNav}><i className="zmdi zmdi-close"></i>Close</a>
        <a href="/"><i className="zmdi zmdi-account"></i>Account</a>
        <a href="/"><i className="zmdi zmdi-settings"></i>Settings</a>
        <a href="/"><i className="zmdi zmdi-power"></i>Log Out</a>
    </div>
  )
}
