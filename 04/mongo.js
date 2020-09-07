(async () => {
    let dbs = {}; 

    /*引入mongoDB*/
    const MongoClient = require("mongodb").MongoClient;

    /*实例化一个客户端 */
    let client = new MongoClient(
        "mongodb://localhost:27017", {
            useNewUrlParser: true
        }

    )

    /**建立连接 */
    let ret = await client.connect();
    //  console.log("---->ret",JSON.stringify(ret,null,2))
    //  console.log("---->ret",(ret))

    /* 创建 example 数据库*/    
    dbs.exaplme = await client.db("eaxmple");

    /* 在 example 下创建 furits 表*/    
    dbs.exaplme.furits = await dbs.exaplme.collection('furits')

    /* 在 furits 表插入一条数据*/    
    ret = dbs.exaplme.furits.insertOne({
        name: '芒果',
        price: '10'
    })

    /*更新数据*/
    ret = await dbs.exaplme.furits.updateOne({ name: "芒果" }, { $set: { price: 19.8 } });

})()