const express = require('express')
const { upload } = require('../../utils/upload.js')
const router = express.Router()
const controller = require('./controller.js')


router.post('/list',controller.list)
router.post('/view/:idx',controller.view)
router.post('/write',upload.fields([{name:'upload'}]),controller.write)
router.post('/modify',upload.fields([{name:'upload'}]),controller.modify)
router.post('/get-post/:idx',controller.getPost)


router.post('/delete/:idx',controller.delete)
router.post('/good/:idx',controller.good)


router.post('/comment/:idx',controller.comment)//삭제 예정 이 기능을 view에서 생성.

router.post('/comment-write/:idx',controller.commentWrite)


router.post('/comment-delete/:uuid',controller.commentDelete)
router.post('/comment-update/:uuid',controller.commentUpdate)
module.exports = router