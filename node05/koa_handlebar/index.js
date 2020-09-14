

const Koa = require("koa");
const app = new Koa();

const hbs = require('koa-hbs')
app.use(hbs.middleware({
    viewPath: __dirname + '/views',             //视图根目录
    defaultLayout: 'layout',                    //默认布局页面
    partialsPath: __dirname + '/views/partials',//注册partial目录
    disableCache: true                          //开发阶段不缓存
}));


const index = require('./routes/index');
const users = require('./routes/users');

app.use(index.routes());
app.use(users.routes());


app.listen(3000);