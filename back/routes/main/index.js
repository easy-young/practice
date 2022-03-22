/**
 * main router
 */
const express = require('express')
const { db } = require('../../db')
const router = express.Router()


router.get('/',(req,res)=>{
    res.status(200).json({ reqName: 'main get', status: false })
})
router.post('/',(req,res)=>{
    try {
        db.promisePool.query('SELECT * FROM board').then((data)=>{
            console.log(data2)
            res.status(200).json({ reqName: 'main get', status: true, data:data[0] })
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({ reqName: 'main get', status: false })
    }
  
})

module.exports = router