function logout() {
    const logout = document.querySelector('#logout')
    logout.addEventListener('click', async (e)=>{
        e.preventDefault()

        const option = {
                'Content-type':'application/json',
                withCredentials:true,
        }

        const response = await axios.post('http://localhost:3000/user/logout',null,option)
        
        alert(`로그아웃 되었습니다!!!!`)
        location.href = 'http://localhost:3001'
    })
}