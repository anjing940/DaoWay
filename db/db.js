//引入Mongoose
const mongoose = require('mongoose');
//创建daoway数据库并连接
mongoose.connect('mongodb://localhost:27017/daoway')
//监听连接的状态
mongoose.connection.on('open',function () {
  console.log('数据库已连接')
})