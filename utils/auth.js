// AUTHGUARD ROUTE
const withAuth = (req, res, next) => {
    // if user_id does not exists (session property false) redirect to login page
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        // else run next function in call
        next();
    }
};

module.exports = withAuth;