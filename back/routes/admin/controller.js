const pool = require('../../db').pool;

exports.admin = (req, res)=>{
    res.redirect('/');
};

exports.user = async (req, res)=>{
    const sql = `SELECT level, userid, userimage, name, nickname,
                        birth, address, gender, tel, phone,
                        email, intro, point, active, date
                    FROM user`;
    try {
        const [result] = await pool.execute(sql);
        res.send(result);
    } catch (e) {
        console.log(e.message);
    }
};

exports.category = (req, res)=>{
    console.log(req.body.subject);
    res.send('샌드 ㄱㄱ') ;
};

exports.board = async (req,res)=>{
    const sql = `SELECT * FROM board`;
    try {
        const [result] = await pool.execute(sql);
        res.send(result);
    } catch (e) {
        console.log(e.message);
    }
};

exports.stats = (req,res)=>{
    res.redirect('/');
};