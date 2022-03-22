const express = require('express')
const router = express.Router()
const boardRouter = require('./board/index.js')
const userRouter = require('./user/index.js')

router.use('/board',boardRouter)
router.use('/user',userRouter)

module.exports = router