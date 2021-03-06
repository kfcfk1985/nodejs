const koa = require('koa')
const app = new koa()
const session = require('koa-session')


app.keys = ['some secret']          //用于 koa.session 加密生成签名 koa.session.sig，可以放一个随机的字符串

const SESS_CONFIG = {
    key: 'koa.session',                // 用于session 的key名，随便的，自己想设置啥就写啥
    maxAge: 8640000,                // 有效期 ,8640000 就是一天
    httpOnly: true,                 // 仅服务器有效（即：不能通过JS读取）
    signed: true,                   // 签名，若为true，则保存在客户端中的cookie既有session(名字取决于key参数，若key为：koa.session)，又有签名(名字为：koa.session.sig)。
                                    //详细见《koa-session配置中signed参数的作用.xmind》                              

    //store: redisStore({ client }),  //若屏蔽这个，ctx.session 的数据保存在cookie中（koa.session的内容就是数据转后的结果），指向的对象越多属性，生成的cookie就越大
                                      //若开启，ctx.session的数据保存在redis中，koa.session的内容由redis生成。

    secure: false,                  //不能设为true，否则http请求出错
}

app.use(session(SESS_CONFIG, app))

const userList = {};
let sid = "709394";
app.use(ctx => {
  
    if (ctx.path === '/favicon.ico') return
    console.log('ctx.session',ctx.session)

    if(ctx.session.sid == undefined){           //首次登陆
        //ctx.session 指向的对象越多属性，生成的cookie就越大
        ctx.session.sid = sid;                  //保存sid（sid先写死），session 会根据  ctx.session 中的内容生成
        userList[sid] = {name:"老王",address:"隔壁"};
        ctx.body = "hello lao wang"
    }else{
        let user = userList[ctx.session.sid];
        ctx.body = `${user.name} is coming`
    }
})
app.listen(3000)