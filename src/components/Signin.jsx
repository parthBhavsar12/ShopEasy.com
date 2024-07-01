import React, { useRef, useState } from 'react';
import LeftLogo from './LeftLogo';
import GoTo from './GoTo';
import MessageBox from './MessageBox';

export default function Signin() {
  const pwd = useRef();
  const checkBox = useRef();
  const handleOnChange = () => {
    pwd.current.type = checkBox.current.checked ? "text" : "password";
  }

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { password } = formData;

    console.log('Form submitted successfully', formData);
  };

return (
  <>
    <div className="main">

      <LeftLogo />

      <div className="container">

        <div className="title"><strong>Sign in</strong></div>

        <form onSubmit={handleSubmit} method='post'>
          <div>
            <label htmlFor="email"><i className="zmdi zmdi-email"></i>Email</label>
          </div>

          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="abc@xyz.pqr" />
          </div>

          <div>
            <label htmlFor="password"><i className="zmdi zmdi-lock"></i>Password</label>
          </div>

          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Minimum 8 characters"
              required
              ref={pwd} />
          </div>

          <div>
            <input type="checkbox" name="show_password" id="show_password" onChange={handleOnChange} ref={checkBox} />
            <label htmlFor="show_password" id="label_show_password">Show Password</label>
          </div>

          <div className="btn"><button type="submit"><i className="zmdi zmdi-sign-in"></i>Sign in</button></div>

        </form>


        <GoTo title="New to ShopEasy.com? " goto="Sign up" slug="../signup" />

        <GoTo title="" goto="Forgot Password?" slug="../resetpassword" />
      </div>

    </div> 
    {error && <MessageBox msgTitle="Error" msgText={error} />}
  </>
)
}
