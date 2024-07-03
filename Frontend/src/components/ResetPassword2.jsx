import React, { useState, useRef } from 'react';
import LeftLogo from './LeftLogo';
import GoTo from './GoTo';
import MessageBox from './MessageBox';

export default function ResetPassword2() {
  const [error, setError] = useState('');

  const [otp, setOtp] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: ''
  });

  const otpRefs = {
    otp1: useRef(null),
    otp2: useRef(null),
    otp3: useRef(null),
    otp4: useRef(null),
    otp5: useRef(null),
    otp6: useRef(null)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
      setOtp({
        ...otp,
        [name]: value
      });

      if (value !== '' && otpRefs[name]) {
        const nextField = Object.keys(otpRefs).find(key => key === name).replace(/[^\d]/g, '');
        if (nextField && otpRefs[`otp${parseInt(nextField) + 1}`]) {
          otpRefs[`otp${parseInt(nextField) + 1}`].current.focus();
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { otp1, otp2, otp3, otp4, otp5, otp6 } = otp;
    
    const all_otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

    console.log('Form submitted successfully', { "otp": all_otp });
  };

  return (
    <>
      <div className="main">
        <LeftLogo />
        <div className="container">
          <div className="title"><strong>Reset Password</strong></div>
          <form onSubmit={handleSubmit} method="post">
            <div className="divUser">
              <label className="userResetPassword">User: abc@xyz.pqr</label>
            </div>
            <div className="divUser">
              <label htmlFor="otp"><i className="zmdi zmdi-key"></i>OTP</label>
            </div>
            <div className="otp">
              {Object.keys(otp).map((key, index) => (
                <input
                  key={index}
                  type="text"
                  name={key}
                  id={key}
                  placeholder="0"
                  value={otp[key]}
                  onChange={handleInputChange}
                  maxLength="1"
                  ref={otpRefs[key]}
                  required
                />
              ))}
            </div>
            <div className="btn">
              <button type="submit"><i className="zmdi zmdi-fast-forward"></i>Proceed</button>
            </div>
          </form>
          <GoTo title="Go to " goto="Sign in" slug="../signin" />
        </div>
      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
    </>
  );
}
