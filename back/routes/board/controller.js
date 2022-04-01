const { pool } = require("../../db")
const {v4} =require('uuid')


exports.list = (req,res)=>{
    try {
        pool.query('SELECT * FROM board').then((data)=>{
            res.status(200).json({ reqName: 'board_list', status: true, data:data[0] })
        })
    } catch (error) {
        res.status(200).json({ reqName: 'board_list', status: false })
    }
}
 
exports.view = (req,res)=>{
    try {
        pool.query('SELECT * FROM board WHERE idx=?',req.params.idx).then((data)=>{
            const responseData= data[0][0]
           
            responseData.hit = responseData.hit+1

            // const rePlystr=`INSERT INTO reply(idx,content) VALUES('${idx}','${content}');`

            // pool.query(rePlystr).then(()=>{
            //     res.status(200).json({ reqName: 'post_reply', status: true})
            // })

            pool.query(`UPDATE board SET hit = '${responseData.hit}' WHERE idx = '${req.params.idx}'` ).then(()=>{
                res.status(200).json({ reqName: 'board_view', status: true, data:responseData })
            })
        })
    } catch (error) {
        res.status(200).json({ reqName: 'board_view', status: false })
    }
}

exports.write = (req,res,next)=>{

    try {
       
        const { content , subject , main , sub } =req.body
        const filename= JSON.stringify(req.files)
      
        if(req.user.isLogin){
            const queryStr=`INSERT INTO board(nickname,imageName,subject,content,hit,good,date,main,sub) VALUES('${req.user.nickname}','${filename}','${subject}','${content}',0,0,NOW(),'${main}','${sub}' );`
            pool.query(queryStr).then(()=>{
                res.status(200).json({ reqName: 'post_write', status: true})
            })
        }else{
            res.status(200).json({ reqName: 'post_write', status: false })
        }
            


    } catch (error) {
    
    
        res.status(200).json({ reqName: 'post_write', status: false })
    
    }
}

exports.modify = (req,res)=>{
    res.redirect('/')
}

exports.delete = (req,res)=>{

    try {
        const idx= req.params.idx
        pool.query(`DELETE FROM board WHERE idx=${idx}` ).then(()=>{
            res.status(200).json({ reqName: 'post_delete', status: true, })
        })
    } catch (error) {
        res.status(200).json({ reqName: 'post_delete', status: false })
    }
}


exports.good = (req,res)=>{

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
        pool.query('SELECT * FROM board WHERE idx=?',req.params.idx).then((data)=>{
            const responseData= data[0][0]
            responseData.good = responseData.good+1
            pool.query(`UPDATE board SET good = '${responseData.good}' WHERE idx = '${req.params.idx}'` ).then(()=>{
                res.status(200).json({ reqName: 'board_view', status: true, data:responseData })
            })
        })
    } catch (error) {
        res.status(200).json({ reqName: 'board_view', status: false })
    }
}

// 삭제 예정 이기능을 view 로 이관
exports.comment = (req,res)=>{
    try {
        pool.query('SELECT * FROM reply WHERE idx=?',req.params.idx).then((data)=>{
            const responseData= data[0]
            console.log(responseData)
            res.status(200).json({ reqName: 'board_comment', status: true, commentList:responseData })
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({ reqName: 'board_comment', status: false })
    }
}

exports.commentWrite = (req,res)=>{
    try {

        const idx =req.params.idx
        const { userid,nickname, comment } =req.body
      
        const uuid = v4()//f5d1a702-363d-41e2-b080-53becdcd4950
        if(req.user.isLogin){
            const queryStr=`INSERT INTO reply(idx,comment,uuid,nickname,userid,createdAt,updatedAt) VALUES('${idx}','${comment}','${uuid}','${nickname}','${userid}',NOW(),NOW() );`
            pool.query(queryStr).then(()=>{
                pool.query('SELECT * FROM reply WHERE idx=?',idx).then((data)=>{
                    const responseData= data[0]
                    res.status(200).json({ reqName: 'board_comment_write', status: true, commentList:responseData })
                })
            })
        }else{
            res.status(200).json({ reqName: 'board_comment_write', status: false })
        }

    } catch (error) {
        console.log(error)
        res.status(200).json({ reqName: 'board_comment_write', status: false })
    }
}



exports.commentUpdate = (req,res)=>{
    try {
        pool.query(`UPDATE reply SET comment = '${req.body.comment}', updatedAt=NOW() WHERE uuid = '${req.params.uuid}'` ).then(()=>{
            pool.query('SELECT * FROM reply WHERE uuid=?',req.params.uuid).then((data)=>{
                const responseData= data[0][0]
                res.status(200).json({ reqName: 'board_comment_write', status: true, comment:responseData })
            })
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({ reqName: 'board_comment_update', status: false })
    }
}

exports.commentDelete = (req,res)=>{
    try {
        const getUuid= req.params.uuid
        pool.query(`DELETE FROM reply WHERE uuid='${getUuid}'` ).then(()=>{
            res.status(200).json({ reqName: 'post_delete', status: true, })
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({ reqName: 'board_comment_delete', status: false })
    }
}