const axios = require('axios')

exports.login = (req,res)=>{
    res.render('./user/login.html')
}

exports.kakaoLogin = (req,res)=>{
    res.render('./user/kakao_login.html')
}

exports.join = (req,res)=>{
    res.render('./user/join.html')
}

exports.profile = (req,res)=>{
    res.render('./user/profile.html')
}