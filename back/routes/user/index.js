const express = require('express')
const router = express.Router()
const controller = require('./controller.js')
const { uploadsUser } = require('../../utils/upload.js')

router.post('/join',uploadsUser.single('userimage'),controller.join);
router.post('/kakaoJoin',uploadsUser.single('userimage'),controller.kakaoJoin);
router.post('/login',controller.login);
router.post('/profile',controller.profile);
router.post('/profileUpdate',uploadsUser.single('userimage'),controller.profileUpdate);
router.post('/logout',controller.logout);
router.post('/resign',controller.resign);
router.post('/welcome',controller.welcome);
router.post('/auth',controller.Auth);
router.post('/kakaoJoinAuth',controller.kakaoJoinAuth);
router.post('/tokenName',controller.tokenName);

module.exports = router