//引入数据库进行连接数据库
require("./db/db")
//引入插入到数据库中的数据
const shoplist=require('./modules/shop')
const servicelist = require('./modules/server')
const commetlist = require('./modules/commet')
//引入服务器
const express = require('express')
//为app配置路由器
const app = express()
//使用静态资源
app.use(express.static('public'))
//监听端口号
app.listen(3000)

//配置路由
app.get('/shoplist',function (req,res) {
  shoplist.find({},function (err,list) {
    res.send({list:list})

  })
});
servicelist.find({},function (err,list) {
  console.log({list:list})//返回一个封装的list对象

})
app.get('/serverlist',function (req,res) {
  servicelist.find({},function (err,list) {
    res.send({list:list})
  })
});

app.get('/commetlist',function (req,res) {

  const page = req.query.page
  //limit:每次返回10条数据，skip:每次跳过的数据*每次返回的数据
  commetlist.find({}).limit(10).skip((page-1)*10).exec(function (err,list) {
      res.send({list:list})
  })
})




