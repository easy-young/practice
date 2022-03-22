const pool = require('../../db').pool;

exports.admin = (req, res) => {
    res.redirect('/');
};

exports.user = async (req, res) => {
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

exports.userModify = async (req, res) => {
    const {level, active} = req.body;
    const sql = `SELECT level, userid, userimage, name, nickname,
                    birth, address, gender, tel, phone,
                    email, intro, point, active, date
                FROM user`;
    const [result] = await pool.execute(sql);

    const sql2 = `UPDATE user SET level=?, active=? WHERE userid=?`;
    let prepare = [];
    for (let i = 0; i < result.length; i++) {
        if (result[i].level != level[i] || result[i].active !== active[i]) {
            prepare.push(level[i]);
            prepare.push(active[i]);
            prepare.push(result[i].userid);

            const [result2] = await pool.execute(sql2, prepare);
            prepare = [];
        }
    }
    res.send(result);
};

exports.category = (req, res) => {
    console.log(req.body.subject);
    res.send('샌드 ㄱㄱ') ;
};

exports.board = async (req, res) => {
    const sql = `SELECT * FROM board`;
    try {
        const [result] = await pool.execute(sql);
        res.send(result);
    } catch (e) {
        console.log(e.message);
    }
};

exports.view = async (req, res) => {
    console.log(req.params);
    const sql = `SELECT nickname FROM board WHERE idx=?`;
    const prepare = [];
    const sql2 = `SELECT * FROM board WHERE nickname=?`;
    const prepare2 = [];
    // try {
    //     const [result] = await pool.execute(sql, prepare);
    // } catch (e) {
    //     console.log(e.message);
    // }
};

exports.stats = (req, res) => {
    res.redirect('/');
};