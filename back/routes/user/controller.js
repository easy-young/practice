const pool = require('../../db.js').pool
const {createToken} = require('../../utils/jwt.js')
var fs = require('fs')
// const axios = require('axios')

exports.join = async (req,res)=>{
    try{
        let userimage = req.file.filename;
        userimage = `http://localhost:3000/uploadsUser/${userimage}`
        const { userid, userpw, name, nickname, address, gender,
                intro, email, birth, phone,tel } = req.body

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
                          birth, address, gender, tel, phone, email, intro ];
           
        const [ result ] = await pool.execute(sql,prepare);
        const tokenResult = {userid, nickname}
        const jwt = createToken({...tokenResult})
        res.cookie('token',jwt,{
            path:'/',
            httpOnly:true,
            secure:true,
            domain:'localhost',
        })
        res.json({errno:0})
    } catch(e){
        if(e.message.substring(0,2)=='Du') res.json({errno:1})
        if(e.message.substring(0,2)=='In') res.json({errno:2})
    }
        
}

exports.kakaoJoin = async (req,res)=>{
    try{
        const {userid,userpw,name,nickname,address,gender,email,intro} = req.body
        let {birth, tel, phone, userimage} = req.body
        birth = birth[0]+birth[1]+birth[2]
        tel = tel[0]+tel[1]+tel[2]
        phone = phone[0]+phone[1]+phone[2]
        
        userimage = userimage.split(`"`)[1]

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
        
        const tokenResult = {nickname, email}
        const jwt = createToken({...tokenResult})
        res.cookie('kakaoToken',jwt,{
            path:'/',
            httpOnly:true,
            secure:true,
            domain:'localhost'
        })
        res.json({errno:0})
    } catch(e){
        console.log(e.message)
        const eLength = e.message.length
        if(e.message.substring(0,2)=='Du') res.json({errno:1})
        if(e.message.substring(0,2)=='In') res.json({errno:2})
    }
}

exports.login = async (req,res)=>{
    const {userid, userpw} = req.body
    const sql = `
                SELECT userid, name, level, point, nickname, active
                FROM user 
                WHERE userid=? and userpw=?
                `
    const prepare = [userid, userpw]
    const [[result]] = await pool.execute(sql,prepare)
    
    if(result == undefined) {
        res.json({errno:1})
    } else {
        if(result.active == 0) res.json({errno:2})
        if(result.active != 0) {
            const {nickname} = result
            const tokenResult = {userid, nickname}
            const jwt = createToken({...tokenResult})
            res.cookie('token',jwt,{
                path:'/',
                httpOnly:true,
                secure:true,
                domain:'localhost'
            })
            res.json({result,errno:0})
        }
    }
}

exports.profile = async (req,res) => {
    try {
        const cookie = req.headers.cookie.split('=')[0]
        const cookie1 = req.headers.cookie.split('=')[1].split('.')[1]
        const user = JSON.parse(Buffer.from(cookie1,'base64').toString('utf-8'))

        if(cookie == 'token'){
            const {userid} = req.user
            const sql = `SELECT * FROM user WHERE userid=?`
            const prepare = [userid]
            
            let [[result]] = await pool.execute(sql,prepare)
            
            let birth = JSON.stringify(result.birth)
            let date = JSON.stringify(result.date)
            let real_birth = birth.split('T')[0].substring(1,11)
            const a = date.split('"')[1].split('T')
            let real_date = a[0]+' '+a[1].substring(0,8)

            result.birth = real_birth
            result.date = real_date

            res.json(result);

        } else if(cookie == 'kakaoToken'){
            const {email} = user
            const sql = `SELECT * FROM user WHERE email=?`
            const prepare = [email]
            
            let [[result]] = await pool.execute(sql,prepare)
            
            let birth = JSON.stringify(result.birth)
            let date = JSON.stringify(result.date)
            let real_birth = birth.split('T')[0].substring(1,11)
            const a = date.split('"')[1].split('T')
            let real_date = a[0]+' '+a[1].substring(0,8)

            result.birth = real_birth
            result.date = real_date

            res.json(result)
        }
    } catch(e){
        console.log(e.message)
    }
    
}

exports.profileUpdate = async (req,res)=>{
    const cookie = req.headers.cookie.split('=')[0]
    try {
        if(cookie == 'token'){
            const {userid} = req.user
            const {userpw,name,nickname,address,gender,intro} = req.body
            let {phone, birth, tel, email} = req.body
            if(req.file == undefined){
                const sql = `UPDATE user SET userpw=?, name=?, nickname=?, birth=?,
                             address=?, gender=?, tel=?, phone=?, email=?, intro=? WHERE userid=?`
                const prepare = [ userpw, name, nickname, birth, address,
                                gender, tel, phone, email, intro, userid ]
                const [result] = await pool.execute(sql,prepare)
                res.json({errno:0})
            } else {

                let userimage = req.file.filename
                userimage = `http://localhost:3000/uploadsUser/${userimage}`
                
                const sql = `UPDATE user SET userpw=?, userimage=?, name=?, nickname=?, birth=?,
                            address=?, gender=?, tel=?, phone=?, email=?, intro=? WHERE userid=?`
                const prepare = [ userpw, userimage, name, nickname, birth, address,
                                gender, tel, phone, email, intro, userid ]
                const [result] = await pool.execute(sql,prepare)
                res.json({errno:0})
            }
            
        } else if (cookie == 'kakaoToken'){
            let {email} = req.body
    
            const sql = `SELECT userid FROM user WHERE email=?`
            const prepare = [email]
            let [[result]] = await pool.execute(sql,prepare)
            let {userid} = result
            let {userpw,name,nickname,birth,address,gender,tel,phone,intro} = req.body
            
            const sql1 = `UPDATE user SET userpw=?, name=?,
                                          nickname=?, birth=?, address=?,
                                          gender=?, tel=?, phone=?,
                                          intro=? WHERE userid=?`
            const prepare1 = [ userpw, name,
                               nickname, birth,address,
                               gender, tel, phone,
                               intro, userid ]
            const [result1] = await pool.execute(sql1,prepare1)
            res.json({errno:0})
        }
    } catch(e){
        if(e.message.substring(0,2)=='Du') res.json({errno:1})
        if(e.message.substring(0,2)=='In') res.json({errno:2})
    }
}

