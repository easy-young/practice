const axios = require('axios')

exports.list = (req,res)=>{
    const userData = req.cookies.userData
    res.render('./board/list.html',{userData: { userid: userData.userid, nickname: userData.nickname }} )
}

exports.view = (req, res) => {
    const userData = req.cookies.userData
    res.render('./board/view.html', { idx: req.params.idx,userData: { userid: userData.userid, nickname: userData.nickname }})
}

exports.privateChat = (req,res) =>{
    const userData = req.cookies.userData
    if (userData) {
        res.render('./board/private_chat',{nickname:req.params.nickname,userData: { userid: userData.userid, nickname: userData.nickname } })
    } else {
        res.render('./user/login.html',{pageName:'http://localhost:3001/board/private_chat'})
    }
}

exports.write = async (req,res)=>{
    const userData = req.cookies.userData
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
        res.render('./board/write.html',{userData: { userid: userData.userid, nickname: userData.nickname }})
    } else {
        res.redirect('/',{userData: { userid: userData.userid, nickname: userData.nickname }})
    }
    
}

exports.modify = (req, res) => {
    res.render('./board/modify.html')
}

