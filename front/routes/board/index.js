const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.get('/list',controller.list)
router.get('/view',controller.view)
router.get('/write',controller.write)
router.get('/modify',controller.modify)

module.exports = router