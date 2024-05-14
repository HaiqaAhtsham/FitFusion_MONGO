const express = require('express');
const router = express.Router();
const path = require('path');
const UserController = require('./controllers/UserController');
const { verifyToken, checkAdminRole, checkUserRole } = require('./authMiddleware');

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


// Dashboard route with authentication middleware
router.get('/dashboard', verifyToken, checkUserRole, (req, res) => {
    if (req.user && req.user.role === 'user') {
        res.render('dashboard',{user: req.user}); // Assuming your EJS file is named dashboard.ejs
    }
    // res.render('views/dashboard', { user: req.user });
});


router.get('/admindashboard', verifyToken, checkAdminRole, (req, res) => {
    res.render('views/admindashboard', { user: req.user });
});

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/forgotpassword', UserController.forgotpassword);

// Apply authMiddleware to the forgotpassword route
// router.post('/forgotpassword', authMiddleware.checkAuthentication, UserController.forgotpassword);



module.exports = router;
