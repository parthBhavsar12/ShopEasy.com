import React from 'react';
import LeftLogo from './LeftLogo';
import GoTo from './GoTo';

export default function Signup2() {
  return (
    <>
      <div className="main">

          <LeftLogo/>

          <div className="container">

              <div className="title"><strong>Sign up</strong></div>

              <form action="/">
                  <div className="divUser">
                      <label className='signUpUser'>Customer: abc@xyz.pqr</label>
                  </div>

                  <div><label htmlFor="name"><i className="zmdi zmdi-account"></i>Name</label></div>
                  <div><input type="text" name="name" id="name" placeholder="Lorem Ipsum" /></div>

                  <div><label htmlFor="contact"><i className="zmdi zmdi-phone"></i>Contact</label></div>
                  <div><input type="text" name="contact" id="contact" placeholder="+000000000000" /></div>

                  <div><label htmlFor="area"><i className="zmdi zmdi-pin"></i>Area</label></div>
                  <div><input type="text" name="area" id="area" placeholder="Local Area" /></div>
              
                  {/* <div><label htmlFor="dist"><i className="zmdi zmdi-email"></i>District</label></div> */}
                  <div><input type="text" name="dist" id="dist" placeholder="District" /></div>

                  {/* <div><label htmlFor="pin"><i className="zmdi zmdi-email"></i>Pin Code</label></div> */}
                  <div><input type="text" name="pin" id="pin" placeholder="Pin Code" /></div>

                  <div><input type="text" name="state" id="state" placeholder="State" /></div>

                  <div><input type="text" name="country" id="country" placeholder="Country" /></div>
              
                  <div className="btn"><button type="submit"><i className="zmdi zmdi-account-add"></i>Register</button></div>

              </form>
              <GoTo title="Have an account? " goto="Sign in" slug="../signin"/>
          </div>

      </div>
    </>
  )
}
