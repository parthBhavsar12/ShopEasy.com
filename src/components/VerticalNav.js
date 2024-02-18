import React from 'react';
import { NavLink } from 'react-router-dom';

export default function VerticalNav() {
  return (
    <div className="verticalNav">
        <NavLink to="/" className='closeVerticalNav'><i className="zmdi zmdi-close"></i>Close</NavLink>
        <NavLink to="/account"><i className="zmdi zmdi-account"></i>Account</NavLink>
        <NavLink to="/settings"><i className="zmdi zmdi-settings"></i>Settings</NavLink>
        <NavLink to="/logout"><i className="zmdi zmdi-power"></i>Log Out</NavLink>
    </div>
  )
}
