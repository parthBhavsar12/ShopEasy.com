import React from 'react';
import LeftLogo from './LeftLogo';
import GoTo from './GoTo';

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

                    <div className="btn"><button type="submit"><i class="zmdi zmdi-fast-forward"></i>Proceed</button></div>

                </form>
                <GoTo title="Go to " goto="Sign in" />
            </div>

        </div>
    </>
  )
}
