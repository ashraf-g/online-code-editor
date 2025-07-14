import React, { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout/Layout";
import login from "./img/login.svg";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { api } from "../api";

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${api}/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
        toast.success("OTP sent successfully");
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(data.error || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending OTP:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      toast.error("Please enter OTP and new password.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        if (newPassword.length < 5) {
          setLoading(false);
          toast.error(
            "Password must be at least 5 characters long. Retry by getting new OTP"
          );
        } else {
          const resetResponse = await fetch(
            "http://localhost:5000/resetpassword",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, newPassword }),
            }
          );

          if (resetResponse.ok) {
            toast.success("Password reset successful!");
            setStep(1);
            setEmail("");
            setNewPassword("");
            setOtp("");
            setRedirect(true);
          } else {
            setLoading(false);
            toast.error("Failed to reset password. Please try again.");
          }
        }
      } else {
        setLoading(false);
        toast.error(data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error resetting password:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="login">
        <div className="login__content">
          <div className="login__img">
            <img src={login} alt="" />
          </div>
          <div className="login__forms">
            {step === 1 && (
              <form
                onSubmit={handleSubmitEmail}
                className="login__forget"
                id="login-in"
              >
                <h1 className="login__title">Reset Password</h1>
                {loading && <Spinner />}
                <div className="login__box">
                  <i className="bx bx-user login__icon" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    className="login__input"
                    required
                  />
                </div>
                <button type="submit" className="login__button">
                  Send OTP
                </button>
              </form>
            )}
            {step === 2 && (
              <form
                onSubmit={handleSubmitOTP}
                className="login__forget"
                id="login-in"
              >
                <h1 className="login__title">Reset Password</h1>
                {loading && <Spinner />}
                <div className="login__box">
                  <i className="bx bx-user login__icon" />
                  <input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    name="otp"
                    className="login__input"
                    required
                  />
                </div>
                <div className="login__box">
                  <i className="bx bx-lock-alt login__icon" />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    name="newPassword"
                    className="login__input"
                    minLength="5"
                    required
                  />
                </div>
                <button type="submit" className="login__button">
                  Reset Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPass;
