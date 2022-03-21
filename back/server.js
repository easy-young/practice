const express = require('express')
const app = express()
const axios = require('axios')
const router = require('./routes/index.js')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const pool = require('./db.js').pool
const {Auth} = require('./middlewares/auth.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
// app.use(Auth)
app.use(cors({
    origin:true,
    credentials:true,
}))



app.post('/',(req,res)=>{
    res.redirect('/')
})

app.post('/auth',(req,res)=>{
    res.redirect('/')
})

app.use(router)


app.listen(3000,()=>{
    console.log('3000 back server Start!')
})