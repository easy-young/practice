const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.get('/login',controller.login)
router.get('/kakao/login',controller.kakaoLogin)
router.get('/join',controller.join)
router.get('/profile',controller.profile)

module.exports = router