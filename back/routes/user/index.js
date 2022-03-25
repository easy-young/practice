const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.post('/join',controller.join);
router.post('/welcome',controller.welcome);
router.post('/login',controller.login);
router.post('/logout',controller.logout);
router.post('/kakaoLogout',controller.kakaoLogout);  
 // 카카오 쿠키 로그아웃
router.post('/profile',controller.profile);
router.post('/profileUpdate',controller.profileUpdate);
router.post('/resign',controller.resign);


module.exports = router