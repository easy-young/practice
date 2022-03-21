const { pool } = require("../../db")
const multer = require('multer')


exports.list = (req,res)=>{
    try {
        pool.query('SELECT * FROM board').then((data)=>{
            res.status(200).json({ reqName: 'main get', status: true, data:data[0] })
        })
    } catch (error) {
        res.status(200).json({ reqName: 'main get', status: false })
    }
}

exports.view = (req,res)=>{
    res.redirect('/')
}

exports.write = (req,res)=>{

    


    try {
        const content =req.body
        const user= req.headers.authorization
        
        console.log(content)
        res.status(200).json({ reqName: 'write', status: true })



        // pool.query('INSERT  ').then(()=>{            
        //     res.status(200).json({ reqName: 'write', status: true })
        // }).catch((err)=>{
        //     res.status(200).json({ reqName: 'main get', status: false,error:err,errorMessage:'query error!' })
        // })
    } catch (error) {
        res.status(200).json({ reqName: 'main get', status: false })
    }


}

exports.modify = (req,res)=>{
    res.redirect('/')
}

exports.delete = (req,res)=>{
    res.redirect('/')
}


