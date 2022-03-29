const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.post('/join',controller.join);
router.post('/kakaoJoin',controller.kakaoJoin);
router.post('/kakaoJoinAuth',controller.kakaoJoinAuth);
router.post('/welcome',controller.welcome);
router.post('/kakaoWelcome',controller.kakaoWelcome);
router.post('/login',controller.login);
router.post('/logout',controller.logout);
router.post('/profile',controller.profile);
router.post('/profileUpdate',controller.profileUpdate);
router.post('/resign',controller.resign);
router.post('/auth',controller.Auth);


module.exports = router