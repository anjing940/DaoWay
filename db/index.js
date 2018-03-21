// 连接数据库require

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/daoway')
mongoose.connection.on('open',function(err){
  if(!err){
    console.log('数据库连接成功')
  }
})

