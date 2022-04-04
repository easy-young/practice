function chat() {
    const chatMsgBox = document.getElementById('chat-msg-box')
    const webSocket = new WebSocket('ws://localhost:3006')
    webSocket.onopen = () => {
        console.log('웹소켓 Connection 성공 ( Handshake )')
        let welcomMent = {
            type:'welcom',
            data:{
                nickname:'{{  userData.nickname  }}',
            }
        }
        webSocket.send(JSON.stringify(welcomMent))
    }

    webSocket.onclose = () => {
        console.log('웹소켓 disconnection')
    }
    
    const form = document.querySelector('form')
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
    
        const{ input } = e.target
        let data = {
            type:'send_meg',
            data:{
                nickname:'{{  userData.nickname  }}',
                msg:input.value
            }
        }
        
        webSocket.send(JSON.stringify(data))
        input.value = ''
        input.focus()
    })

    webSocket.onmessage = (event) => {
        const chat = document.querySelector('#chat')
        const liElement = document.createElement('li')
        liElement.classList=''
        liElement.innerHTML = event.data
        chat.appendChild(liElement)
        chatMsgBox.scrollTop = chatMsgBox.scrollHeight;
        console.log(event.data)
    }
}