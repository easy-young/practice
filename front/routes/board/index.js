const express = require('express')
const router = express.Router()
const controller = require('./controller.js')
const multer = require('multer')
const path = require('path')

const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null, 'public/uploads/')
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname)
            const filename = path.basename(file.originalname,ext) + '_' + Date.now() + ext
            done(null,filename) // 1 error , 내가 실제로 저장할 파일명
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
}) // 객체변환


router.get('/list',controller.list)
router.get('/view/:idx',controller.view)
router.get('/write',controller.write)
router.get('/modify',controller.modify)

router.post('/upload',upload.single('upload'),(req,res)=>{
    console.log(req)
    // console.log(req.body)
    res.status(200).json({ reqName: 'write', status: true ,fileName:'' })
})

module.exports = router