import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  let location = useLocation();
  let navigate = useNavigate();

  //set user name on nav bar
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  //logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Code Editor
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>

              {!localStorage.getItem("user") ? (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/features" ? "active" : ""
                    }`}
                    to="/features"
                  >
                    Features
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/savedcode" ? "active" : ""
                    }`}
                    to="/savedcode"
                  >
                    Saved File
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ms-auto mb-3 mb-lg-0">
              <li className="nav-item nav-link active">
                {loginUser && loginUser.name}
              </li>
              {!localStorage.getItem("user") ? (
                <div className="d-flex">
                  <Link
                    className="btn btn-primary mx-1"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <li
                  className="btn nav-item nav-link active"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
