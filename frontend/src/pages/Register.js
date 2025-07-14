import React, { useState } from "react";
import "./Style.css";
import login from "./img/login.svg";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { api } from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { name, email, password, cpassword } = credentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("password not match");
    } else {
      setLoading(true);
      const response = await fetch(`${api}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword,
        }),
      });
      const register = await response.json();
      // console.log(register);
      if (response.ok) {
        // localStorage.setItem("token", json.authtoken);
        localStorage.setItem("user", JSON.stringify(register.userData));
        toast.success("Account Created Successfully");
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setLoading(false);
        toast.error("Email already Exist");
      }
    }
  };

  // const onChange = (e) => {
  //   setCredentials({ ...credentials, [e.target.name]: e.target.value });
  // };
  const onChange = (e) => {
    const { name, value } = e.target;

    // Validate only string characters for the name field
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      // If input contains non-string characters, don't update the state
      return;
    }
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="login">
        <div className="login__content">
          <div className="login__img">
            <img src={login} alt="" />
          </div>
          <div className="login__forms">
            <form
              onSubmit={handleSubmit}
              className="login__create none"
              id="login-up"
            >
              <h1 className="login__title">Create Account</h1>
              {loading && <Spinner />}
              {success && <p className="success"></p>}{" "}
              <div className="login__box">
                <i className="bx bx-user login__icon" />
                <input
                  type="text"
                  placeholder="Name"
                  className="login__input"
                  onChange={onChange}
                  value={credentials.name}
                  name="name"
                />
              </div>
              <div className="login__box">
                <i className="bx bx-at login__icon" />
                <input
                  type="email"
                  placeholder="Email"
                  className="login__input"
                  onChange={onChange}
                  value={credentials.email}
                  name="email"
                  required
                />
              </div>
              <div className="login__box">
                <i className="bx bx-lock-alt login__icon" />
                <input
                  type="password"
                  placeholder="Password"
                  className="login__input"
                  onChange={onChange}
                  value={credentials.password}
                  name="password"
                  minLength={5}
                  required
                />
              </div>
              <div className="login__box">
                <i className="bx bx-lock-alt login__icon" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="login__input"
                  onChange={onChange}
                  value={credentials.cpassword}
                  name="cpassword"
                  minLength={5}
                  required
                />
              </div>
              <button type="submit" className="login__button">
                Sign Up
              </button>{" "}
              <div>
                <span className="login__account">
                  Already have an Account ?
                </span>
                <Link className="login__signup" to="/login" id="sign-in">
                  LogIn
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
