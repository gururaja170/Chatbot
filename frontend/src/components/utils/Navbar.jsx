import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top mb-2">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/logo-dark-groww.83f43714.svg"
            alt=""
            width="50%"
            className="d-inline-block align-text-top"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/stocks">
                Stocks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/mutual-funds">
                Mutual-Funds
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/gold">
                Gold
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/fixed-deposits">
                Fixed-Deposits
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {user && user.isAdmin ? (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">
                    Faq-Dashboard
                  </NavLink>
                </li>
              </React.Fragment>
            ) : null}
            {user ? (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    {user.name.split(" ")[0]}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
