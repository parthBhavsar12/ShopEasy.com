import React from 'react';
import LeftLogo from './LeftLogo';
import '../css/var.css';
import '../css/entry.css';
import '../css/reset_password.css';

export default function ResetPassword2() {
  return (
    <>
        <div className="main">

            <LeftLogo/>
            
            <div className="container">

                <div className="title"><strong>Reset Password</strong></div>

                <form action="/">
                    <div className="divUser">
                        <label className='userResetPassword'>User: abc@xyz.pqr</label>
                    </div>

                    <div className='divUser'><label htmlFor="otp"><i class="zmdi zmdi-key"></i>OTP</label></div>
                    <div class="otp">
                      <input type="text" name="otp1" id="otp1" placeholder="0" />
                      <input type="text" name="otp2" id="otp2" placeholder="0" />
                      <input type="text" name="otp3" id="otp3" placeholder="0" />
                      <input type="text" name="otp4" id="otp4" placeholder="0" />
                      <input type="text" name="otp5" id="otp5" placeholder="0" />
                      <input type="text" name="otp6" id="otp6" placeholder="0" />
                    </div>

                    <div className="btn"><button type="submit">Proceed</button></div>

                </form>
                <div className="go_to_login"><span><a href="/">Go to Sign in</a></span></div>
            </div>

        </div>
    </>
  )
}
