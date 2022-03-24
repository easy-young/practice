const express = require('express')
const { upload } = require('../../utils/upload.js')
const router = express.Router()
const controller = require('./controller.js')
const { pool } = require("../../db")

router.post('/list',controller.list)
router.get('/list',controller.list)
router.post('/view/:idx',controller.view)

router.post('/modify',controller.modify)
router.post('/delete',controller.delete)
router.post('/good/:idx',controller.good)


router.post('/write',upload.array('upload'),(req,res)=>{
    try {
        const queryStr=`INSERT INTO board(nickname,imageName , subject , content,hit,good,date) VALUES('임현우','${JSON.stringify(req.files)}','${req.body.subject}','${req.body.content}',0,0,NOW() );`
      
      
        pool.query(queryStr).then((data)=>{
            console.log(data)
            res.status(200).json({ reqName: 'post_write', status: true})
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({ reqName: 'post_write', status: false })
    }
})


module.exports = router