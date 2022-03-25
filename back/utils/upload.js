const multer = require('multer')
const path = require('path')
const { pool } = require("../db")
const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null, 'public/uploades/')
         
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname)
            const filename = path.basename(file.originalname,ext) + '_' + Date.now() + ext
            done(null,filename) // 1 error , 내가 실제로 저장할 파일명
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 * 1024 } // 5MB
})


module.exports = {
    upload
}