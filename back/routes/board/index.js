const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.post('/list',controller.list)
router.post('/view',controller.view)
router.post('/write',controller.write)
router.post('/modify',controller.modify)
router.post('/delete',controller.delete)

module.exports = router