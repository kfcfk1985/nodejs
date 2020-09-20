const koa = require('koa')
const app = new koa()
const session = require('koa-session')

const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')

const wrapper = require('co-redis')
const client = wrapper(redisClient)

app.keys = ['some secret']          //用于session 加密，可以放一个随机的字符串

const SESS_CONFIG = {
    key: 'kkb:sess',                // 用于session的key名，随便的，自己想设置啥就写啥
    // maxAge: 8640000,                // 有效期 ,8640000 就是一天
    // httpOnly: true,                 // 仅服务器有效（即：不能通过JS读取）
    // signed: true,                   // 签名
    store: redisStore({ client })
}

app.use(session(SESS_CONFIG, app))

app.use(ctx => {
    // 查看redis
    redisClient.keys('*',(err,keys) => {
        console.log('\n\r')
        console.log('keys:',keys)
        keys.forEach(key => {
            redisClient.get(key, (err,val) => {
                console.log(val)
            })
        })
    })

    if (ctx.path === '/favicon.ico') return
    let n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = '第' + n + '次访问'
})
app.listen(3000)