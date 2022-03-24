const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const axios = require('axios')
const router = require('./routes/index.js')
const cookieParser = require('cookie-parser')
// const axios = require('axios')
const multer = require('multer')
const path= require('path')
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


app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true
})


app.use(cookieParser())
app.use(express.static('public'));
app.get('/',(req,res)=>{
    try {
        const userData = JSON.parse(req.cookies.CURRENT_USER)
        console.log(req.cookies)
        res.render('main.html', { userData: userData })
    } catch (error) {
        res.render('main.html')
    }
 
    
})




app.post('/upload2',upload.fields([{name:'upload',maxCount:5}]),(req,res)=>{
    console.log(req.files)
    console.log(req.body)
    res.send('upload')
})




app.use(router)

app.listen(3001,()=>{
    console.log('3001 front server Start!')
})