import React from 'react';
import LeftLogo from './LeftLogo';
import Password from './Password';
import MoveAway from './MoveAway';

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

                    <div className="btn"><button type="submit"><i class="zmdi zmdi-redo"></i>Reset Password</button></div>

                </form>
                <MoveAway title="Go to " goto="Sign in" />
            </div>

        </div>
    </>
  )
}
