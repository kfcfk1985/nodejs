(async () => {
    const mysql = require('mysql2/promise')

    // 连接配置
    const cfg = {
        host: "localhost",
        user: "kfcfk1985", 
        password: "kfcfk851226",    // 修改为你的密码
        database: "myfamily"        // 请确保数据库存在
    }

    const connection = await mysql.createConnection(cfg)

    let ret = await connection.execute(`
        CREATE TABLE IF NOT EXISTS ldf_son (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(45) NULL,
        PRIMARY KEY (id))
    `)
    console.log('create', ret)

    ret = await connection.execute(`
            INSERT INTO ldf_son(name)
            VALUES(?)
    `, ['liang jin xi'])
    console.log('insert:', ret)


    ret = await connection.execute(`
            SELECT * FROM ldf_son
    `)
    console.log(JSON.stringify(ret[0]))
    // console.log(ret[1])

    connection.end()

})()    