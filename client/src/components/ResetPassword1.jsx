import React, { useState, useRef } from "react";
import LeftLogo from "./LeftLogo";
import GoTo from "./GoTo";
import MessageBox from "./MessageBox";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
export default function ResetPassword() {
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [token,setToken] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    conPassword: "",
  });

  const handleOnChange = () => {
    pwd.current.type = checkBox.current.checked ? "text" : "password";
    conPwd.current.type = checkBox.current.checked ? "text" : "password";
  };

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const pwd = useRef();
  const conPwd = useRef();
  const checkBox = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = searchParams.get("token") ?? "";
    const { password, conPassword } = formData;
    console.log(token);
    if (password !== conPassword && password.length < 8) {
      setError(
        "Passwords do not match, Password must be at least 8 characters long."
      );
      return;
    }

    if (password !== conPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/reset-password",
        { token, new_password: password },
        { withCredentials: true }
      );

      if (response.status == 200) {
        setMsg("Password updated successfully.");
        // console.log(200);
      }
    } catch (error) {
      if (error.message == "Request failed with status code 401")
        setError("Invalid or expired token.");
      else setError("Some error occured, Try again.");
    }
  };
  return (
    <>
      <div className="main">
        <LeftLogo />

        <div className="container">
          <div className="title">
            <strong>Reset Password</strong>
          </div>

          <form onSubmit={handleSubmit} method="post">
            <div>
              <label htmlFor="password">
                <i className="zmdi zmdi-lock-outline"></i>Password
              </label>
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
              <label htmlFor="conPassword">
                <i className="zmdi zmdi-lock"></i>Confirm Password
              </label>
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
                <i className="zmdi zmdi-mail-send"></i>Update Password
              </button>
            </div>
          </form>
          <GoTo title="New to ShopEasy.com? " goto="Sign up" slug="../signup" />
          <GoTo title="Go to " goto="Sign In" slug="../signin" />
        </div>
      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {msg && (
        <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />
      )}
    </>
  );
}
