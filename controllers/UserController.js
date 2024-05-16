const User = require("../models/User");
const sendMail = require("../js/sendmail");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exists. Please login instead.");
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    // await sendMail(email);

    res.redirect("/views/test.html"); // Redirect to test.html upon successful signup
  } catch (error) {
    console.error("Error signing up user:", error);
    res.send("Error signing up user. Please try again later.");
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email, password });
    if (!existingUser) {
      return res.send("Incorrect credentials. Please try again.");
    }
    req.session.User = existingUser;
    res.redirect("/views/test.html"); // Redirect to test.html upon successful signin
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
      return res.send("New password and confirm password do not match.");
    }
    existingUser.password = newPassword;
    await existingUser.save();
    res.send("Password reset successfully");
  } catch (err) {
    console.error("Error resetting password:", err);
    res.send("Error resetting password.");
  }
};
