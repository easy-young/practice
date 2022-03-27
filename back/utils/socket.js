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
                    console.log(data)
                    sockets.forEach( v => {  
                        const msg =data.userid +'님 환영합니다~'
                         v.send(msg)
                    })
                break;




                case 'send_meg':
                    console.log(data)
                    sockets.forEach( v => {  
                        const msg =data.userid +':'+ data.msg
                         v.send(msg)
                    })
                break;
               
               
            }

            
        })
    })

   
}

// event 내용 

// on 듣기 
// send 말하기 

