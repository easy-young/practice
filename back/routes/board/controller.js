const { pool } = require("../../db");
const { v4 } = require("uuid");
const moment = require("moment");

exports.list = async (req, res) => {
  try {
    // 작성 날자를 기준으로 역순 으로 배열
    const [data] = await pool.query("SELECT * FROM board ORDER BY date DESC");
    const dataFormat = async (array) => {
      const posts = [];
      for (let i = 0; i < array.length; i++) {
        const post = array[i];
        const [tag] = await pool.query(`SELECT * FROM tag where idx=?`, [
          post.idx,
        ]);
        await posts.push({
          ...post,
          tag: tag,
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
    const [response] = await pool.query(
      `UPDATE board SET hit = ? WHERE idx = ?`,
      [data.hit + 1, idx]
    );
    const [tag] = await pool.query(`SELECT * FROM tag where idx=?`, [idx]);
    console.log(tag);
    res.json({
      reqName: "board_view",
      status: true,
      data: { ...data, tag: tag },
    });
  } catch (error) {
    res.status(500).json({
      reqName: "board_view",
      status: false,
    });
  }
};

exports.write = async (req, res, next) => {
  try {
    console.log(req.files);
    const { userid, nickname, isLogin } = req.user;
    if (isLogin) {
      const filename = JSON.stringify(req.files)==='{}'?'':JSON.stringify(req.files)
      const { content, subject, main, sub } = req.body;

      const queryStr = `INSERT INTO board(userid,nickname,imageName,subject,content,hit,good,date,main,sub) VALUES('${userid}','${nickname}','${filename}','${subject}','${content}',0,0,NOW(),'${main}','${sub}' );`;
      const [result] = await pool.query(queryStr);
      console.log(result.insertId);

      await getHashTag(content).then(async (arr) => {
        await arr.forEach(async (tag) => {
          await pool.query(
            `INSERT INTO tag (idx,tag) VALUES('${result.insertId}' , '${tag}')`
          );
        }); //
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

    let param = [subject, content, idx];

    const data = await pool.query(
      "UPDATE board SET subject=?, content=? WHERE idx =?",
      param
    );
    await pool.query("DELETE FROM tag WHERE idx=?", [idx]);

    await getHashTag(content).then(async (arr) => {
      await arr.forEach(async (tag) => {
        await pool.query(
          `INSERT INTO tag (idx,tag) VALUES('${idx}' , '${tag}')`
        );
      }); //
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
    const idx = req.params.idx;
    await pool.query("DELETE FROM reply WHERE idx=?", [idx]);
    await pool.query("DELETE FROM tag WHERE idx=?", [idx]);
    // 메인idx 값을 가지고 있는 보드를 삭제하기전 관련되어있는 태그와 댓글을 우선 삭제해야함.
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
    const [data] = await pool.query(
      "SELECT * FROM reply WHERE idx=?",
      req.params.idx
    );
    res.json({ reqName: "board_list", status: true, data });
  } catch (error) {
    res.status(200).json({ reqName: "board_list", status: false });
  }
};

exports.commentWrite = async (req, res) => {
  try {
    if (req.user.isLogin) {
      const idx = req.params.idx;
      const { userid, nickname } = req.user;
      const arr = [idx, req.body.comment, v4(), nickname, userid];
      const queryStr = `INSERT INTO reply(idx,comment,uuid,nickname,userid,createdAt,updatedAt) VALUES(?,?,?,?,?,NOW(),NOW() );`;
      await pool.query(queryStr, arr);
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
    const uuid = req.params.uuid;
    const { comment, idx } = req.body;

    await pool.query(
      `UPDATE reply SET comment = ?, updatedAt=NOW() WHERE uuid = ?`,
      [comment, uuid]
    );
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
    await pool.query(`DELETE FROM reply WHERE uuid=?`, [req.params.uuid]);
    await res.status(200).json({ reqName: "post_delete", status: true });
  } catch (error) {
    res.status(200).json({ reqName: "board_comment_delete", status: false });
  }
};

exports.good = async (req, res) => {
  try {
    console.log(req.user.userid);
    const data = await pool.query(
      "SELECT * FROM board WHERE idx=?",
      req.params.idx
    );
    const responseData = data[0][0];
    const goodUsers = data[0][0].goodUsers.split(","); //array
    const isGood =
      goodUsers.findIndex((f) => f === req.user.userid) === -1 ? false : true; //이미 굿을 눌렀다면 true 아니면 false
    if (isGood) {
      res
        .status(200)
        .json({
          reqName: "board_view",
          status: false,
          message: "이미 좋아요를 클릭하셨어요!",
        });
    } else {
      const goodUSersString = data[0][0].goodUsers + req.user.userid;
      responseData.good = responseData.good + 1;
      await pool.query(
        `UPDATE board SET goodUsers='${goodUSersString}' good = '${responseData.good}' WHERE idx = '${req.params.idx}'`
      );
      res.status(200).json({
        reqName: "board_view",
        status: true,
        data: responseData,
        goodUsers: data[0][0].goodUsers.split(","), //array
      });
    }
  } catch (error) {
    res.status(200).json({ reqName: "board_view", status: false });
  }
};

exports.search=async(req,res)=>{
  try {
    const { searchText ,type } = req.body;
    const dataFormat = async (array) => {
      const posts = [];
      for (let i = 0; i < array.length; i++) {
        const post = array[i];
        const [tag] = await pool.query(`SELECT * FROM tag where idx=?`, [
          post.idx,
        ]);
        await posts.push({
          ...post,
          tag: tag,
          date: await setDateChanger(post.date),
        });
      }
      return await posts;
    };

    if (searchText.length > 1) {
        if(type!=='tag'){
          const [response] = await pool
          .query(`SELECT * FROM board WHERE ${type} LIKE "%${searchText}%"`, [
            searchText,
          ])
          res.status(200).json({ reqName: "search", status: true, data:await dataFormat(response) });
        }else{
          const [tags] = await pool
          .query(`SELECT * FROM tag WHERE ${type} LIKE "%${searchText}%"`, [
            searchText,
          ])
          

          const setPost =async (tagData)=>{
            const posts=[]
            for (let i = 0; i < tagData.length; i++) {
              const s = tagData[i];
              const [[board]] = await pool
              .query(`SELECT * FROM board WHERE idx=?`, [
                s.idx
              ])
              posts.push(board)
            }
            return posts
          }

          res.status(200).json({ reqName: "search", status: true, data:await dataFormat(await setPost(tags)) });
        }

    


     
    } else {
      res.status(200).json({ reqName: "search", status: false ,message:'검색어는 최소 두글자 이상 검색이 가능합니다.' });
    }
   
  } catch (error) {
    res.status(200).json({ reqName: "search", status: false });
  }
}




/**
 * 문자열을 인자로 받음
 * 받은 문자열에서 # 을 기준을 배열처리 해줘야함
 * 처리된 문자열중 한칸을 띄운 글자중 첫번째 배열만 푸쉬하여 리턴함
 */
const getHashTag = async (str) => {
  const hashArrayOne = str.split("#");
  const hashArray = [];
  hashArrayOne.forEach((hasData, i) => {
    if (i !== 0) hashArray.push(hasData.split(" ")[0]);
    console.log(hasData);
  });
  console.log(hashArray);
  return hashArray;
};
/**
 * 시간을 인자로 받음
 * 받은 시간과 현재의 시간차이를 구함
 * 시간차이를 구분하여 한글로 n분,n초,n시간,n주,n달,n년전으로 나누어 리턴함
 */
const setDateChanger = async (time) => {
  const inTime = moment(time);
  var now = moment();
  const base = moment.duration(now.diff(inTime)); //
  const asSeconds = base.asSeconds();
  const asMinutes = base.asMinutes();
  const asHours = base.asHours();
  const asDays = base.asDays();
  if (asSeconds < 60) return "방금전";
  else if (asMinutes < 60) return Math.floor(asMinutes) + "분전";
  else if (asHours < 24) return Math.floor(asHours) + "시간전";
  else if (asDays < 7) return Math.floor(asDays) + "일전";
  else if (asDays < 30) return Math.floor(asDays / 7) + "주전";
  else if (asDays < 365) return Math.floor(asDays * 30) + "달전";
  else return Math.floor(asDays * 365) + "년전";
};