const express = require('express')
const { upload } = require('../../utils/upload.js')
const router = express.Router()
const controller = require('./controller.js')


router.post('/list',controller.list)
router.get('/list',controller.list)
router.post('/view',controller.view)
router.post('/write',controller.write)
router.post('/modify',controller.modify)
router.post('/delete',controller.delete)




// router.post('/write',upload.fields([{name:'upload'}]),(req,res)=>{
   
//     console.log(req.body)
//     res.status(200).json({ reqName: 'write', status: true })
// })



module.exports = router