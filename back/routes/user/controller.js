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
        console.log(result)

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
    const sql = `SELECT * FROM user WHERE userid=?`
    const prepare = [userid]
    const [[result]] = await pool.execute(sql,prepare)

    res.json(result)
}

exports.profileUpdate = (req,res)=>{
    const {userid} = req.user
    // const sql = `SELECT * FROM user WHERE userid=?`
    // const prepare = [userid]
    // const [[result]] = await pool.execute(sql,prepare)
    // const {userimage,name,nickname,birth,address,gender,tel,phone,email,intro} = result

    // const sql2 = `UPDATE user SET name=?, gender=? WHERE=?`
    // const prepare2 = [name,gender,userid]
    // const [[result2]] = await pool.execute(sql2,prepare2)
    // console.log(result2)

}



exports.kakaoLogout = (req,res) => {
    res.clearCookie('kakaoToken')

    res.json({})
}

exports.logout = (req,res) => {
    res.clearCookie('token')

    res.json({})
}

