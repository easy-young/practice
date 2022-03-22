const axios = require('axios')


exports.Auth = async (req,res,next)=>{
    const {token} = req.cookies
    const body = {
        token,
    }

    const option = {
        'Content-type':'application/json'
    }
    const response = await axios.post('http://localhost:3000/api/auth',body,option)

    if(response.data === true){
        next()
    } else {
        res.render('token.html')
        //검증 안된애들
    }

}
