const Koa = require("koa");
const app = new Koa();
// 响应时间输出中间件
app.use(async (ctx, next) => {
    await next();
    // 获取响应头，印证执行顺序
    const rt = ctx.response.get('X-Response-Time');//获取响应头的 X-Response-Time数值
    console.log(`输出计时：${ctx.method} ${ctx.url} - ${rt}`);
});
// 响应时间统计中间件
app.use(async (ctx, next) => {
    const start = Date.now();
    console.log('开始计时');
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);      //响应头增加  X-Response-Time: xx ms
    console.log('计时结束');
});

//创建一个睡眠函数
const sleep = time=>new Promise(resolve=>setTimeout(resolve,time));

// 响应
app.use(async ctx => {

    await sleep(2000);

    console.log('响应用户请求');
    ctx.status = 200; // 设置响应状态码
    ctx.type = 'html'; // 设置响应类型，等效于ctx.set('Content-Type','text/html')
    ctx.body = "<h1>Hello Koa</h1>"; //设置响应体
});
//开始监听端口，等同于http.createServer(app.callback()).listen(3000);
app.listen(3000);