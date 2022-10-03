const mongoose = require('mongoose')
//defining my schema
let urlSchema =  new mongoose.Schema({
  
  longUrl : String,
  short : String
  })
  module.exports = mongoose.model('Url', urlSchema);