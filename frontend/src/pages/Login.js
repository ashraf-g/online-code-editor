import React, { useState } from "react";
import "./Style.css";
import login from "./img/login.svg";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Layout from "../components/Layout/Layout";
import { api } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const login = await response.json();
      // console.log(login);
      if (response.ok) {
        // localStorage.setItem("token", login.authtoken);
        localStorage.setItem("user", JSON.stringify(login.userData));
        toast.success("Login Successful");
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setLoading(false);
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="login">
        <div className="login__content">
          <div className="login__img">
            <img src={login} alt="" />
          </div>
          <div className="login__forms">
            <form
              onSubmit={handleSubmit}
              className="login__registre"
              id="login-in"
            >
              <h1 className="login__title">LogIn</h1>
              {loading && <Spinner />}
              {success && <p className="success"></p>}{" "}
              {/* Show success alert */}
              <div className="login__box">
                <i className="bx bx-user login__icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={onChange}
                  name="email"
                  className="login__input"
                />
              </div>
              <div className="login__box">
                <i className="bx bx-lock-alt login__icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={onChange}
                  name="password"
                  className="login__input"
                />
              </div>
              <a href="/reset" className="login__forgot">
                Forgot password?
              </a>
              <button type="submit" className="login__button">
                LogIn
              </button>
              <div>
                <span className="login__account">Don't have an Account ?</span>
                <Link className="login__signin" to="/register" id="sign-up">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
