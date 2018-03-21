const mongoose = require('mongoose')
const shopSchema = new mongoose.Schema({
  serviceIndex:{type:String},
  serviceType:{type:Array},
  shopList:{type:Array}
  },{
  collection:"shoplist"
})
modules.exports = mongoose.model(shopSchema)