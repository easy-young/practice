const {createSignature} = require('../utils/jwt.js')

exports.Auth = (req,res,next) => {    
    try {
        const {token} = req.cookies
        // console.log('auth token!!!!',token)
        const [header,payload,sign] = token.split('.')
        const signature = createSignature(header,payload)

        if(sign !== signature) throw new Error('토큰 변조함 NaGa')
        const user = JSON.parse(Buffer.from(payload,'base64').toString('utf-8'))

        req.user = {
            ...user
        }
        // console.log('auth req.user',req.user)
        
    } catch (e){
        console.log(e.message)
    }

    next()
}