exports.isAdmin = (req, res, next) => {
    if (req.headers.cookie.includes('connect.sid') === true) next();
    else res.render('admin.html');
};