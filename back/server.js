const express = require('express')
const app = express()
const router = require('./routes/index.js')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const { Auth } = require('./middlewares/auth')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(Auth)

app.use(express.static('public'));

const corsOptions = {

    origin: [
      'http://localhost',
      'http://localhost:80',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3000/board/write',
    ],
    credentials: true,   
    methods:["GET","POST"], 
  };
  
app.use(cors(corsOptions))
app.use(express.json({limit: '5000mb'})); 
app.use(express.urlencoded({limit: '5000mb', extended: true}));
app.use(router)

app.listen(3000,()=>{
    console.log('3000 back server Start!')
})