exports.list = (req,res)=>{
    res.render('./board/list.html')
}

exports.view = (req, res) => {
    res.render('./board/view.html')
}

exports.write = async (req,res)=>{
    res.render('./board/write.html')
}

exports.modify = (req, res) => {
    res.render('./board/modify.html')
}