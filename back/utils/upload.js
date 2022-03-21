const multer = require('multer')
const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null, 'uploads/')
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname)
            const filename = path.basename(file.originalname,ext) + '_' + Date.now() + ext
            done(null,filename) // 1 error , 내가 실제로 저장할 파일명
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
}) // 객체변환



module.exports = {
    upload
}