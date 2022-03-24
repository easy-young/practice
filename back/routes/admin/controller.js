const pool = require('../../db').pool;
const axios = require('axios');

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
    res.redirect('http://localhost:3001/admin/user');
};

exports.category = async (req, res) => {
    const sql = `SELECT * FROM category ORDER BY code ASC`;
    try {
        const [result] = await pool.execute(sql);
        res.send(result);
    } catch (e) {
        console.log(e.message);
    }
};

exports.categoryAdd = async (req, res) => {
    const {main, sub} = req.body;
    const sql = `INSERT INTO category(main,sub) VALUES(?,?)`;
    const prepare = [main, sub];
    try {
        const [result] = await pool.execute(sql, prepare);
        res.send(prepare);
    } catch (e) {
        if (e.errno === 1062) res.send('duplicate');
        else console.log(e.message);
    }
};

exports.categoryModify = async (req, res) => {
    console.log(req.body);
    const sql = `UPDATE category SET ???`;
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

exports.boardModify = async (req, res) => {
    const {active} = req.body;
    const sql = `SELECT * FROM board`;
    const [result] = await pool.execute(sql);

    const sql2 = `UPDATE board SET active=? WHERE idx=?`;
    let prepare = [];
    for (let i = 0; i < result.length; i++) {
        if (result[i].active != active[i]) {
            prepare.push(active[i]);
            prepare.push(result[i].idx);

            const [result2] = await pool.execute(sql2, prepare);
            prepare = [];
        }
    }
    res.redirect('http://localhost:3001/admin/board');
};

exports.hide = async (req, res) => {
    const sql = `SELECT * FROM board`;
    try {
        const [result] = await pool.execute(sql);
        res.send(result);
    } catch (e) {
        console.log(e.message);
    }
};

exports.idx = async (req, res) => {
    const sql = `SELECT * FROM board ORDER BY idx ASC`;
    try {
        const [result] = await pool.execute(sql);
        res.send(result);
    } catch (e) {
        console.log(e.message);
    }
}

exports.hit = async (req, res) => {
    const sql = `SELECT * FROM board ORDER BY hit DESC`;
    try {
        const [result] = await pool.execute(sql);
        res.send(result);
    } catch (e) {
        console.log(e.message);
    }
};

exports.good = async (req, res) => {
    const sql = `SELECT * FROM board ORDER BY good DESC`;
    try {
        const [result] = await pool.execute(sql);
        res.send(result);
    } catch (e) {
        console.log(e.message);
    }
};

exports.view = async (req, res) => {
    const {idx} = req.params;
    const sql = `SELECT * FROM board WHERE idx=?`;
    const prepare = [idx];
    try {
        const [result] = await pool.execute(sql, prepare);
        res.send(result);
    } catch (e) {
        console.log(e.message);
    }
};

exports.stats = (req, res) => {
    res.redirect('/');
};