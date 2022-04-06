const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.get('/login', controller.login);
router.get('/kakao/login', controller.kakaoLogin);
router.get('/oauth/kakao', controller.oauthKakao);
router.get('/join', controller.join);
router.get('/kakaoJoin', controller.kakaoJoin);
router.get('/agree', controller.agree);
router.get('/kakaoAgree', controller.kakaoAgree);
router.get('/profile', controller.profile);
router.get('/profileUpdate', controller.profileUpdate);
router.get('/welcome', controller.welcome);
router.get('/kakaoWelcome', controller.kakaoWelcome);

module.exports = router;