const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const axios = require('axios')
const router = require('./routes/index.js')
const cookieParser = require('cookie-parser')
// const axios = require('axios')

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
})


app.use(cookieParser())

app.get('/',(req,res)=>{
    res.render('main.html')
})

app.use(router)

app.listen(3001,()=>{
    console.log('3001 front server Start!')
})