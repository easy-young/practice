const pool = require('../../db.js').pool

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

exports.login = (req,res)=>{
    res.redirect('/')
}