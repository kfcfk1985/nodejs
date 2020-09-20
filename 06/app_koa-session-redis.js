const koa = require('koa')
const app = new koa()
const session = require('koa-session')



const redis = require('redis')                              //nodejs 驱动 redis 的库 
const redisClient = redis.createClient(6379, 'localhost')   //创建redis客户端

const wrapper = require('co-redis')         //co-redis 用于对 redis库的函数进行promise 包装。原来的是回调函数的形式
const clientPromise = wrapper(redisClient)         

const redisStore = require('koa-redis')     //用来把 转换后的 redis 的promise接口 转换成 store 接口

app.keys = ['some secret'] //用于 koa.session 加密生成签名 koa.session.sig，可以放一个随机的字符串

const SESS_CONFIG = {
    key: 'koa.session', // 用于session 的key名，随便的，自己想设置啥就写啥
    maxAge: 8640000, // 有效期 ,8640000 就是一天
    httpOnly: true, // 仅服务器有效（即：不能通过JS读取）
    signed: true, // 签名，若为true，则保存在客户端中的cookie既有session(名字取决于key参数，若key为：koa.session)，又有签名(名字为：koa.session.sig)。
    //详细见《koa-session配置中signed参数的作用.xmind》                              

    
    store: redisStore({clientPromise}), //若屏蔽这个，ctx.session 的数据保存在内存中，指向的对象越多属性，生成的cookie就越大
    //若开启，ctx.session的数据保存在redis中，koa.session的内容由redis生成。cookie的大小跟ctx.session没关系

    secure: false, //不能设为true，否则http请求出错
}

app.use(session(SESS_CONFIG, app))

const user = {
    sid : "709394",
    name: "老王",
    address: "隔壁"
};

app.use(ctx => {

    if (ctx.path === '/favicon.ico') return
    console.log('ctx.session', ctx.session)

    // 查看redis
    redisClient.keys('*', (err, keys) => {
        console.log('\n\r')
        console.log('keys:', keys)
        keys.forEach(key => {
            redisClient.get(key, (err, val) => {
                console.log(val)
            })
        })
    })

    if(ctx.session.sid == undefined){           //首次登陆
        
        //ctx.session的数据保存在redis中，koa.session的内容由redis生成。
        ctx.session.sid = user.sid;                  //保存sid（sid先写死），session 会根据  ctx.session 中的内容生成
        ctx.session.name = user.name; 
        ctx.session.address = user.address; 
        ctx.body = "hello lao wang"
    }else{
       
        ctx.body = `${ctx.session.name} is coming`
    }
})
app.listen(3000)