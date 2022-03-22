const express = require('express')
const { upload } = require('../../utils/upload.js')
const router = express.Router()
const controller = require('./controller.js')


router.post('/list',controller.list)
router.get('/list',controller.list)
router.post('/view/:idx',controller.view)
router.post('/write',upload.fields([{name:'upload'}]),controller.write)
router.post('/modify',controller.modify)
router.post('/delete',controller.delete)
router.post('/good/:idx',controller.good)





module.exports = router