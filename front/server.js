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
<<<<<<< HEAD
    res.render('main.html')
=======

    if(req.cookies.userData){
        res.render('main.html',{
            userData:req.cookies.userData
        })
    } else {
        res.render('main.html',{
            userData:req.cookies.userData
        })
    }
>>>>>>> 6fbeecf0ce9e09645b538a47b38c6dbd8987a480
})

app.use(router)

app.listen(3001,()=>{
    console.log('3001 front server Start!')
})