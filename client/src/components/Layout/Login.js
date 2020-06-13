import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmpty from "is-empty";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

function Login({ errors, auth, loginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [_errors, set_Errors] = useState({});
  let history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    setLoading(true);
    loginUser(user);
  }

  useEffect(() => {
    if (auth.isAuthed) {
      console.log(auth);
      setLoading(false);
      history.push("/movies");
    }
    set_Errors(errors);
    setLoading(false);
  }, [auth, errors]);

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

export default connect(mapStateToProps, { loginUser })(Login);
