const { pool } = require("../../db");
const { v4 } = require("uuid");
const moment = require("moment");

exports.list = async (req, res) => {
    try {
        const [data] = await pool.query("SELECT * FROM board ORDER BY date DESC");
        const dataFormat = async (array) => {
            const posts = [];
            for (let i = 0; i < array.length; i++) {
                const post = array[i];
                const [[userdata]] = await pool.query(`SELECT * FROM user where userid=?`, [post.userid]);
                const [tag] = await pool.query(`SELECT * FROM tag where idx=?`, [post.idx,]);
                await posts.push({
                    ...post,
                    tag: tag,
                    userimage: userdata.userimage,
                    date: await setDateChanger(post.date),
                });
            }
            return await posts;
        };
        res.json({
            reqName: "board_list",
            status: true,
            data: await dataFormat(data),
        });
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ reqName: "board_list", status: false });
    }
};

exports.getPost = async (req, res) => {
    try {
        const { idx } = req.params;
        const [[data]] = await pool.query(`SELECT * FROM board where idx=?`, [idx]);
        res.json({
            reqName: "getPost",
            status: true,
            data: { ...data, date: setDateChanger(data.date) },
        });
    } catch (error) {
            res.status(500).json({
            reqName: "getPost",
            status: false,
        });
    }
};

exports.view = async (req, res) => {
    try {
        const { idx } = req.params;
        const [[data]] = await pool.query(`SELECT * FROM board where idx=?`, [idx]);
        const [response] = await pool.query(`UPDATE board SET hit = ? WHERE idx = ?`, [data.hit + 1, idx]);
        const [tag] = await pool.query(`SELECT * FROM tag where idx=?`, [idx]);
        res.json({
            reqName: "board_view",
            status: true,
            data: { ...data, tag: tag },
            user: req.user.userid,
            nickname: req.user.nickname
        });
    } catch (error) {
        res.status(500).json({reqName: "board_view", status: false,});
    }
};

