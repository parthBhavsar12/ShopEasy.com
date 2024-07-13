import React, { useState } from "react";
import LeftLogo from "./LeftLogo";
import GoTo from "./GoTo";
import MessageBox from "./MessageBox";
import axios from "axios";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/forgot-password",
        { email },
        { withCredentials: true }
      );
      if (response.status == 200) {
        setMsg(
          "If an account with that email exists, a password reset link has been sent"
        );
      }
    } catch (error) {
      setError("Some error occured, Try again.");
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
              <label htmlFor="email">
                <i className="zmdi zmdi-email"></i>Email
              </label>
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={handleInputChange}
                placeholder="abc@xyz.pqr"
              />
            </div>

            <div className="btn">
              <button type="submit">
                <i className="zmdi zmdi-mail-send"></i>Send Email
              </button>
            </div>
          </form>
          <GoTo title="New to ShopEasy.com? " goto="Sign up" slug="../signup" />
          <GoTo title="Already have an account? " goto="Sign In" slug="../signin" />
        </div>
      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {msg && (
        <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />
      )}
    </>
  );
}
