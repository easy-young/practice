const express = require('express');
const router = express.Router();

const isAdmin = (req, res, next) => {
    try {
        if (req.headers.cookie.includes('connect.sid')) next();
        else throw new Error();
    } catch (e) {
        res.render('admin.html');
    }
};

router.get('/', (req, res) => {
    res.render('admin.html');
});

router.use(isAdmin);

router.get('/user', (req, res) => {
    res.render('admin/user.html');
});

router.get('/category', (req, res) => {
    res.render('admin/category.html');
});

router.get('/board', (req, res) => {
    res.render('admin/board.html');
});

router.get('/board/view/:idx', (req, res) => {
    res.render('admin/board/view.html');
});

router.get('/stats', (req, res) => {
    res.render('admin/stats.html');
});

router.get('/stats/view/:idx', (req, res) => {
    res.render('admin/stats/view.html');
});

router.post('/logout', (req, res) => {
    res.clearCookie('connect.sid');
    res.send();
});

module.exports = router;