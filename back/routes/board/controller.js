exports.list = (req,res)=>{
    res.redirect('/')
}

exports.view = (req,res)=>{
    res.redirect('/')
}

exports.write = (req,res)=>{
    console.log(req.body.subject)
    res.send('샌드 ㄱㄱ') 
}

exports.modify = (req,res)=>{
    res.redirect('/')
}

exports.delete = (req,res)=>{
    res.redirect('/')
}