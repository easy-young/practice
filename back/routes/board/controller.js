const { pool } = require("../../db")



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
            // 'UPDATE boardData SET hit = ? WHERE idx = ?'
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
        // console.log(req.files)
        // console.log(req.body)
    //  { userid: 'admin', nickname: '임현우' }
        console.log(req.user)
        const { content , subject , main , sub } =req.body
        const filename= JSON.stringify(req.files)
        
            const queryStr=`INSERT INTO board(nickname,imageName,subject,content,hit,good,date,main,sub) VALUES('${req.user.nickname}','${filename}','${subject}','${content}',0,0,NOW(),'${main}','${sub}' );`
            pool.query(queryStr).then(()=>{
                res.status(200).json({ reqName: 'post_write', status: true})
            })


    } catch (error) {
    
        console.log(error)
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
     * console.log(responseData.findIndexUser) //-1 없음  << 좋아요 안한사람 
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
