const express = require('express')
const router = express.Router()
const userRouter = require('./user/index.js')
const boardRouter = require('./board/index.js')
const main = require('./main/index.js')
const adminRouter = require('./admin/index.js')

router.use('/',main)
router.use('/user', userRouter);
router.use('/board', boardRouter);
router.use('/api/admin', adminRouter);

module.exports = router;