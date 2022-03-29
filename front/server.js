const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
// const axios = require('axios')
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

    if(req.cookies.userData){
        res.render('main.html',{
            userData:req.cookies.userData
        })
    } else {
        res.render('main.html',{
            userData:req.cookies.userData
        })
    }
})

app.use(router)

app.listen(3001,()=>{
    console.log('3001 front server Start!')
})