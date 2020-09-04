


const mysql = require('mysql');

// 连接配置
const cfg = {
    host: "localhost",
    user: "kaikeba_admin", 
    password: "kfcfk851226", // 修改为你的密码
    database: "kaikeba" // 请确保数据库存在
  };
// 创建连接对象
const conn = mysql.createConnection(cfg);
console.log('conn',conn)
