import React from 'react';
import LeftLogo from './LeftLogo';
import Password from './Password';
import UserType from './UserType';
import GoTo from './GoTo';

export default function Signup1() {
  return (
    <>
        <div class="main">

            <LeftLogo/>

            <div class="container">

                <div class="title"><strong>Sign up</strong></div>

                <form action="/">
                    
                    <UserType/>

                    <div><label for="email"><i class="zmdi zmdi-email"></i>Email</label></div>
                    <div><input type="email" name="email" id="email" placeholder="abc@xyz.pqr" /></div>

                    <Password/>

                    <div class="btn"><button type="submit"><i class="zmdi zmdi-fast-forward"></i>Next</button></div>

                </form>
                
                <GoTo title="Have an account? " goto="Sign in" slug="../signin"/>
            </div>

        </div>
    </>
  )
}
