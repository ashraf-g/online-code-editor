const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (name, email, id) => {
  try {
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "Thank You for Creating Account",
      html: `<p>Hi ${name},<br> Congratulations on successfully registering with us! As a member of Code Editor, you now have access to a wide range of features and functionalities designed to enhance your coding experience. <br><h1>Enjoy Coding</h1></p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email has been sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("An error occurred while sending the email");
  }
};

const sendOtp = async (name, email, otp) => {
  try {
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "OTP for Password Reset",
      html: `<p>Hello ${name},</p><p>Your OTP for password reset is: <strong>${otp}</strong></p> `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP Email has been sent:", info.response);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("An error occurred while sending the OTP email");
  }
};

module.exports = { sendOtp, sendEmail };
