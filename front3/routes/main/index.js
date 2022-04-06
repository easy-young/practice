const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    
     if(req.cookies.userData){
            res.render('main.html',{
                userData:{...req.cookies.userData,isLogin:true}
            })
        } else {
            res.render('main.html',{
                userData:{isLogin:false}
            })
        }
     
    })
module.exports = router