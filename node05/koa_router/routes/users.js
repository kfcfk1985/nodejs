// ./routes/users.js
const Router = require("koa-router");


const router = new Router({
  prefix: '/users'
});
router.get("/", ctx => {
  ctx.body = "users list";
});
module.exports = router;