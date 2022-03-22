exports.admin = (req, res)=>{
    res.render('admin.html');
};

exports.user = (req, res)=>{
    res.render('admin/user.html');
};

exports.category = (req, res)=>{
    res.render('admin/category.html');
};

exports.board = (req, res)=>{
    res.render('admin/board.html');
};

exports.view = (req, res)=>{
    res.render('admin/board/view.html');
};

exports.stats = (req, res)=>{
    res.render('admin/stats.html');
};