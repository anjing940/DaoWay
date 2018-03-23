//引入mongoose
const mongoose = require('mongoose');
//为数据进行Schema约束
const commetShcema = new mongoose.Schema({
  iconUrl:{type:String},
  area:{type:String},
  city:{type:String},
  comment:{type:String},
  createtime:{type:Number},
  nick:{type:String},
  star:{type:Number}
})
//文档构造函数名 ， 文档约束， database中的集合名
mongoose.model("commet",commetShcema,"commet")
//在集合中插入数据
mongoose.model('commet').create()
//向外暴露数据模型一个模块
module.exports = mongoose.model('commet',commetShcema)

