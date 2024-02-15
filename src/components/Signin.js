import React from 'react';
import LeftLogo from './LeftLogo';
import UserType from './UserType';

export default function Signin() {
  return (
    <>
        <div className="main">

            <LeftLogo/>
            
            <div className="container">

                <div className="title"><strong>Sign in</strong></div>

                <form action="/">
                    <UserType/>

                    <div><label htmlFor="email"><i className="zmdi zmdi-email"></i>Email</label></div>
                    <div><input type="email" name="email" id="email" placeholder="abc@xyz.pqr" /></div>

                    <div><label htmlFor="password"><i className="zmdi zmdi-lock"></i>Password</label></div>
                    <div><input type="password" name="password" id="password" placeholder="Minimum 8 characters" /></div>

                    <div className="btn"><button type="submit"><i class="zmdi zmdi-sign-in"></i>Sign in</button></div>

                </form>
                <div className="go_to_login"><span>New to ShopEasy.com? <a href="/">Sign up</a></span></div>

                <div className="go_to_login"><span><a href="/">Forgot Password?</a></span></div>
            </div>

        </div>
    </>
  )
}
