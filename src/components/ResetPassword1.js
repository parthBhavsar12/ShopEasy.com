import React from 'react';
import LeftLogo from './LeftLogo';
import UserType from './UserType';

export default function ResetPassword1() {
  return (
    <>
        <div className="main">

            <LeftLogo/>
            
            <div className="container">

                <div className="title"><strong>Reset Password</strong></div>

                <form action="/">
                    <UserType/>

                    <div><label htmlFor="email"><i className="zmdi zmdi-email"></i>Email</label></div>
                    <div>
                      <input type="email" name="email" id="email" placeholder="abc@xyz.pqr" />
                    </div>

                    <div className="btn"><button type="submit"><i class="zmdi zmdi-mail-send"></i>Send OTP</button></div>

                </form>
                <div className="go_to_login"><span>New to ShopEasy.com? <a href="/">Sign up</a></span></div>
            </div>

        </div>
    </>
  )
}
