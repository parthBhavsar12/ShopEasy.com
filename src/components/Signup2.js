import React from 'react';
import LeftLogo from './LeftLogo';

export default function Signup2() {
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

                  <div><label for="password"><i class="zmdi zmdi-lock-outline"></i>Password</label></div>
                  <div><input type="password" name="password" id="password" placeholder="Minimum 8 characters" /></div>

                  <div><label for="password"><i class="zmdi zmdi-lock"></i>Confirm Password</label></div>
                  <div><input type="password" name="con_password" id="con_password" placeholder="Minimum 8 characters" />
                  </div>

                  <div class="btn"><button type="submit">Next</button></div>

              </form>
              <div class="go_to_login"><span>Have an account? <a href="/">Log in</a></span></div>
          </div>

      </div>
    </>
  )
}
