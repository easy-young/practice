exports.admin = (req, res) => {
    const cookie = JSON.stringify(req.cookies);
    if (cookie.includes('connect.sid') === true) {
        let isLogin = cookie;
        res.render('admin.html', {isLogin});
    } else {
        res.render('admin.html');
    }
};

exports.user = (req, res) => {
    try {
        if (req.headers.cookie === undefined) throw new Error;
        if (req.headers.cookie.includes('connect.sid') === false) throw new Error;
        res.render('admin/user.html');
    } catch (e) {
        console.log(e.message);
        res.render('admin.html');
    }
};

exports.category = (req, res) => {
    try {
        if (req.headers.cookie === undefined) throw new Error;
        if (req.headers.cookie.includes('connect.sid') === false) throw new Error;
        res.render('admin/category.html');
    } catch (e) {
        console.log(e.message);
        res.render('admin.html');
    }
};

exports.board = (req, res) => {
    try {
        if (req.headers.cookie === undefined) throw new Error;
        if (req.headers.cookie.includes('connect.sid') === false) throw new Error;
        res.render('admin/board.html');
    } catch (e) {
        console.log(e.message);
        res.render('admin.html');
    }
};

exports.view = (req, res) => {
    try {
        if (req.headers.cookie === undefined) throw new Error;
        if (req.headers.cookie.includes('connect.sid') === false) throw new Error;
        res.render('admin/board/view.html');
    } catch (e) {
        console.log(e.message);
        res.render('admin.html');
    }
};

exports.stats = (req, res)=>{
    try {
        if (req.headers.cookie === undefined) throw new Error;
        if (req.headers.cookie.includes('connect.sid') === false) throw new Error;
        res.render('admin/stats.html');
    } catch (e) {
        console.log(e.message);
        res.render('admin.html');
    }
};

exports.logout = (req, res) => {
    res.clearCookie('connect.sid');
    res.send();
};