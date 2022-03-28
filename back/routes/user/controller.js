const pool = require('../../db.js').pool
const session = require('express-session')
const {createToken} = require('../../utils/jwt.js')

exports.join = async (req,res)=>{
    const { userid, userpw, userimage, name,
            nickname, address, gender, intro } = req.body

    let {email, birth, phone, tel} = req.body
    email = email[0]+'@'+email[1]
    birth = birth[0]+birth[1]+birth[2]
    phone = phone[0]+phone[1]+phone[2]
    tel = tel[0]+tel[1]+tel[2]

    const sql = `INSERT INTO user (
        userid, userpw, userimage, name,
        nickname, birth, address, gender, tel,
        phone, email, intro
    ) VALUES (
        ?,?,?,?,?,
        ?,?,?,?,?,
        ?,?
    )`

    const prepare = [ userid, userpw, userimage, name, nickname,
                     birth, address, gender, tel, phone, email,
                     intro ];

    const [ result ] = await pool.execute(sql,prepare);

    const tokenResult = {userid, nickname}
    const jwt = createToken({...tokenResult})
    res.cookie('token',jwt,{
        path:'/',
        httpOnly:true,
        secure:true,
        domain:'localhost',
        maxAge: 1000
    })

    try {

        const response = {
            result:{
                userid,
                nickname,
                row:result.affectedRows,
                id:result.insertId
            },
            errno:0,
        }
        

        res.json(response)
        // res.send(JSON.stringify(response))

    } catch (e) {
        console.log(e)
        const response = {
            result:{
                row:0,
                id:0
            },
            errno:1,
        }
        res.json(response)
    }
}

exports.login = async (req,res)=>{
    const {userid, userpw} = req.body
    const sql = `
                SELECT userid, name, level, point, nickname 
                FROM user 
                WHERE userid=? and userpw=?
                `
    const prepare = [userid, userpw]

    try {
        const [result] = await pool.execute(sql,prepare)
        const {userid, nickname} = result[0]
       
        const tokenResult = {userid, nickname}

        if(result.length == 0) throw Error('등록된회원이 아닙니다.')
     
        const jwt = createToken({...tokenResult})
          res.cookie('token',jwt,{
            path:'/',
            httpOnly:true,
            secure:true,
            domain:'localhost'
        })
        res.cookie('userData',{userid:userid, nickname:nickname},{
            path:'/',
            httpOnly:true,
            secure:true,
            domain:'localhost'
        })
    
       
        const response = {
            result,
            errno:0
        }
        
        res.json(response)
        // res.send(JSON.stringify(response))
    } catch (e) {
        console.log(e.message)
        const response = {
            result:[],
            errno:1,
        }
        res.json(response)
    }
}

exports.profile = async (req,res) => {
    const {userid} = req.user
    const sql = `SELECT * FROM user WHERE userid=?`
    const prepare = [userid]
    
    let [[result]] = await pool.execute(sql,prepare)
    
    let birth = JSON.stringify(result.birth)
    let date = JSON.stringify(result.date)
    
    const sql1 = `SELECT DATE_ADD(${birth}, INTERVAL 9 HOUR)`
    const sql2 = `SELECT DATE_ADD(${date}, INTERVAL 9 HOUR)`
    let [[result1]] = await pool.execute(sql1)
    let [[result2]] = await pool.execute(sql2)

    let a = JSON.stringify(result1).split(`"`)[5].split(' ')[0]
    let b = JSON.stringify(result2).split('"')[5]
    result.birth = a
    result.date = b
    
    res.json(result)
}

exports.profileUpdate = async (req,res)=>{
    const {userid} = req.user
    const {userpw,userimage,name,nickname,address,gender,intro} = req.body
    let {phone, birth, tel, email} = req.body
    phone = phone[0]+phone[1]+phone[2]
    birth = birth[0]+birth[1]+birth[2]
    tel = tel[0]+tel[1]+tel[2]
    email = email[0]+'@'+email[1]

    try {
        const sql = `UPDATE user SET userpw=?, userimage=?, name=?, nickname=?, birth=?,
        address=?, gender=?, tel=?, phone=?, email=?, intro=? WHERE userid=?`
        const prepare = [ userpw, userimage, name, nickname, birth,address,
                          gender, tel, phone, email, intro, userid ]
        const [result] = await pool.execute(sql,prepare)
        res.json(result)
    } catch(e){
        console.log(e)
        const err = 1062
        res.json({err})
        console.log('중복된 닉네임 임다')
        res.redirect('http://localhost:3001/user/profileUpdate')
    }
    
}

exports.logout = (req,res) => {
    const cookie = req.headers.cookie.split('=')[0]
    res.clearCookie(cookie)
    res.json({})
}

exports.resign = async (req,res) => {
    const {userid} = req.user
    const sql = `DELETE FROM user WHERE userid=?`
    const prepare = [userid]
    const [result] = await pool.execute(sql,prepare)

    res.clearCookie('token')
    res.clearCookie('userData')

    res.json({})
}

exports.welcome = async (req,res) => {
    const {userid} = req.user
    const sql = `SELECT * FROM user WHERE userid=?`
    const prepare = [userid]
    
    let [[result]] = await pool.execute(sql,prepare)
    
    let birth = JSON.stringify(result.birth)
    let date = JSON.stringify(result.date)
    
    const sql1 = `SELECT DATE_ADD(${birth}, INTERVAL 9 HOUR)`
    const sql2 = `SELECT DATE_ADD(${date}, INTERVAL 9 HOUR)`
    let [[result1]] = await pool.execute(sql1)
    let [[result2]] = await pool.execute(sql2)

    let a = JSON.stringify(result1).split(`"`)[5].split(' ')[0]
    let b = JSON.stringify(result2).split('"')[5]
    result.birth = a
    result.date = b
    
    res.json(result)
}

exports.Auth = async (req,res)=>{
    try{
        if(req.body.cookie.split('=')[0]==='token'){
            try{
                const cookie = req.body.cookie.split('=')[1].split('.')[1]
                const user = JSON.parse(Buffer.from(cookie,'base64').toString('utf-8'))
            
                const sql = `SELECT * FROM user WHERE userid=? and nickname=?`
                const prepare = [user.userid, user.nickname]
        
                const [[result]] = await pool.execute(sql,prepare)
                
                const response  = {
                    errno:0,
                }
                res.json(response)
        
            } catch (e){
                console.log(e.message)
                const response = {
                    errno:1,
                }
                res.json(response)
            }
        } else if (req.body.cookie.split('=')[0]==='kakaoToken'){
            try{
                const cookie = req.body.cookie.split('=')[1].split('.')[1]
                const user = JSON.parse(Buffer.from(cookie,'base64').toString('utf-8'))
                console.log(user)
                
                const response = {
                    errno:0,
                }
                res.json(response)
            } catch(e){
                console.log(e.message)
                const response = {
                    errno:1,
                }
                res.json(response)
            }
        } else {
            const response = {
                errno:1,
            }
            res.json(response)
        }
    } catch(e){
        console.log(e.message)
        const response = {
            errno:1,
        }
        res.json(response)
    }
}