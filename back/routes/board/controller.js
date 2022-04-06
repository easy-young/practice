const { pool } = require("../../db");
const { v4 } = require("uuid");

exports.list = async (req, res) => {

    try{
        const [data] = await pool.query("SELECT * FROM board")
        res.json({ reqName: "board_list", status: true, data })
    } catch(error) {
        res.status(200).json({ reqName: "board_list", status: false });
    }

};

exports.getPost= async (req, res) => {
  try {
    const {idx} = req.params

      const [[data]] = await pool.query(`SELECT * FROM board where idx=?`,[idx])
      res.json({
                          reqName: "getPost",
                          status: true,
                          data: data,
                        })
  } catch(error) {
      res.status(500).json({
                          reqName: "getPost",
                          status: false,
                        })
  }
};


exports.view = async (req, res) => {
    try {
        const {idx} = req.params

        const [[data]] = await pool.query(`SELECT * FROM board where idx=?`,[idx])
        const [response] = await pool.query(`UPDATE board SET hit = ? WHERE idx = ?`,[data.hit+1,idx])

        res.json({
                            reqName: "board_view",
                            status: true,
                            data: data,
                          })
    } catch(error) {
        res.status(500).json({
                            reqName: "board_view",
                            status: false,
                          })
    }
};


// exports.write = async (req, res, next) => {
//     try {
//       console.log({...req.body, ...req.user})
//       const { content, subject, main, sub } = req.body;
//       const {userid, nickname} = req.user
//       const filename = JSON.stringify(req.files);
//       console.log(filename)
//       const arr= [userid,nickname ,filename, subject ,content,main, sub]
//       const queryStr = `INSERT INTO board(userid,nickname,imageName,subject,content,hit,good,date,main,sub) VALUES(?,?,?,?,0,0,NOW(),?,? );`;
//       const [result] = await pool.query(queryStr, arr);
//       await res.json({ reqName: "post_write", status: true, result });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ reqName: "post_write", status: false });
//     }
//   };


exports.write = async (req, res, next) => {
  try {
    console.log(req.files)
    const {userid, nickname , isLogin} = req.user
    if( isLogin){
      const filename = JSON.stringify(req.files)==='{}'?'':JSON.stringify(req.files)
      const { content, subject, main, sub } = req.body;
      const queryStr = `INSERT INTO board(userid,nickname,imageName,subject,content,hit,good,date,main,sub) VALUES('${userid}','${nickname}','${filename}','${subject}','${content}',0,0,NOW(),'${main}','${sub}' );`;
      const [result] = await pool.query(queryStr).then().catch(e=>console.log(e))
      res.json({ reqName: "post_write", status: true, result });
    }else{
      res.json({ reqName: "post_write", status: false, message:'login 유저만 글쓰기 가능' });
    }
 
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ reqName: "post_write", status: false });
  }
};

exports.modify = async(req, res) => {
  try {
      const {subject ,content,idx } = req.body
     
      let param = [subject ,content,idx]
    
      const data = await pool.query('UPDATE board SET subject=?, content=? WHERE idx =?',param)
     res.json({ reqName: "post_write", status: true,
      data:data 
    });
  } catch (error) {
    res.json({ reqName: "post_write", status: false,message:"query error",error:error });
  }
};

exports.delete = async (req, res) => {
    try {
        const idx = req.params.idx  
        await pool.query('DELETE FROM reply WHERE idx=?',[idx])
        await pool.query('DELETE FROM board WHERE idx=?',[idx])
        await res.json({  reqName: "post_delete", status: true })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            reqName: "post_delete", status: false })
    }
};




// 삭제 예정 이기능을 view 로 이관
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
      const arr=[idx,req.body.comment,v4(),nickname,userid]
      const queryStr = `INSERT INTO reply(idx,comment,uuid,nickname,userid,createdAt,updatedAt) VALUES(?,?,?,?,?,NOW(),NOW() );`;
      await pool.query(queryStr,arr);
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

exports.commentUpdate = async(req, res) => {
  try {
    const uuid =req.params.uuid
    const {comment , idx } =req.body

    await pool.query( `UPDATE reply SET comment = ?, updatedAt=NOW() WHERE uuid = ?`, [comment, uuid] )
    const data= await pool.query("SELECT * FROM reply WHERE idx=?", [idx])
    res.json({
        reqName: "board_comment_update",
        status: true,
        comment: data[0]
    });
  } catch (error) {
      res.json({ reqName: "board_comment_update", status: false });
  }
};

exports.commentDelete = async(req, res) => {
  try {
    await pool.query(`DELETE FROM reply WHERE uuid=?`,[req.params.uuid])
    await res.status(200).json({ reqName: "post_delete", status: true });
  } catch (error) {
    res.status(200).json({ reqName: "board_comment_delete", status: false });
  }
};




exports.good = (req, res) => {
    /**
       * good 구현
       * good 클릭 유저의 목록을 board 내 column으로 array  
       * 
       * 
       * 
       * const findIndexUser 유저 데이터를 배열로 만들어주고 = >>  responseData.goodUsers // 리스폰스데이터에서 좋아요누른유저를.findIndex((f)=>f===userid) // 
     
       * 
       * [임현우,오승주,이지영] 
       * 
       * if(responseData.findIndexUser === -1){
       *   좋아요 안한사람 = -1 
       * responseData.goodUsers.push(userid)
       * responseData.good = responseData.good+1
       *  } 
       */
    // hit
    try {
      pool
        .query("SELECT * FROM board WHERE idx=?", req.params.idx)
        .then((data) => {
          const responseData = data[0][0];
          responseData.good = responseData.good + 1;
          pool
            .query(
              `UPDATE board SET good = '${responseData.good}' WHERE idx = '${req.params.idx}'`
            )
            .then(() => {
              res
                .status(200)
                .json({
                  reqName: "board_view",
                  status: true,
                  data: responseData,
                });
            });
        });
    } catch (error) {
      res.status(200).json({ reqName: "board_view", status: false });
    }
  };