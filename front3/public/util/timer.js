let go;
let cnt = parseInt(20*60);
let hour = 0;
let min = 0;
let sec = 0;

function counter_init() {
    go = setInterval(async ()=>{
        counter.innerHTML = time_format(cnt);
        cnt--;
        if (cnt <= 0) {
            clearInterval(go);
            const response = await axios.post('http://localhost:3001/admin/logout', null, option);
            location.href = 'http://localhost:3001/admin';
        }
    }, 1000);
}

function time_format(v) {
    if (v > 0) {
        min = parseInt(v/60);
        sec = v%60;
        if (min > 60) {
            hour = parseInt(min/60);
            min = min%60;
        }
    }
    if (sec < 10) sec = '0' + sec;
    if (min < 10) min = '0' + min;
    return min + ':' + sec;
}