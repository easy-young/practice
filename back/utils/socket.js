const webSocket = require('ws') // npm install ws

// socket.io 
let sockets = []
module.exports = (server) => {
    const wss = new webSocket.Server({ server })
    // const wss = new webSocket.Server({ port:3006 })
    // tab1 / tab2 
    wss.on('connection',(ws, req)=>{
        ws.id = req.headers['sec-websocket-key']
   
  

        sockets.push(ws)
        

     
      

        ws.on('close',()=>{
            console.log('고객이 도망쳤다!')
            sockets = sockets.filter(v=>{
                return ws.id !== v.id
            })
        })

        ws.on("message", (response)=>{           
            let obj = JSON.parse(response.toString('utf-8'))
     
            let {type,data} = obj
           
            switch(type){
                
                case 'welcom':
                    sockets.forEach( v => {    
                        console.log( 'welcom : ',obj.data)                 
                        v.nickname=data.nickname
                        if(data.nickname!==''){
                            console.log(data.nickname)
                            const msg =data.nickname +'님 환영합니다~'
                            v.send(msg)
                        }
                       
                    })
                break;




                case 'send_meg':
                    console.log(data)
                    sockets.forEach( v => {  
                        
                      
                        // `<li><span class="chat-nickname">${data.userid} </span><span class="chat-msg">${data.msg}</span> </li>`
                       let divClass=''
                       let msg=''
                        if(ws.id === v.id){
                            divClass='d-flex justify-content-end'
                            msg =`<div class="${divClass}"><span class="chat-msg">${data.msg}</span><span class="chat-nickname"> : ${data.nickname} </span></div>`
                        }else{
                            divClass='d-flex justify-content-start'
                            msg =`<div class="${divClass}"><span class="chat-nickname">${data.nickname} : </span><span class="chat-msg">${data.msg}</span></div>`
                        }

                        
                        v.send(msg)
                    })
                break;
               

                
                case 'private_meg':
                    const {targetNickname, msg, userid}=obj
                    // console.log(sockets)s
                    // console.log(obj)
                    const targetWs = sockets.filter(f=>f.nickname===targetNickname)
                    console.log(targetWs)
                    if(targetWs.length!==0){
                        targetWs[0].send(msg)
                    }
                break;


               
            }

            
        })
    })

   
}

// event 내용 

// on 듣기 
// send 말하기 

