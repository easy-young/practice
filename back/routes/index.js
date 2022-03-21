const express = require('express')
const router = express.Router()
const userRouter = require('./user/index.js')
const boardRouter = require('./board/index.js')
const adminRouter = require('./admin/index.js')

router.use('/user', userRouter);
router.use('/board', boardRouter);
router.use('/api/admin', adminRouter);
// use 써도 되나? post로 써야되나?

module.exports = router;