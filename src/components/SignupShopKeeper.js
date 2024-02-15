import React from 'react';
import LeftLogo from './LeftLogo';
import GoTo from './GoTo';

export default function Signup2() {
  return (
    <>
      <div class="main">

          <LeftLogo/>

          <div class="container">

              <div class="title"><strong>Sign up</strong></div>

              <form action="/">
                  <div className="divUser">
                      <label className='signUpUser'>Shopkeeper: abc@xyz.pqr</label>
                  </div>

                  <div><label for="shop_name"><i class="zmdi zmdi-shopping-cart"></i>Shop Name</label></div>
                  <div><input type="text" name="shop_name" id="shop_name" placeholder="ABC Stores" /></div>

                  <div><label for="contact"><i class="zmdi zmdi-phone"></i>Contact</label></div>
                  <div><input type="text" name="contact" id="contact" placeholder="+000000000000" /></div>

                  <div><label for="address1"><i class="zmdi zmdi-pin"></i>Address</label></div>
                  <div><input type="text" name="address1" id="address1" placeholder="1, XYZ Complex" /></div>

                  {/* <div><label for="area"><i class="zmdi zmdi-email"></i>Area</label></div> */}
                  <div><input type="text" name="area" id="area" placeholder="Local Area" /></div>
              
                  {/* <div><label for="dist"><i class="zmdi zmdi-email"></i>District</label></div> */}
                  <div><input type="text" name="dist" id="dist" placeholder="District" /></div>

                  {/* <div><label for="pin"><i class="zmdi zmdi-email"></i>Pin Code</label></div> */}
                  <div><input type="text" name="pin" id="pin" placeholder="Pin Code" /></div>

                  <div><input type="text" name="state" id="state" placeholder="State" /></div>
                  
                  <div><input type="text" name="country" id="country" placeholder="Country" /></div>
              
                  <div class="btn"><button type="submit"><i class="zmdi zmdi-account-add"></i>Register</button></div>

              </form>
                
              <GoTo title="Have an account? " goto="Sign in" />
          </div>

      </div>
    </>
  )
}
