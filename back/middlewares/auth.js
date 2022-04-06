const {createSignature} = require('../utils/jwt.js');

exports.Auth = (req, res, next) => {

    try {

        const {token} = req.cookies;
   
        console.log('Auth : ',req._parsedUrl.path ,token)
        if (token !== undefined) {
            const [header,payload,sign] = token.split('.')
            const signature = createSignature(header,payload)
    
            if (sign !== signature) throw new Error('토큰 변조함 NaGa')
            const user = JSON.parse(Buffer.from(payload,'base64').toString('utf-8'))
            req.user = {
                ...user,
                isLogin:true
            }
        } else {
            req.user = {
                isLogin:false
            }
        }


  
        

    } catch (e){
        console.log(e.message)
    }

    next()


}