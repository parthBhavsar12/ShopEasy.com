import React from 'react';
import LeftLogo from './LeftLogo';
import UserType from './UserType';
import MoveAway from './MoveAway';

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

                
                <MoveAway title="New to ShopEasy.com? " goto="Sign up" />

                <MoveAway title="" goto="Forgot Password?" />
            </div>

        </div>
    </>
  )
}
