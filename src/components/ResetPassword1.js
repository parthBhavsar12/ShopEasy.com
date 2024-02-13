import React from 'react';
import LeftLogo from './LeftLogo';
import '../css/var.css';
import '../css/entry.css';
import '../css/reset_password.css';

export default function ResetPassword1() {
  return (
    <>
        <div className="main">

            <LeftLogo/>
            
            <div className="container">

                <div className="title"><strong>Reset Password</strong></div>

                <form action="/">
                    <div>
                        <label>You are a</label>
                        <span className="rdo">
                            <input type="radio" name="user_type" id="shopkeeper" value="shopkeeper" />
                            <label htmlFor="shopkeeper">Shopkeeper</label>
                        </span>

                        <span className="rdo">
                            <input type="radio" name="user_type" id="customer" value="customer" />
                            <label htmlFor="customer">Customer</label>
                        </span>
                    </div>

                    <div><label htmlFor="email"><i className="zmdi zmdi-email"></i>Email</label></div>
                    <div>
                      <input type="email" name="email" id="email" placeholder="abc@xyz.pqr" />
                      {/* <button className="sendOtp">Send OTP</button> */}
                    </div>

                    <div className="btn"><button type="submit">Send OTP</button></div>

                </form>
                <div className="go_to_login"><span>New to ShopEasy.com? <a href="/">Sign up</a></span></div>
            </div>

        </div>
    </>
  )
}
