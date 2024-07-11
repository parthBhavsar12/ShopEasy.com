import React, { useState } from 'react';
import LeftLogo from './LeftLogo';
import GoTo from './GoTo';
import MessageBox from './MessageBox';
import axios from 'axios';

export default function ContactUs() {

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    console.log(formData);
    const { name, email, message } = formData;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/contact/contact-us",
        { name, email, message },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
        { withCredentials: true }
      );
      
      console.log(response);
      if (response.status == 200) {
        setMsg('Message sent successfully.');
      }
    } catch (error) {
      console.log(error);
      setError('Some error occurred.')
    }

  };


  return (
    <>
      {/* <div className="main mainContactUs"> */}
      <div className="main">

        <LeftLogo />

        <div className="container">

          <div className="title"><strong>Contact Us</strong></div>

          <form method="post" onSubmit={handleSubmit}>
            <div><label htmlFor="name"><i className="zmdi zmdi-account"></i>Name</label></div>
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Lorem Ipsum"
                required
                onChange={handleInputChange}
              />
            </div>

            <div><label htmlFor="email"><i className="zmdi zmdi-email"></i>Email</label></div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="abc@xyz.pqr"
                required
                onChange={handleInputChange}
              />
            </div>

            <div><label htmlFor="message"><i className="zmdi zmdi-comment-text"></i>Message</label></div>
            <div>
              <textarea
                name="message"
                id="message"
                placeholder="Type your message here"
                required
                onChange={handleInputChange}
              />
            </div>


            <div className="btn"><button type="submit"><i className="zmdi zmdi-mail-send"></i>Send</button></div>

          </form>
          <GoTo title="New to ShopEasy.com? " goto="Sign Up" slug="../signup" />
          <GoTo title="Have an account? " goto="Sign In" slug="../signin" />
        </div>

      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {msg && <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />}
    </>
  )
}
