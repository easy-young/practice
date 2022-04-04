/**
 * main router
 */
const express = require('express')
const { db, pool } = require('../../db')
const router = express.Router()


router.get('/',(req,res)=>{
    res.status(200).json({ reqName: 'main get', status: false })
})
router.post('/',(req,res)=>{
    try {
        db.promisePool.query('SELECT * FROM board').then((data)=>{
            console.log(data2)
            res.status(200).json({ reqName: 'main get', status: true, data:data[0] })
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({ reqName: 'main get', status: false })
    }
  
})

router.post('/logincheck',async (req,res)=>{

    let cookie
    let cookiePayload
    let user
    let userid
    let nickname
    let email
    let sql
    let prepare
    let result
    let response
    
    try {
        cookie = req.headers.cookie.split('=')[0]
        cookiePayload = req.headers.cookie.split('=')[1].split('.')[1]
        user = JSON.parse(Buffer.from(cookiePayload,'base64').toString('utf-8'))
        
        if(cookie == 'token'){
            userid = user.userid
            nickname = user.nickname
            sql = `SELECT * FROM user WHERE userid=? and nickname=?`
            prepare = [userid, nickname]
            result = await pool.execute(sql,prepare)

            response = {
                errno:0
            }
            res.json(response)
        } else if(cookie == 'kakaoToken'){
            nickname = user.nickname
            email = user.email
            sql = `SELECT * FROM user WHERE nickname=? and email=?`
            prepare = [nickname, email]
            result = await pool.execute(sql,prepare)

            response = {
                errno:0
            }
            res.json(response)
        }
        
    } catch(e){
        console.log(e);
        response = {
            errno:1
        }
        res.json(response)
    }
    
})

module.exports = router