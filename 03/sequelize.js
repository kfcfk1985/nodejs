(async () => {
    const Sequelize = require("sequelize");

    // 建立连接  
    const sequelize = new Sequelize(
        "kaikeba", //'database',
        "kfcfk1985", //'username', 
        "kfcfk851226", //'password'    
        {
            host: "localhost",
            dialect: "mysql",
            /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
            operatorsAliases: false
        });

    // 定义模型
    const Fruit = sequelize.define("Fruit", {
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                get() {
                    const fname = this.getDataValue("name");
                    const price = this.getDataValue("price");
                    const stock = this.getDataValue("stock");
                    return `${fname}(价格：￥${price} 库存：${stock}kg)`;
                }
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: {
                        msg: "价格字段请输入数字"
                    },
                    min: {
                        args: [0],
                        msg: "价格字段必须大于0"
                    }
                }
            },
            stock: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }
        },
        // 定义为模型选项
        {
            getterMethods: {
                amount() {
                    return this.getDataValue("stock") + "kg";
                }
            },
            setterMethods: {
                amount(val) {
                    const idx = val.indexOf('kg');
                    const v = val.slice(0, idx);
                    this.setDataValue('stock', v);
                }
            }
        }
    );


    // 同步数据库，force: true则会删除已存在表
    await Fruit.sync()

    await Fruit.create({
        name: "香蕉",
        price: 3.5
    });

    let fruits = await Fruit.findAll()

    // console.log(JSON.stringify(fruits, null, 2));

    //查询
    console.log(fruits[0].amount)


})()