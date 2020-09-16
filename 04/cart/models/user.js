const mongoose = require("mongoose");

// 定义 schema
const schema = mongoose.Schema({
  name: String,
  password: String,
  cart: []  // 可以用 Array
});

// 根据id查询返回指定数据
//schema.statics 方法相当于定义在 model 的 prototype上， schema.methods 相当于定义在model的构造函数里（即私有）
//例子:
// schema.statics.aaa = function(){}
// schema.methods.bbb = function(){}
// const model = mongoose.model("user", schema)
// model.aaa()  可以正常调用
// model.bbb()   不能正常调用，必须 model 的实例才可以调用 bbb（） 
schema.statics.getCart = function(_id) {
  return this.model("user")
    .findById(_id)
    .exec();      //exec() 执行完后返回Promise,好像findXXX()的函数都需要这个操作
                  //2020-9-11实测，不用exec()也行的
};

// 根据id更新指定数据
schema.statics.setCart = function(_id, cart) {
  return this.model("user")
    .findByIdAndUpdate(_id, { $set: { cart } })
    .exec();    //2020-9-11实测，不用exec()也行的
};

const model = mongoose.model("user", schema);

// 测试数据
model.updateOne(
  { _id: "5c1a2dce951e9160f0d8573b" },
  { name: "jerry", cart: [{ pname: "iPhone", price: 666, count: 1 }] },
  { upsert: true },   // If set to true, creates a new document when no document matches the query criteria.
  (err, r) => {
    console.log('测试数据');
    console.log(err, r);
  }
);

module.exports = model;