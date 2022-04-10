const express = require('express');
const {pool} = require('../../db.js');
const router = express.Router();

router.post('/loginCheck', async (req, res) => {
    let cookie, cookiePayload, user, userid, nickname, email, sql, prepare, result, response;
    try {
        if (req.headers.cookie !== undefined) {
            if(req.headers.cookie.includes('token')){
                cookiePayload = req.headers.cookie.split('token=')[1].split('.')[1];
                user = JSON.parse(Buffer.from(cookiePayload,'base64').toString('utf-8'));
                userid = user.userid;
                nickname = user.nickname;
                sql = `SELECT * FROM user WHERE userid=? and nickname=?`;
                prepare = [userid, nickname];
                result = await pool.execute(sql, prepare);

                response = {
                    userid: req.user.userid,
                    nickname: req.user.nickname,
                    errno:0
                };
                res.json(response);
            } else if(req.headers.cookie.includes('kakaoToken')){
                cookiePayload = req.headers.cookie.split('kakaoToken=')[1].split('.')[1];
                user = JSON.parse(Buffer.from(cookiePayload,'base64').toString('utf-8'));
                nickname = user.nickname;
                email = user.email;
                sql = `SELECT * FROM user WHERE nickname=? and email=?`;
                prepare = [nickname, email];
                result = await pool.execute(sql, prepare);

                response = {
                    userid: req.user.userid,
                    nickname: req.user.nickname,
                    errno:0
                };
                res.json(response);
            } else throw new Error
        } else throw new Error
    } catch(e){
        console.log(e.message);
        res.json({errno:1});
    }
});

module.exports = router;