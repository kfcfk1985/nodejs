function timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("1.time out is already")
            resolve("time out is already")
        }, 2000)
    })
}



//函数   run1() 定义时带上async，就相当于用 return new Promise((resolve, reject) => {}) 包了一层，
//在函数 run2() 调用 run1() 时不带上await，那么返回值就是一个Promise.需要用then才能获取到他的返回值。（返回值会被Promise.resolve()包装）
//在函数 run3() 调用 run1() 时带上await,那么返回值就是run1()的返回值
async function run1() {                 

    let ret = await timeout();
    console.log("2.ret = ", ret)

    return "i am run1"
}


async function run3() {
    let ret = await run1();
    console.log('3.ret is ',ret)
}


run3();
//2秒之后
//1.time out is already
//2.ret = time out is already
//3.i am run1
