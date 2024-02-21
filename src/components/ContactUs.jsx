import React from 'react';
import LeftLogo from './LeftLogo';

export default function ContactUs() {
  return (
    <>
        <div className="main mainContactUs">

            <LeftLogo/>

            <div className="container">

                <div className="title"><strong>Contact Us</strong></div>

                <form action="/">
                    <div><label htmlFor="name"><i className="zmdi zmdi-account"></i>Name</label></div>
                    <div><input type="password" name="name" id="name" placeholder="Lorem Ipsum" /></div>

                    <div><label htmlFor="email"><i className="zmdi zmdi-email"></i>Email</label></div>
                    <div><input type="email" name="email" id="email" placeholder="abc@xyz.pqr" /></div>

                    <div><label htmlFor="msg"><i className="zmdi zmdi-comment-text"></i>Message</label></div>
                    <div><textarea name="msg" id="msg" placeholder="Type your message here" /></div>


                    <div className="btn"><button type="submit"><i class="zmdi zmdi-mail-send"></i>Send</button></div>

                </form>
            </div>

        </div>
    </>
  )
}
