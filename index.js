require("./db/db")
const shoplist=require('./modules/shop')
const servicelist = require('./modules/server')
const express = require('express')
const app = express()
app.use(express.static('public'))
app.listen(3000)

app.get('/shoplist',function (req,res) {
  shoplist.find({},function (err,list) {
    res.send({list:list})
  })
app.get('/serverlist',function (req,res) {
  servicelist.find({},function (err,list) {
    res.send({list:list})
  })
})
})

