exports.list = (req,res)=>{
    res.render('./board/list.html')
}

exports.view = (req,res)=>{
    res.render('./board/view.html',{idx:req.params.idx})
}

exports.write = (req,res)=>{
    console.log(req.cookies)
    res.render('./board/write.html')
}

exports.modify = (req,res)=>{
    res.render('./board/modify.html')
}