import React from 'react';
import LeftLogo from './LeftLogo';
import UserType from './UserType';
import MoveAway from './MoveAway';

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
                <MoveAway title="New to ShopEasy.com? " goto="Sign up" />
            </div>

        </div>
    </>
  )
}
