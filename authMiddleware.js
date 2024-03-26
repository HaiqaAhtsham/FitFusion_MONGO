// Define a middleware function to check authentication
const checkAuthentication = (req, res, next) => {
    // Check if the user is authenticated (you can implement your authentication logic here)
    if (req.session.User) {
        // User is authenticated, proceed to the next middleware or route handler
        next();
    } else {
        // User is not authenticated, redirect to the sign-in page
        res.redirect('/signin');
    }
};

module.exports = { checkAuthentication };
