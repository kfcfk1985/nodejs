const vip = require("../models/vip");

module.exports = async (ctx, next) => {
  if (ctx.accepts("html") === 'html') {       //发送的请求为  accepts:html
    ctx.state.vipCourses = await vip.find();
  }

  await next();
};