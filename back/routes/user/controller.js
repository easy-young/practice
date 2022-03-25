const pool = require('../../db.js').pool
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
    
    try {
        const sql = `SELECT * FROM user WHERE userid=?`
        const prepare = [userid]
        const [[result]] = await pool.execute(sql,prepare)
    
        res.json(result)
    } catch (e){
        console.log(e.message)
    }
    
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



exports.kakaoLogout = (req,res) => {
    res.clearCookie('kakaoToken')

    res.json({})
}

exports.logout = (req,res) => {
    res.clearCookie('token')

    res.json({})
}

exports.resign = async (req,res) => {
    const {userid} = req.user
    const sql = `DELETE FROM user WHERE userid=?`
    const prepare = [userid]
    const [result] = await pool.execute(sql,prepare)

    res.clearCookie('token')
    

    res.json({})
}

exports.welcome = async (req,res) => {
    const {userid} = req.user
    const sql = `SELECT * FROM user WHERE userid=?`
    const prepare = [userid]
    
    const [[result]] = await pool.execute(sql,prepare)
    
    res.json(result)
}