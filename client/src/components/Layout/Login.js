import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    console.log(user);
    setLoading(true);
  }

  return (
    <div className="form-container login-container">
      <div className="form-title">
        <h4>
          <b>Login to book tickets</b>
        </h4>
        <p style={{ marginBottom: "20px" }}>
          <Link to="/register">Register</Link> for an account{" "}
        </p>
      </div>

      <form onSubmit={(e) => onSubmit(e)} className="login-form container">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="form__input email input"
              type="email"
              placeholder="stark.industries@tony.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="form__input email input"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="field" style={{ marginTop: "22px" }}>
          <p className="control">
            <div className="buttons">
              <button className="button">
                <Link to="/register">register</Link>
              </button>
              <button
                className={
                  "button is-success form__submit is-rounded cta" +
                  (loading ? " is-loading" : "")
                }
              >
                Login
              </button>
            </div>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
