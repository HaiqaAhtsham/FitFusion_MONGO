const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('./models/User');
const UserController = require('./controllers/UserController');
const authMiddleware = require('./authMiddleware');

//root page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'views', 'landingpage.html'));
});


// requests 
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});
router.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname,  'views', 'signin.html'));
});
// Apply the checkAuthentication middleware to the forgotpassword route
router.get('/forgotpassword.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'forgotpassword.html'));
});
// Apply the checkAuthentication middleware to the forgotpassword route
router.get('/forgotpassword', authMiddleware.checkAuthentication, (req, res) => { // Use authMiddleware.checkAuthentication
    // Render the forgotpassword page
    res.render('forgotpassword');
});

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});


router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
// router.post('/forgotpassword', UserController.forgotpassword);

// Apply authMiddleware to the forgotpassword route
router.post('/forgotpassword', authMiddleware.checkAuthentication, UserController.forgotpassword);



module.exports = router;
