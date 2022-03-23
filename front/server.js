const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const axios = require('axios')
const router = require('./routes/index.js')
const cookieParser = require('cookie-parser')

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true
})


app.use(cookieParser())
app.use(express.static('public'));
app.get('/',(req,res)=>{
    try {
        const userData = req.cookies.token
        const kakaoData = req.cookies.kakaoToken
        
        res.render('main.html', { userData, kakaoData })
    } catch (error) {
        res.render('main.html')
    }
 
    
})

app.use(router)

app.listen(3001,()=>{
    console.log('3001 front server Start!')
})