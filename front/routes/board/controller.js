const axios = require('axios')

exports.list = (req,res)=>{
    res.render('./board/list.html')
}

exports.view = (req,res)=>{
    res.render('./board/view.html',{idx:req.params.idx})
}

exports.write = async (req,res)=>{
    const cookie = req.headers.cookie
    const body = {
        cookie,
    }

    const option = {
        'Content-type':'application/json',
        withCredentials:true,
    }
    
    const response = await axios.post('http://localhost:3000/user/auth',body,option)
    if(response.data.errno === 0){
        res.render('./board/write.html')
    } else {
        res.redirect('/')
    }
    
}

exports.modify = (req,res)=>{
    res.render('./board/modify.html')
}