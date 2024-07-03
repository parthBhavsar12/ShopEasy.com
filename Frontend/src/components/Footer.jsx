import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    var year = new Date().getFullYear();
  return (
    <div id='footer'>
        <span>
            [ &copy; All copyrights reserved by ShopEasy.com - {year} ]
        </span>
        <Link to='/contact' id='footerContactUs'>Contact Us</Link>
    </div>
  )
}
