var koa = require('koa');
var Router = require('koa-router');
var app = new koa();
const router = new Router();

router.get('/not_found', printErrorMessage);
router.get('/hello', printHelloMessage);

app.use(router.routes());
app.use(handle404Errors);

function printErrorMessage(ctx,next) {
    ctx.status = 404;
    ctx.body = "Sorry we do not have this resource.";
}

function printHelloMessage(ctx,next) {
    ctx.status = 200;
    ctx.body = "Hey there!";
}

function handle404Errors(ctx,next) {
    if (404 != ctx.status) return;
    ctx.redirect('/not_found');
}
app.listen(3000);