const Koa = require("koa");
const app = new Koa();


//错误处理中间件
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        // 响应用户
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = error.message;
        // 触发应用层级错误事件
        ctx.app.emit("error", error, ctx);
        console.log('捕获到错误：', error.message);
    }
});


// 响应时间统计
//...
// 触发错误
app.use(async (ctx, next) => {
    // throw new Error('未知错误');
    ctx.throw(401, '认证失败')
});
// 响应
//...
//全局错误事件
app.on("error", err => {
    console.error("全局错误处理：", err.message);
});
//开始监听端口，等同于http.createServer(app.callback()).listen(3000);
app.listen(3000);