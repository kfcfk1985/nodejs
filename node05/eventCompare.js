//等待下一下事件队列
(new Promise(resolve => {
    console.log('resolve')
    resolve()
})).then(() => console.log('promise then...'))


console.log("hello world")

setImmediate(() => {
    console.log('set Immediate...')
})
// setTimeout， 放入Event Table中， 1秒后将回调函数放入宏任务的Event

setTimeout(() => {
    console.log('setTimeout...')
}, 0)

process.nextTick(() => {
    console.log('next Tick...')
})


//结果：
//node的不同版本对于异步执行(process.nextTick 和 promise)的先后顺序在策略上会有不同，建议不要纠结，根据业务适度了解吧。
/*
resolve
hello world
next Tick...
promise then...
setTimeout...
set Immediate...
 */