const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
    res.render('board/list.html');
});

router.get('/view/:idx', (req, res) => {
    res.render('board/view.html');
});

router.get('/write', (req, res) => {
    res.render('board/write.html');
});

router.get('/modify/:idx', (req, res) => {
    res.render('board/modify.html');
});

router.get('/chat',(req,res)=>{
    res.render('board/chat.html')
})

module.exports = router;