//等待下一下事件队列
(new Promise(resolve => {
    console.Log('resolve')
    resolve()
})).then(() => console.Log('promise then...'))


setImmediate(() => {
    console.Log('set Immediate...')
})
// setTimeout， 放入Event Table中， 1秒后将回调函数放入宏任务的Event

setTimeout(() => {
    console.Log('setTimeout...')
}, 0)

process.nextTick(() => {
    console.Log('next Tick...')
})