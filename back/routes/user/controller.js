const pool = require('../../db.js').pool
const {createToken} = require('../../utils/jwt.js')

exports.join = async (req,res)=>{
    const { userid, userpw, userimage, name,
            nickname, birth, address, gender,
            tel, phone, email, intro } = req.body

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
                     intro ]

    try {
        const [ result ] = await pool.execute(sql,prepare)

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
        // { userid: '3', nickname: '3' }

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
        // console.log('리스폰스',response)
        
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
    const {userpw,userimage,name,nickname,birth,address,gender,tel,phone,email,intro} = req.body

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
        // console.log('중복된 닉네임 임다')
        // res.redirect('http://localhost:3001/user/profileUpdate')
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