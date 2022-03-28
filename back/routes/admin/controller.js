const pool = require('../../db').pool;

exports.admin = async (req, res) => {
    //
};

exports.login = async (req, res) => {
    const {userid, userpw} = req.body;
    const sql = `SELECT userid, userpw FROM user WHERE userid=? AND userpw=? AND level=1`;
    const prepare = [userid, userpw];
    const [result] = await pool.execute(sql, prepare);
    let result2;
    if (result.length === 1) {
        req.session.user = result[0].userid;
        result2 = {user:req.session.user};
        res.send(result2);
    } else {
        req.session.destroy(()=>{
            req.session
        });
        res.send('Login Fail');
    }
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

exports.search = async (req, res) => {
    const {search} = req.body;
    const sql = `SELECT level, userid, userimage, name, nickname,
                        birth, address, gender, tel, phone,
                        email, intro, point, active, date
                    FROM user
                    WHERE nickname LIKE '%${search}%'`;
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
    res.send();
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
    const {main, sub} = req.body;
    const sql = `SELECT * FROM category`;
    const [result] = await pool.execute(sql);

    const sql2 = `UPDATE category SET main=?,sub=? WHERE code=?`;
    let prepare = [];
    for (let i = 0; i < main.length; i++) {
        if (result[i].main != main[i] || result[i].sub != sub[i]) {
            prepare.push(main[i]);
            prepare.push(sub[i]);
            prepare.push(result[i].code);

            const [result2] = await pool.execute(sql2, prepare);
            prepare = [];
        }
    }
    res.send();
};

exports.categoryDelete = async (req, res) => {
    const {num} = req.body;
    const sql = `SELECT * FROM category`;
    const [result] = await pool.execute(sql);
    const {code} = result[num-1];

    const sql2 = `DELETE FROM category WHERE code=?`;
    const prepare = [code];
    try {
        const [result2] = await pool.execute(sql2, prepare);
        res.send(result2);
    } catch (e) {
        console.log(e.message);
    }
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
    res.send();
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
    const sql = ``;
    res.send();
};