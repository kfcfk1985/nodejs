const session = require('koa-session');
const koa = require("koa")
const app = new koa();

const redis = require("redis")
const redisClient = redis.createClient();

redisClient.on("error", function (err) {
    console.log("redis 发出到错误", err)
});

const wrapper = require("co-redis")
const clientPromise = wrapper(redisClient)

const redisStore = require("koa-redis");


app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa.sess',
    /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true,
    /** (boolean) automatically commit headers (default true) */
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    signed: true,
    /** (boolean) signed or not (default true) */
    rolling: false,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false,
    /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    secure: false,
    /** (boolean) secure cookie*/
    sameSite: null,
    /** (string) session cookie sameSite options (default null, don't set it) */


    store: redisStore({clientPromise})
};


app.use(session(CONFIG, app));
app.use(ctx => {

    // ignore favicon
    if (ctx.path === '/favicon.ico') return;

    redisClient.keys("*", (err, keys) => {
        console.log("\n\rkeys", keys)

        keys.forEach(key => {
            redisClient.get(key, (err, ret) => {
                console.log(`${key}  :  ${ret}`)
            })
        })
    })

    if (ctx.session.sid == undefined) {
        console.log("首次访问")
        ctx.session.sid = "709394"
        ctx.body = "hello koa"
    } else {
        console.log("在次访问")

        ctx.body = "come agein"
    }

})

app.listen(3000)