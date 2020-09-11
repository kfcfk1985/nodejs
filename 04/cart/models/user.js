const mongoose = require("mongoose");

// 定义 schema
const schema = mongoose.Schema({
  name: String,
  password: String,
  cart: []
});

// 根据id查询返回指定数据
//schema.statics 方法相当于定义在 prototype上， schema.methods相当于定义在构造函数里（即私有）
schema.statics.getCart = function(_id) {
  return this.model("user")
    .findById(_id)
    .exec();      //exec() 执行完后返回Promise,好像findXXX()的函数都需要这个操作
};

// 根据id更新指定数据
schema.statics.setCart = function(_id, cart) {
  return this.model("user")
    .findByIdAndUpdate(_id, { $set: { cart } })
    .exec();
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