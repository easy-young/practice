exports.list = (req, res) => {
    res.render('./board/list.html')
}

exports.view = (req, res) => {
    res.render('./board/view.html', { idx: req.params.idx })
}

exports.write = (req, res) => {
    const userData = req.cookies.userData  
    if(userData){
        res.render('./board/write.html', { userData: { userid: userData.userid, nickname: userData.nickname } })
    }else{
        res.render('./user/login.html',{pageName:'http://localhost:3001/board/write'})
    }
    
}

exports.modify = (req, res) => {
    res.render('./board/modify.html')
}


exports.chat = (req, res) => {
    const userData = req.cookies.userData
    if (userData) {
        res.render('./board/chat.html', { userData: { userid: userData.userid, nickname: userData.nickname } })
    } else {
        res.render('./user/login.html',{pageName:'http://localhost:3001/board/chat'})
    }
}