import React, { useRef, useState, useEffect } from 'react';
import LeftLogo from './LeftLogo';
import GoTo from './GoTo';
import MessageBox from './MessageBox';
import axios from 'axios';

export default function Signup() {

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pwd = useRef();
  const conPwd = useRef();
  const checkBox = useRef();
  const span1 = useRef();
  const span2 = useRef();
  const rdo1 = useRef();
  const rdo2 = useRef();
  // const btnRegister = useRef();

  // useEffect(() => {
  //   // console.log("hsjhjs");
  // }, [btnRegister]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    conPassword: '',
    userType: ''
  });

  const handleOnChange = () => {
    pwd.current.type = checkBox.current.checked ? "text" : "password";
    conPwd.current.type = checkBox.current.checked ? "text" : "password";
  };

  const handleUserTypeChange = (e) => {
    setFormData({
      ...formData,
      userType: e.target.value
    });

    if (e.target.value === 'shopkeeper') {
      span1.current.style.border = '1px solid var(--dark-red)';
      span1.current.style.borderRadius = '5px';
      span1.current.style.backgroundColor = 'var(--red)';

      span2.current.style.backgroundColor = 'unset';
      span2.current.style.border = 'none';
    } else {
      span2.current.style.border = '1px solid var(--dark-red)';
      span2.current.style.borderRadius = '5px';
      span2.current.style.backgroundColor = 'var(--red)';

      span1.current.style.backgroundColor = 'unset';
      span1.current.style.border = 'none';
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password, conPassword, userType } = formData;

    if (password !== conPassword && password.length < 8) {
      setError('Passwords do not match, Password must be at least 8 characters long.');
      return;
    }

    if (password !== conPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // console.log('Form submitted successfully', formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/signup",
        { email, password, role: userType },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
        { withCredentials: true }
      );

      if (response.status == 200) {
        setMsg('Registered successfully.');
      }
    } catch (error) {
      console.log(error);

      if (error.message == "Request failed with status code 401")
        setError('Email id is already registered.');
      else
        setError('Some error occured, Try again.');

    }

  };

  return (
    <>
      <div className="main">
        <LeftLogo />
        <div className="container">
          <div className="title"><strong>Sign up</strong></div>
          <form onSubmit={handleSubmit} method='post'>
            <div>
              <label><i className="zmdi zmdi-account"></i>You are a</label>
              <span className="rdo" ref={span1}>
                <input
                  type="radio"
                  name="userType"
                  id="shopkeeper"
                  value="shopkeeper"
                  onChange={handleUserTypeChange}
                  ref={rdo1}
                />
                <label htmlFor="shopkeeper">Shopkeeper</label>
              </span>
              <span className="rdo" ref={span2}>
                <input
                  type="radio"
                  name="userType"
                  id="customer"
                  value="customer"
                  onChange={handleUserTypeChange}
                  ref={rdo2}
                  required
                />
                <label htmlFor="customer">Customer</label>
              </span>
            </div>

            <div>
              <label htmlFor="email"><i className="zmdi zmdi-email"></i>Email</label>
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="abc@xyz.pqr"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password"><i className="zmdi zmdi-lock-outline"></i>Password</label>
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Minimum 8 characters"
                ref={pwd}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="conPassword"><i className="zmdi zmdi-lock"></i>Confirm Password</label>
            </div>
            <div>
              <input
                type="password"
                name="conPassword"
                id="conPassword"
                placeholder="Minimum 8 characters"
                ref={conPwd}
                value={formData.conPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <input
                type="checkbox"
                name="show_password"
                id="show_password"
                onChange={handleOnChange}
                ref={checkBox}
              />
              <label htmlFor="show_password" id="label_show_password">Show Password</label>
            </div>

            <div className="btn">
              <button type="submit"> 
                {/* ref={btnRegister} */}
                <i className="zmdi zmdi-account-add"></i>Register
              </button>
            </div>
          </form>
          <GoTo title="Have an account? " goto="Sign in" slug="../signin" />
        </div>
      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {msg && <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />}
    </>
  );
}