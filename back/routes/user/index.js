const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.post('/join',controller.join)
router.post('/login',controller.login)


module.exports = router