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
        // console.log(result)

        // res.setHeader('Set-cookie','name=seungju; path=/; Domain=localhost;')
        res.cookie('name2','ingoo2',{
            path:'/',
            httpOnly:true,
            secure:true,
            domain:'localhost'
        })

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
                SELECT userid, userpw, name, level, point, nickname 
                FROM user 
                WHERE userid=? and userpw=?
                `
    const prepare = [userid, userpw]

    try {
        const [result] = await pool.execute(sql,prepare)
  

        if(result.length == 0) throw Error('등록된회원이 아닙니다.')
     



        const jwt = createToken({...result[0]})
        
        res.cookie('token',jwt,{
            path:'/',
            httpOnly:true,
            secure:true,
            domain:'localhost'
        })
        delete result[0].userpw
        res.cookie('CURRENT_USER',JSON.stringify(result[0]),
        {
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
    const {userid,userpw} = req.user

    const sql = `SELECT * FROM user WHERE userid=? and userpw=?`
    const prepare = [userid, userpw]
    const [[result]] = await pool.execute(sql,prepare)
    
    res.json(result)
}