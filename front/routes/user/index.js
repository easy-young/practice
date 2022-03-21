const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.get('/login',controller.login)
router.get('/join',controller.join)

module.exports = router