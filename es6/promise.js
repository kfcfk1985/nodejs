

/*88888888888888888888888888888888*/


// let atOnce = new Promise((resolve,reject)=>{
//     console.log('promise')
//     resolve();

// })

// atOnce.then(data=>{
//     console.log('atOnce')
// })

// console.log('hi')

//运行结果：
// promise
// hi
// atOnce

/*88888888888888888888888888888888*/


// (()=>{
//     function timeOut(ms){
//         return new Promise((resolve,reject)=>{
//             setTimeout(resolve,ms,'done')
//         })
//     }
    
//     timeOut(2000).then((data)=>{
//         console.log(data)
//     })
// })()




