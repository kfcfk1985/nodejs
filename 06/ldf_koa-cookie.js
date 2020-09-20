

const koa = require("koa")
const app = new koa();

app.keys = ['im a newer secret'];


app.use(ctx=>{
  
    if(ctx.cookies.get("sid")  == undefined){
        console.log("首次访问")
        ctx.cookies.set("sid","9394",{signed:true})
        ctx.cookies.set("name","tony",{signed:true})


        ctx.body = "hello koa"
    }else{
        ctx.body = "come agein"
    }
    
})

app.listen(3000)







