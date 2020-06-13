import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "is-empty";
import { registerUser } from "../../actions/authActions";

function Register({ errors, registerUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [password_again, setPassword_again] = useState("");
  const [name, setName] = useState("");
  const [_errors, set_Errors] = useState({});

  let history = useHistory();
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
    registerUser(newUser, history);
  }

  useEffect(() => {
    set_Errors(errors);
    setLoading(false);
  }, [errors]);

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
      {!isEmpty(_errors) && (
        <div className="errors">
          <div
            className="notification is-light is-danger"
            style={{ marginTop: "10px", fontSize: "12px" }}
          >
            {typeof _errors.message === "object" ? (
              <ul style={{ listStyleType: "disc" }}>
                {Object.keys(_errors.message).map((err) => {
                  return <li>{_errors.message[err]}</li>;
                })}
              </ul>
            ) : (
              _errors.message
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
