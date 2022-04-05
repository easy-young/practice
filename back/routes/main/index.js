const express = require('express');
const {pool} = require('../../db.js');
const router = express.Router();

router.post('/loginCheck', async (req, res) => {
    let cookie, cookiePayload, user, userid, nickname, email, sql, prepare, result, response;
    
    try {
        cookie = req.headers.cookie.split('=')[0];
        cookiePayload = req.headers.cookie.split('=')[1].split('.')[1];
        user = JSON.parse(Buffer.from(cookiePayload,'base64').toString('utf-8'));
        if(cookie === 'token'){
            userid = user.userid;
            nickname = user.nickname;
            sql = `SELECT * FROM user WHERE userid=? and nickname=?`;
            prepare = [userid, nickname];
            result = await pool.execute(sql, prepare);

            response = {
                errno:0
            };
            res.json(response);
        } else if(cookie === 'kakaoToken'){
            nickname = user.nickname;
            email = user.email;
            sql = `SELECT * FROM user WHERE nickname=? and email=?`;
            prepare = [nickname, email];
            result = await pool.execute(sql, prepare);

            response = {
                errno:0
            };
            res.json(response);
        }
    } catch(e){
        console.log(e.message);
        response = {
            errno:1
        };
        res.json(response);
    }
});

module.exports = router;