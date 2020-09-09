const conf = require("./conf");
const EventEmitter = require("events").EventEmitter;    //用下面的也可以
// const EventEmitter = require("events");             

// 客户端
const MongoClient = require("mongodb").MongoClient;

class Mongodb {
  constructor(conf) {
    this.conf = conf;                             // 保存conf
    this.emmiter = new EventEmitter();
    this.client = new MongoClient(conf.url, {     // 连接
      useNewUrlParser: true
    });

    //注意：构造函数里面也可以运行代码，
    //因为构造函数也是函数
    this.client.connect(err => {                
      if (err) throw err;
      console.log("连接成功");
      this.emmiter.emit("connect");
    });
  }

  col(colName, dbName = conf.dbName) { //在dbName数据库下创建/链接colName表
    return this.client.db(dbName).collection(colName);
  }

  once(event, cb) {
    this.emmiter.once(event, cb);
  }
}

module.exports = new Mongodb(conf);    // 2.导出db