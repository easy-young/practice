const axios = require('axios')
const qs = require('qs')
const client_id = '6d7f627987ae4d88c11bd0bac17f3a52'
const redirect_uri = 'http://localhost:3001/user/oauth/kakao'
const host = 'https://kauth.kakao.com'
const client_secret = 'tmv3oBdGla9uOAwSSlJKQraK4Ukq0L1P'
const {createToken} = require('../../../back/utils/jwt.js')

exports.login = (req,res)=>{
    if(req.headers.cookie != undefined){
        res.redirect('/')
    } else {
        res.render('./user/login.html')
    }
}

exports.kakaoLogin = (req,res)=>{
    const redirectURI = host+`/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`
    res.redirect(redirectURI)
}

exports.oauthKakao = async (req,res)=>{
    const code = req.query.code
    const token_url = host+'/oauth/token'

    const body = qs.stringify({    
        grant_type:'authorization_code',
        client_id,
        redirect_uri,
        code,
        client_secret, 
    })

    const headers = {
        'Content-type':'application/x-www-form-urlencoded'
    }

    // 2. 토큰 받기 (여기가 진짜!)
    const response = await axios.post(token_url,body,headers)

    // 3. 토큰활용하여 사용자정보 가져오기
    try {
        const {access_token} = response.data
        const url = 'https://kapi.kakao.com/v2/user/me'
     
        const userinfo  = await axios.get(url,{
            headers:{
                'Authorization':`Bearer ${access_token}`
            }
        })
        const email = userinfo.data.kakao_account.email
        const nickname = userinfo.data.kakao_account.profile.nickname
        const userimage = userinfo.data.kakao_account.profile.profile_image_url
        // nickname,userimage
        // const result = {nickname,userimage,email}
        // const jwt = createToken({...result})
        
        // res.cookie('kakaoToken',jwt,{
        //     path:'/',
        //     httpOnly:true,
        //     secure:true,
        //     domain:'localhost',
        //     maxAge: 1000
        // })
        // const userData = req.cookies.kakaoToken
        const body1 = {
            nickname,
            email,
        }
        const option1 = {
            'Content-type':'application/json',
            withCredentials:true,
        }
        
        const response1 = await axios.post('http://localhost:3000/user/kakaoJoinAuth',body1,option1)
        if(response1.data.errno == 1){
            const tokenResult = {nickname,email}
            const jwt = createToken({...tokenResult})
                res.cookie('kakaoToken',jwt,{
                path:'/',
                httpOnly:true,
                secure:true,
                domain:'localhost'
            })
            res.render('main.html')

        } else{
            res.render('./user/kakao_join.html',{
                data:userinfo.data.kakao_account
            })
        }
    } catch (e) {
        console.log(e)
    }
}

exports.join = (req,res)=>{
    res.render('./user/join.html')
}

exports.kakaoJoin = (req,res)=>{
    res.render('./user/kakao_join.html')
}

exports.profile = (req,res)=>{
    res.render('./user/profile.html')
}

exports.kakaoProfile = (req,res)=>{
    res.render('./user/kakao_profile.html')
}

exports.profileUpdate = (req,res)=>{
    res.render('./user/profileUpdate.html')
}

exports.welcome = (req,res) => {
    res.render('./user/welcome')
}

exports.kakaoWelcome = (req,res) => {
    res.render('./user/kakao_welcome.html')
}