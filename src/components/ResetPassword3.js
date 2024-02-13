import React from 'react';
import LeftLogo from './LeftLogo';
import Password from './Password';

export default function ResetPassword3() {
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

                    <Password/>

                    <div className="btn"><button type="submit">Reset</button></div>

                </form>
                <div className="go_to_login"><span><a href="/">Go to Sign in</a></span></div>
            </div>

        </div>
    </>
  )
}
