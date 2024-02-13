import React from 'react';
import LeftLogo from './LeftLogo';
import '../css/var.css';
import '../css/entry.css';
import Password from './Password';

export default function Signup1() {
  return (
    <>
        <div class="main">

            <LeftLogo/>

            <div class="container">

                <div class="title"><strong>Sign up</strong></div>

                <form action="/">
                    <div>
                        <label>You are a</label>
                        <span class="rdo">
                            <input type="radio" name="user_type" id="shopkeeper" value="shopkeeper" />
                            <label for="shopkeeper">Shopkeeper</label>
                        </span>

                        <span class="rdo">
                            <input type="radio" name="user_type" id="customer" value="customer" />
                            <label for="customer">Customer</label>
                        </span>
                    </div>

                    <div><label for="email"><i class="zmdi zmdi-email"></i>Email</label></div>
                    <div><input type="email" name="email" id="email" placeholder="abc@xyz.pqr" /></div>

                    <Password/>

                    <div class="btn"><button type="submit">Next</button></div>

                </form>
                <div class="go_to_login"><span>Have an account? <a href="/">Sign in</a></span></div>
            </div>

        </div>
    </>
  )
}
