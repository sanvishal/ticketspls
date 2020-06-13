import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link to="/" className="logo">
              <img src={logo} alt="Ticketspls" />
            </Link>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/register">
                <a className="button is-rounded">Register</a>
              </Link>
              <Link to="/login">
                <a className="button is-rounded">Login</a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