exports.write = async (req, res) => {
    try {
        const { userid, nickname, isLogin } = req.user;
        if (isLogin) {
            let upload = '';
            for (let i = 0; i < req.files.upload.length; i++) {
                upload += req.files.upload[i].filename;
                if (i !== req.files.upload.length - 1) upload += ',';
            }
            const { content, subject, main, sub } = req.body;
            const queryStr = `INSERT INTO board(userid,nickname,imageName,subject,content,hit,good,date,main,sub) VALUES('${userid}','${nickname}','${upload}','${subject}','${content}',0,0,NOW(),'${main}','${sub}' );`;
            const [result] = await pool.query(queryStr);

            await getHashTag(content).then(async (arr) => {
                await arr.forEach(async (tag) => {
                    await pool.query(`INSERT INTO tag (idx,tag) VALUES('${result.insertId}' , '${tag}')`);
                });
            });
            res.json({ reqName: "post_write", status: true, result });
        } else {
            res.json({
                reqName: "post_write",
                status: false,
                message: "login 유저만 글쓰기 가능",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ reqName: "post_write", status: false });
    }
};

exports.modify = async (req, res) => {
    try {
        const { subject, content, idx } = req.body;
        let upload = '';
        let queryStr, param;
        if (req.files.upload === undefined) {
            queryStr = `UPDATE board SET subject=?, content=? WHERE idx =?`;
            param = [subject, content, idx];
        } else {
            for (let i = 0; i < req.files.upload.length; i++) {
                upload += req.files.upload[i].filename;
                if (i !== req.files.upload.length - 1) upload += ',';
            }
            queryStr = `UPDATE board SET subject=?, content=?, imageName=? WHERE idx =?`;
            param = [subject, content, upload, idx];
        }
        const data = await pool.query(queryStr, param);
        await pool.query("DELETE FROM tag WHERE idx=?", [idx]);
        await getHashTag(content).then(async (arr) => {
            await arr.forEach(async (tag) => {
                await pool.query(`INSERT INTO tag (idx,tag) VALUES('${idx}' , '${tag}')`);
            });
        });
        res.json({ reqName: "post_write", status: true, data: data });
    } catch (error) {
        res.json({
            reqName: "post_write",
            status: false,
            message: "query error",
            error: error,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const {idx} = req.params;
        await pool.query("DELETE FROM reply WHERE idx=?", [idx]);
        await pool.query("DELETE FROM tag WHERE idx=?", [idx]);
        await pool.query("DELETE FROM board WHERE idx=?", [idx]);
        await res.json({ reqName: "post_delete", status: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            reqName: "post_delete",
            status: false,
        });
    }
};

exports.comment = async (req, res) => {
    try {
        const [data] = await pool.query("SELECT * FROM reply WHERE idx=?", req.params.idx);
        res.json({ reqName: "board_list", status: true, data });
    } catch (error) {
        res.status(200).json({ reqName: "board_list", status: false });
    }
};

exports.commentWrite = async (req, res) => {
    try {
        if (req.user.isLogin) {
            const {idx} = req.params;
            const { nickname } = req.user;
            const queryStr = `SELECT userid FROM user WHERE nickname=?`;
            const [[result]] = await pool.query(queryStr, nickname);

            const {userid} = result;
            const arr = [idx, req.body.comment, v4(), nickname, userid];
            const queryStr2 = `INSERT INTO reply(idx,comment,uuid,nickname,userid,createdAt,updatedAt) VALUES(?,?,?,?,?,NOW(),NOW() );`;
            await pool.query(queryStr2, arr);
            const [data] = await pool.query("SELECT * FROM reply WHERE idx=?", idx);
            await res.status(200).json({
                reqName: "board_comment_write",
                status: true,
                commentList: data,
            });
        } else {
            res.status(200).json({ reqName: "board_comment_write", status: false });
        }
    } catch (error) {
        res.status(200).json({ reqName: "board_comment_write", status: false });
    }
};

exports.commentUpdate = async (req, res) => {
    try {
        const { uuid, comment, idx } = req.body;
        await pool.query(`UPDATE reply SET comment=?, updatedAt=NOW() WHERE uuid=?`, [comment, uuid]);
        const data = await pool.query("SELECT * FROM reply WHERE idx=?", [idx]);
        res.json({
            reqName: "board_comment_update",
            status: true,
            comment: data[0],
        });
    } catch (error) {
        res.json({ reqName: "board_comment_update", status: false });
    }
};

exports.commentDelete = async (req, res) => {
    try {
        const {uuid} = req.body;
        await pool.query(`DELETE FROM reply WHERE uuid=?`, [uuid]);
        await res.status(200).json({ reqName: "post_delete", status: true });
    } catch (error) {
        res.status(200).json({ reqName: "board_comment_delete", status: false });
    }
};

exports.good = async (req, res) => {
    try {
        const {idx} = req.body;
        const data = await pool.query("SELECT * FROM board WHERE idx=?", idx);
        const responseData = data[0][0];
        if (responseData.goodUsers !== null) {
            const goodUsers = responseData.goodUsers.split(",");
            const isGood = goodUsers.findIndex((f) => f === req.user.userid) === -1 ? false : true;
            if (isGood) {res.status(200).json({
                                                reqName: "board_view",
                                                status: false,
                                                message: "이미 좋아요를 클릭하셨어요!",
                                            });
            } else {
                const goodUsersString = responseData.goodUsers + ',' + req.user.userid;
                responseData.good = responseData.good + 1;
                const getData = await pool.query(`UPDATE board SET goodUsers=?, good =? WHERE idx =?`, [goodUsersString, responseData.good, idx]);
                res.status(200).json({
                    reqName: "board_view",
                    status: true,
                    data: responseData,
                    goodUsers: responseData.goodUsers.split(","),
                });
            }
        } else {
            const goodUsersString = req.user.userid + ',';
            responseData.good = responseData.good + 1;
            const getData = await pool.query(`UPDATE board SET goodUsers=?, good=? WHERE idx=?`, [goodUsersString, responseData.good, idx]);
            res.status(200).json({
                reqName: "board_view",
                status: true,
                data: responseData,
                goodUsers: goodUsersString.split(',')
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(200).json({ reqName: "board_view", status: false });
    }
};

exports.scrap = async (req, res) => {
    try {
        const {idx} = req.body;
        const data = await pool.query("SELECT * FROM board WHERE idx=?", idx);
        const responseData = data[0][0];
        if (responseData.scrapUsers !== null) {
            const scrapUsers = responseData.scrapUsers.split(",");
            const isScrap = scrapUsers.findIndex((f) => f === req.user.userid) === -1 ? false : true;
            if (isScrap) {res.status(200).json({
                                                reqName: "board_view",
                                                status: false,
                                                message: "이미 스크랩을 클릭하셨어요!",
                                            });
            } else {
                const scrapUsersString = responseData.scrapUsers + ',' + req.user.userid;
                responseData.scrap = responseData.scrap + 1;
                const getData = await pool.query(`UPDATE board SET scrapUsers=?, scrap=? WHERE idx =?`, [scrapUsersString, responseData.scrap, idx]);
                res.status(200).json({
                    reqName: "board_view",
                    status: true,
                    data: responseData,
                    scrapUsers: responseData.scrapUsers.split(","),
                });
            }
        } else {
            const scrapUsersString = req.user.userid + ',';
            responseData.scrap = responseData.scrap + 1;
            const getData = await pool.query(`UPDATE board SET scrapUsers=?, scrap=? WHERE idx=?`, [scrapUsersString, responseData.scrap, idx]);
            res.status(200).json({
                reqName: "board_view",
                status: true,
                data: responseData,
                scrapUsers: scrapUsersString.split(',')
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(200).json({ reqName: "board_view", status: false });
    }
};

exports.search = async (req, res) => {
    try {
        const { type, searchText } = req.body;
        const dataFormat = async (array) => {
            const posts = [];
            for (let i = 0; i < array.length; i++) {
                const post = array[i];
                const [tag] = await pool.query(`SELECT * FROM tag where idx=?`, [post.idx,]);
                await posts.push({
                    ...post,
                    tag: tag,
                    date: await setDateChanger(post.date),
                });
            }
            return await posts;
        };

        if (searchText.length > 1) {
            if (type !== 'tag'){
                const [response] = await pool.query(`SELECT * FROM board WHERE ${type} LIKE "%${searchText}%" ORDER BY date DESC`, [searchText,]);
                res.status(200).json({ reqName: "search", status: true, data:await dataFormat(response) });
            } else {
                const [tags] = await pool.query(`SELECT * FROM tag WHERE ${type} LIKE "%${searchText}%" ORDER BY idx DESC`, [searchText,]);
                const setPost = async (tagData) => {
                    const posts = [];
                    for (let i = 0; i < tagData.length; i++) {
                        const s = tagData[i];
                        const [[board]] = await pool.query(`SELECT * FROM board WHERE idx=?`, [s.idx]);
                        posts.push(board);
                    }
                    return posts;
                };
                res.status(200).json({ reqName: "search", status: true, data:await dataFormat(await setPost(tags)) });
            }
        } else {
            res.status(200).json({ reqName: "search", status: false ,message:'검색어는 최소 두글자 이상 검색이 가능합니다.' });
        }
    } catch (error) {
        res.status(200).json({ reqName: "search", status: false });
    }
};

const getHashTag = async (str) => {
    const hashArrayOne = str.split("#");
    const hashArray = [];
    hashArrayOne.forEach((hasData, i) => {
        if (i !== 0) hashArray.push(hasData.split(" ")[0]);
    });
    return hashArray;
};

const setDateChanger = async (time) => {
    const inTime = moment(time);
    var now = moment();
    const base = moment.duration(now.diff(inTime));
    const asSeconds = base.asSeconds();
    const asMinutes = base.asMinutes();
    const asHours = base.asHours();
    const asDays = base.asDays();
    if (asSeconds < 60) return "방금 전";
    else if (asMinutes < 60) return Math.floor(asMinutes) + "분전";
    else if (asHours < 24) return Math.floor(asHours) + "시간전";
    else if (asDays < 7) return Math.floor(asDays) + "일전";
    else if (asDays < 30) return Math.floor(asDays / 7) + "주전";
    else if (asDays < 365) return Math.floor(asDays * 30) + "달전";
    else return Math.floor(asDays * 365) + "년전";
};