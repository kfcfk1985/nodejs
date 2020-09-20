const http = require('http')
const userList = {}
let userInfo = { name: 'laowang' }
const sidKey = 'sid'

http.createServer((req, res) => {

    if (req.url === '/favicon.ico') {
        return
    } else {
        const cookie = req.headers.cookie
        if (cookie && cookie.indexOf(sidKey) > -1) {
           
            console.log('cookie:', req.headers.cookie)
            // 简略写法未必具有通用性
            const pattern = new RegExp(`${sidKey}=([^;]+);?\s*`)
            const sid = pattern.exec(cookie)[1]
            console.log('sid:', sid)

            res.end(`${userList[sid].name} Come Back`)
        } else {
            const sid = (Math.random() * 9999999).toFixed()
            res.setHeader('Set-Cookie', `${sidKey}=${sid}`)
            userList[sid] = userInfo;
            res.end('hello cookie')
        }
    }

}).listen(3000)