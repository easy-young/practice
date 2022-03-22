const express = require('express')
const router = express.Router()
const userRouter = require('./user/index.js')
const boardRouter = require('./board/index.js')

router.use('/user',userRouter)
router.use('/board',boardRouter)
// use 써도 되나? post로 써야되나?

module.exports = router