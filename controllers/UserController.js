const User = require("../models/User");
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEF';
const { transporter, mailOptions, sendMail } = require("../js/sendmail");


exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exists. Please login instead.");
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Check if the user was successfully saved in the database
    const savedUser = await User.findOne({ email });
    if (savedUser) {
      // sendMail(email, username);  // sends verification email to user's email
      return res.redirect("/dashboard");
    } else {
      return res.send("Error signing up user. Please try again later.");
    }
  } catch (error) {
    console.error("Error signing up user:", error);
    res.send("Error signing up user. Please try again later.");
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.send("Incorrect credentials. Please try again.");
    }
    if (password !== existingUser.password) {
      return res.send("Incorrect password. Please try again.");
    }
    const token = jwt.sign({ userId: existingUser._id, role: existingUser.role }, SECRET_KEY);
    res.cookie('token', token);
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error signing in user:", error);
    res.send("Error signing in user. Please try again later.");
  }
};

exports.forgotpassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      return res.send("User not found. Please check your email and try again.");
    }
    if (newPassword !== confirmPassword) {
        return res.send('New password and confirm password do not match.');
    }
    existingUser.password = newPassword;
    await existingUser.save();
    res.send("Password reset successfully");
  } 
  catch (err) {
    console.error("Error resetting password:", err);
    res.send("Error resetting password.");
  }
}
