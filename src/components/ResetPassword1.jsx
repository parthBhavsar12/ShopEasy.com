import React, { useState } from 'react';
import LeftLogo from './LeftLogo';
import GoTo from './GoTo';
import MessageBox from './MessageBox';

export default function ResetPassword1() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    console.log('Form submitted successfully', {"email": email});
  };
  return (
    <>
      <div className="main">

        <LeftLogo />

        <div className="container">

          <div className="title"><strong>Reset Password</strong></div>

          <form onSubmit={handleSubmit} method='post'>

            <div>
              <label htmlFor="email"><i className="zmdi zmdi-email"></i>Email</label>
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={handleInputChange}
                placeholder="abc@xyz.pqr" />
            </div>

            <div className="btn"><button type="submit"><i className="zmdi zmdi-mail-send"></i>Send OTP</button></div>

          </form>
          <GoTo title="New to ShopEasy.com? " goto="Sign up" slug="../signup" />
        </div>

      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
    </>
  )
}
