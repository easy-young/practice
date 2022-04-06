exports.list = (req,res)=>{
    res.render('./board/list.html',{userData:req.cookies.userData})
}

exports.view = (req, res) => {
   
    res.render('./board/view.html',{userData:req.cookies.userData})
}

exports.write = async (req,res)=>{
    res.render('./board/write.html',{userData:req.cookies.userData})
}

exports.modify = (req, res) => {
    console.log('modify')
    res.render('./board/modify.html',{userData:req.cookies.userData})
}