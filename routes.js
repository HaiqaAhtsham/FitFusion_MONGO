const express = require('express');
const router = express.Router();
const path = require('path'); // Import path module for file paths
const User = require('./models/User');
const UserController = require('./controllers/UserController');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Route for rendering the signup form
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

router.get('/landingpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'landingpage.html'));
  });
  
  
// Route for handling signup form submissions
router.post('/signup', UserController.signup);


module.exports = router;
