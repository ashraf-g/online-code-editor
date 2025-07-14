const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { sendEmail, sendOtp } = require("./mailController");
const dotenv = require("dotenv");
const otpGenerator = require("otp-generator");

dotenv.config();

//User Registration Route             <|====== ROUTE 1 ======|>
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate request body
    await Promise.all([
      body("name", "Enter a valid name").isLength({ min: 3 }),
      body("email", "Enter a valid email").isEmail().run(req),
      body("password", "Password must be at least 5 characters").isLength({
        min: 5,
      }),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry, a user with this email already exists" });
    }

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const data = {
      user: {
        id: newUser.id,
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    // const userData = { newUser };
    // console.log(newUser);
    // console.log(userData);
    // Sending Email after registering user
    const user1 = {
      name: req.body.name,
      email: req.body.email,
      id: newUser._id,
    };
    await sendEmail(user1.name, user1.email, user1.id);

    // Send response after sending the email
    res.status(201).json({
      success: true,
      // authtoken,
      userData: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        authtoken,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Internal server error" });
    success: false;
    console.error("Error registering User:", error);
  }
};

//User Login                          <|====== ROUTE 2 ======|>
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body; //destructring

    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not found");
    }

    // Compare the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Verify JWT token
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);

    // Password is correct, send user details
    res.status(200).json({
      success: true,
      // authtoken,
      userData: {
        id: user.id,
        name: user.name,
        email: user.email,
        authtoken,
      },
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    // res.json("hello");
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Internal server error" });
    success: false;
    console.error("Error occure while login:", error);
  }
};

//get User Detail                     <|====== ROUTE 3 ======|>
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//Reset password                      <|====== ROUTE 4 ======|>
const resetPassword = async (req, res) => {
  try {
    // const userId = req.params.id;
    const { email, newPassword } = req.body;

    // Find the user by userId
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found." });
    }

    // Check if the new password meets the minimum length requirement
    if (newPassword.length < 5) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 5 characters long.",
      });
    }

    // Generate a salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Password reset successful
    return res
      .status(200)
      .json({ success: true, message: "Password reset successful." });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred. Please try again later.",
    });
  }
};

//Generate OTP                        <|====== ROUTE 5 ======|>
const otpGenerate = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email and select the name field
    const user = await User.findOne({ email }).select("name");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const name = user.name;

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });

    // Update user's record with the OTP and save it
    user.otp = otp;
    await user.save();

    // Send OTP to the user's email
    const result = await sendOtp(name, email, otp);
    // console.log(result);
    // Check if the OTP sending was successful
    res.status(201).json({
      success: true,
      message: "OTP send successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "An error occurred while sending OTP" });
  }
};

//verify OTP                          <|====== ROUTE 6 ======|>
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if OTP matches
    if (!user.otp || user.otp.trim() !== otp.trim()) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Clear the OTP from the user's record
    user.otp = null; // Assuming you have a field to store the OTP in your User model
    await user.save();

    // Respond with success message
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while verifying OTP" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getUser,
  resetPassword,
  otpGenerate,
  verifyOTP,
};
