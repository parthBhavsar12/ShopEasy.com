import React from 'react';

export default function Footer() {
    var year = new Date().getFullYear();
  return (
    <div id='footer'>
        <span>
            [ &copy; All copyrights reserved by ShopEasy.com - {year} ]
        </span>
        <a href='/' id='footerContactUs'>Contact Us</a>
    </div>
  )
}
