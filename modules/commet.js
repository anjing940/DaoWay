const mongoose = require('mongoose');
const commetShcema = new mongoose.Schema({
  iconUrl:{type:String},
  area:{type:String},
  city:{type:String},
  comment:{type:String},
  createtime:{type:Number},
  nick:{type:String},
  star:{type:Number}
})
mongoose.model("commet",commetShcema,"commet")

module.exports = mongoose.model('commet',commetShcema)

