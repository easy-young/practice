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
    let userData;
    if(req.headers.cookie == undefined){
        userData = 0;
        res.render('main.html',{
            userData,
        })
    } else {
        userData = 1;
        res.render('main.html',{
            userData,
        })
    }
    
    // let userData 
    // if(req.cookies != undefined) {
    //     userData = 1
    //     res.render('main.html', {
    //         userData,
    //     })
    // } else {
    //     userData = 0
    //     res.render('main.html',{
    //         userData,
    //     })
    // }
})

app.use(router)

app.listen(3001,()=>{
    console.log('3001 front server Start!')
})