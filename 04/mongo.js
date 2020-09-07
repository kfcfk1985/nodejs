(async () => {
    const {MongoClient: MongoDB} = require('mongodb')

    
    const client = new MongoDB(                 // 创建客户端
        'mongodb://localhost:27017', {
            userNewUrlParser: true
        }
    )

    let ret;
    ret = await client.connect()                // 创建连接
    console.log('ret:', ret)

    const db = client.db('test')                //创建 test 数据库
    const fruits = db.collection('fruits')      //创建 fruits 表

    
    ret = await fruits.insertOne({              // 插入数据
        name: '芒果',
        price: 20.1
    })
    // console.log('插入成功', JSON.stringify(ret))

    
    ret = await fruits.findOne()                // 查询数据
    // console.log('查询文档:', ret)

    
    ret = await fruits.updateOne({              // 更新数据
        name: '芒果'
    }, {
        $set: {
            name: '苹果'
        }
    })
    // console.log('更新文档', JSON.stringify(ret.result))

    ret = await fruits.deleteOne({              // 输出文档
        name: '苹果'        
    })

    client.close()                              //断开连接
})()