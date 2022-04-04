const express = require('express')
const router = express.Router()
const controller = require('./controller.js')
const { uploadsUser } = require('../../utils/upload.js')

router.post('/join',uploadsUser.single('userimage'),controller.join);
router.post('/kakaoJoin',uploadsUser.single('userimage'),controller.kakaoJoin);
router.post('/kakaoJoinAuth',controller.kakaoJoinAuth);
router.post('/welcome',controller.welcome);
router.post('/kakaoWelcome',controller.kakaoWelcome);
router.post('/login',controller.login);
router.post('/logout',controller.logout);
router.post('/profile',controller.profile);
router.post('/profileUpdate',uploadsUser.single('userimage'),controller.profileUpdate);
router.post('/resign',controller.resign);
router.post('/auth',controller.Auth);


module.exports = router