const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.get('/login',controller.login)
router.get('/kakao/login',controller.kakaoLogin)
router.get('/oauth/kakao',controller.oauthKakao)
router.get('/join',controller.join)
router.get('/profile',controller.profile)
router.get('/profileUpdate',controller.profileUpdate)

module.exports = router