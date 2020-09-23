const Router = require("koa-router");
const router = new Router({
  prefix: '/users'
});

router.get("/", async ctx => {
  console.log('user')
  // ctx.body = "users list";
  await ctx.render("users", {
    title: "用户列表",
    subTitle: "handlebars语法",
    isShow: true,
    username: "jerry",
    htmlStr: `<h3>abc</h3>`,
    users: [{
        username: "tom",
        age: 20,
        birth: new Date(1999, 2, 2)
      },
      {
        username: "jerry",
        age: 20,
        birth: new Date(1999, 3, 2)
      }
    ]
  });
});

router.post('/login', async ctx => {
  const {
    body
  } = ctx.request
  console.log('body', body)
  // 登录逻辑

  ctx.session.userinfo = body.username

  ctx.body = {
    ok: 1,
    message: '登录成功'
  }
})

router.post('/logout', async ctx => {
  delete ctx.session.userinfo
  ctx.body = {
    ok: 1,
    message: '退出系统'
  }
})


router.get('/getUser',
  require('../middleware/auth'),  //这个中间件的作用:客户端调用这个接口时，看看是否有权限。
  async ctx => {
    ctx.body = {
      ok: 1,
      message: '获取成功',
      userinfo: ctx.session.userinfo
    }
  })

// router.get('/getUser',async ctx => {
//   ctx.body = {
//     ok: 1,
//     message: '获取成功',
//     userinfo: ctx.session.userinfo
//   }
// })

const jwt = require('jsonwebtoken')   //用来生成token 的库
const jwtAuth = require('koa-jwt')    //用来进行token鉴权的中间件,主要的作用：
                                      //    1.它会验证token是否正确
                                      //    2.会把转换后的属性和值放到 ctx.state.user 中。（ctx.state主要用于中间件之间传值）
const secret = 'it is a'

router.post('/login-token', async ctx => {
  const {
    body
  } = ctx.request
  console.log('body:', body)

  //  数据库验证
  const userinfo = body.username
  ctx.body = {
    message: '登陆成功',
    user: userinfo,
    token: jwt.sign({
      data: userinfo,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }, secret)
  }
})

router.get('/getUser-token', jwtAuth({
  secret
}), async ctx => {
  console.log('state: ', ctx.state)
  ctx.body = {
    message: '获取数据成功',
    userinfo: ctx.state.user.data
  }
})



module.exports = router;