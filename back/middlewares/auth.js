const {createSignature} = require('../utils/jwt.js');
const {pool} = require('../db.js')

exports.Auth = async (req, res, next) => {
    const {token} = req.cookies;
    const {kakaoToken} = req.cookies;

    if (token !== undefined) {
        const [header,payload,sign] = token.split('.')
        const signature = createSignature(header,payload)

        if (sign !== signature) throw new Error('토큰 변조함 NaGa')
        const user = JSON.parse(Buffer.from(payload,'base64').toString('utf-8'))
        req.user = {
            ...user,
            isLogin:true
        }
    } else if(kakaoToken !== undefined) {
        const [header,payload,sign] = kakaoToken.split('.')
        const signature = createSignature(header,payload)

        if (sign !== signature) throw new Error('토큰 변조함 NaGa')
        const user = JSON.parse(Buffer.from(payload,'base64').toString('utf-8'))
        
        const sql = `SELECT userid FROM user WHERE nickname=?`
        const prepare = [user.nickname]
        const [[result]] = await pool.execute(sql,prepare)

        req.user = {
            ...user,
            userid:result.userid,
            isLogin:true
        }
    } else {
        req.user = {
            isLogin:false
        }
    }
    next();
}