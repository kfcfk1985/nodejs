const mysql = require("mysql");

// 连接配置
const cfg = {
  host: "localhost",
  user: "kfcfk1985", 
  password: "kfcfk851226",    // 修改为你的密码
  database: "myfamily"        // 请确保数据库存在
};

// 创建连接对象
const conn = mysql.createConnection(cfg);

// 查询 conn.query()
// 创建表
const CREATE_SQL = `CREATE TABLE IF NOT EXISTS people (
                    uid INT NOT NULL AUTO_INCREMENT,
                    name VARCHAR(45),
                    age VARCHAR(45),
                    PRIMARY KEY (uid))`;
const INSERT_SQL = `INSERT INTO people (uid,name,age) VALUES `;
const SELECT_SQL = `SELECT * FROM people`;


conn.query(CREATE_SQL, err => {
  if (err) {
    throw err;
  }
  // 插入数据
  conn.query(INSERT_SQL+"(null,'ldf',18)", (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    conn.query(SELECT_SQL, (err, results) => {
        console.log(JSON.stringify(results));
        conn.end(); // 若query语句有嵌套，则end需在此执行
    })
  });
});