exports.logout = (req,res) => {
    try{
        res.clearCookie('token')
        res.clearCookie('kakaoToken')
        res.json({})
    } catch(e){
        console.log(e)
    }
}

exports.resign = async (req,res) => {
    const token = req.headers.cookie.split('=')[0]

    if(token ==='token'){
        const {userid} = req.user
        const sql = `DELETE FROM user WHERE userid=?`
        const prepare = [userid]
        const [result] = await pool.execute(sql,prepare)

        res.clearCookie('token')
        res.json({})

    } else if(token ==='kakaoToken'){
        const cookie = req.headers.cookie.split('=')[1].split('.')[1]
        const user = JSON.parse(Buffer.from(cookie,'base64').toString('utf-8'))
        const {email} = user
        const sql = `DELETE FROM user WHERE email=?`
        const prepare = [email]
        const [result] = await pool.execute(sql,prepare)

        res.clearCookie('kakaoToken')
        res.json({})
    }
}

exports.welcome = async (req,res) => {
    try{
        const cookieAuth = req.headers.cookie.split('=')[0]
        if(cookieAuth == 'token'){
            const {userid} = req.user
            const sql = `SELECT * FROM user WHERE userid=?`
            const prepare = [userid]
            
            let [[result]] = await pool.execute(sql,prepare)

            let birth = JSON.stringify(result.birth)
            let date = JSON.stringify(result.date)
            let real_birth = birth.split('T')[0].substring(1,11)
            const a = date.split('"')[1].split('T')
            let real_date = a[0]+' '+a[1].substring(0,8)

            result.birth = real_birth
            result.date = real_date
            res.json(result)
        } else if(cookieAuth == 'kakaoToken'){
            const cookie = req.headers.cookie.split('=')[1].split('.')[1]
            const user = JSON.parse(Buffer.from(cookie,'base64').toString('utf-8'))
            const {nickname, email} = user
        
            const sql = `SELECT * FROM user WHERE nickname=? and email=?`
            const prepare = [nickname, email]
            let [[result]] = await pool.execute(sql, prepare)
        
            let birth = JSON.stringify(result.birth)
            let date = JSON.stringify(result.date)
            let real_birth = birth.split('T')[0].substring(1,11)
            const a = date.split('"')[1].split('T')
            let real_date = a[0]+' '+a[1].substring(0,8)

            result.birth = real_birth
            result.date = real_date
        
            res.json(result)
        }
    } catch(e){
        console.log(e.message)
    }
    
}

exports.Auth = async (req,res)=>{
    try{
        const cookieName = req.headers.cookie.split('=')
        const cookie = cookieName[1].split('.')[1]
        const user = JSON.parse(Buffer.from(cookie,'base64').toString('utf-8'))

        if(cookieName[0] =='token'){
            const sql = `SELECT * FROM user WHERE userid=? and nickname=?`
            const prepare = [user.userid, user.nickname]
            const [result] = await pool.execute(sql,prepare)
            if(result.length != 0) res.json({errno:1})
            if(result.length == 0) res.json({errno:0})
        } else if(cookieName[0] == 'kakaoToken'){
            const sql = `SELECT * FROM user WHERE nickname=? and email=?`
            const prepare = [user.nickname, user.email]
            const [result] = await pool.execute(sql,prepare)
            if(result.length != 0) res.json({errno:1})
            if(result.length == 0) res.json({errno:0})
        }
    } catch(e){
        console.log(e.message)
        res.json({errno:2})
    }
}

exports.kakaoJoinAuth = async (req,res)=>{
    const {nickname,email,userimage} = req.body
    const sql = `SELECT * FROM user WHERE nickname=? and email=?`
    const prepare = [nickname, email]
    const [[result]] = await pool.execute(sql,prepare)
    let response
    if(result == undefined){
        response = {errno:0}
    } else {
        response = {errno:1}
    }
    res.json(response)
}

exports.tokenName = (req,res) => {
    const cookie = req.headers.cookie.split('=')[0]
    if(cookie == 'token') res.json({token:'token'})
    if(cookie == 'kakaoToken') res.json({token:'kakaoToken'})
}

exports.FS = (req,res)=>{
    const {userimage} =  req.body
    const a = userimage.split('/')[4]
    fs.unlink(`./public/uploadsUser/${a}`,(err)=>{
        try{
            if(err) throw new Error;
            console.log('사진업데이트 성공!')
        }catch(e){
            console.log(e.messege)
        }
    })
    res.json({})
}