const User = require('../models/User');

// Signup function
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.send('User already exists. Please login instead.');
    }
    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.redirect('/landingpage');
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Error signing up user. Please try again later.' });
  }
};
