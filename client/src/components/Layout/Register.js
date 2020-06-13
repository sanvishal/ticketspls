import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [password_again, setPassword_again] = useState("");
  const [name, setName] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      password_again,
    };
    console.log(newUser);
    setLoading(true);
  }

  return (
    <div className="form-container register-container">
      <div className="form-title">
        <h4>
          <b>Register for a new account</b>
        </h4>
        <p style={{ marginBottom: "20px" }}>
          or <Link to="/login">Login</Link> to your account{" "}
        </p>
      </div>

      <form onSubmit={(e) => onSubmit(e)} className="register-form container">
        <div className="field">
          <label className="label">Your name</label>
          <div className="control">
            <input
              className="form__input name input"
              type="text"
              placeholder="Tony Stark"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
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
              className="form__input password input"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password Again</label>
          <div className="control">
            <input
              className="form__input password2 input"
              type="password"
              placeholder="Enter your password, again"
              onChange={(e) => setPassword_again(e.target.value)}
            />
          </div>
        </div>
        <div className="field" style={{ marginTop: "22px" }}>
          <p className="control">
            <div className="buttons">
              <button
                className={
                  "button is-success form__submit is-rounded cta" +
                  (loading ? " is-loading" : "")
                }
              >
                Register
              </button>
            </div>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
