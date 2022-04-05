const pool = require('../../db.js').pool
const {createToken} = require('../../utils/jwt.js')
const axios = require('axios')

exports.join = async (req,res)=>{

    let userimage = req.file.filename
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

    try {
        const response = {
            result:{
                userid,
                nickname,
            },
            errno:0,
        }
        
        res.json(response)
        // res.send(JSON.stringify(response))

    } catch (e) {
        console.log(e)
        const response = {
            errno:1,
        }
        res.json(response)
    }
}

exports.kakaoJoin = async (req,res)=>{
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

    const response = {
        errno:0
    }
    res.json(response)
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
        
        const sql1 = `SELECT DATE_ADD(${birth}, INTERVAL 9 HOUR)`
        const sql2 = `SELECT DATE_ADD(${date}, INTERVAL 9 HOUR)`
        let [[result1]] = await pool.execute(sql1)
        let [[result2]] = await pool.execute(sql2)
    
        let a = JSON.stringify(result1).split(`"`)[5].split(' ')[0]
        let b = JSON.stringify(result2).split('"')[5]
        result.birth = a
        result.date = b
        
        res.json(result)

    } else if(cookie == 'kakaoToken'){
        const {email} = user
        const sql = `SELECT * FROM user WHERE email=?`
        const prepare = [email]
        
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
    
}

exports.profileUpdate = async (req,res)=>{
    
    const cookie = req.headers.cookie.split('=')[0]
    const cookie1 = req.headers.cookie.split('=')[1].split('.')[1]
    const user = JSON.parse(Buffer.from(cookie1,'base64').toString('utf-8'))
    if(cookie == 'token'){
        let userimage = req.file.filename
        userimage = `http://localhost:3000/uploadsUser/${userimage}`
        
        const {userid} = req.user
        const {userpw,name,nickname,address,gender,intro} = req.body
        let {phone, birth, tel, email} = req.body

        try {
            const sql = `UPDATE user SET userpw=?, userimage=?, name=?, nickname=?, birth=?,
                         address=?, gender=?, tel=?, phone=?, email=?, intro=? WHERE userid=?`
            const prepare = [ userpw, userimage, name, nickname, birth, address,
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
    } else if (cookie == 'kakaoToken'){
        let {email} = req.body
        email = email[0]+'@'+email[1]

        const sql = `SELECT userid FROM user WHERE email=?`
        const prepare = [email]
        let [[result]] = await pool.execute(sql,prepare)

        let {userid} = result

        let {userpw,userimage,name,nickname,birth,address,gender,tel,phone,intro} = req.body
        birth = birth[0]+birth[1]+birth[2]
        tel = tel[0]+tel[1]+tel[2]
        phone = phone[0]+phone[1]+phone[2]
        
        const sql1 = `UPDATE user SET userpw=?, userimage=?, name=?,
                                      nickname=?, birth=?, address=?,
                                      gender=?, tel=?, phone=?,
                                      intro=? WHERE userid=?`

        const prepare1 = [ userpw, userimage, name,
                           nickname, birth,address,
                           gender, tel, phone,
                           intro, userid ]

        const [result1] = await pool.execute(sql1,prepare1)
        
        res.json(result1)
    }
}

exports.logout = (req,res) => {
    try{
        const cookie = req.headers.cookie.split('=')[0]
        // const cookiePayload = req.headers.cookie.split('=')[1].split('.')[1]
        // const kakao = JSON.parse(Buffer.from(cookiePayload,'base64').toString('utf-8'))
        // let access_token
        
        if(cookie == 'token'){
            res.clearCookie(cookie)
            res.json({})
        } else if(cookie == 'kakaoToken') {
            // access_token = kakao.access_token
            
            // let logout = await axios({
            //     method:'post',
            //     url:'https://kapi.kakao.com/v1/user/unlink',
            //     headers:{
            //       'Authorization': `Bearer ${access_token}`
            //     }
            // });
            res.clearCookie(cookie)
            res.json({})
        }
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
        res.clearCookie('userData')
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
    const cookieAuth = req.headers.cookie.split('=')[0]
    if(cookieAuth == 'token'){
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
    } else if(cookieAuth == 'kakaoToken'){
        const cookie = req.headers.cookie.split('=')[1].split('.')[1]
        const user = JSON.parse(Buffer.from(cookie,'base64').toString('utf-8'))
        const {nickname, email} = user
    
        const sql = `SELECT * FROM user WHERE nickname=? and email=?`
        const prepare = [nickname, email]
        let [[result]] = await pool.execute(sql, prepare)
    
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
}

// exports.kakaoWelcome = async (req,res)=>{
    
// }

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

exports.kakaoJoinAuth = async (req,res)=>{
    const {nickname,email,userimage} = req.body
    const sql = `SELECT * FROM user WHERE nickname=? and email=?`
    const prepare = [nickname, email]
    const [[result]] = await pool.execute(sql,prepare)
    let response
    if(result == undefined){
        response = {
            errno:0
        }
    } else {
        
        response = {
            errno:1
        }
    }
    res.json(response)
}