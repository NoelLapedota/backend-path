const mongoose = require('mongoose')
let validator = require('validator')
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  email:{
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    
  },
    
  role:{
    type: String, 
    required: true
  },
  // validate: (value) => {
  //   return validator.isEmail(req.body.email)
  // }
})
//The first argument is the singular name of the collection
// your model is for. Mongoose automatically looks for the plural,
// lowercased version of your model name.
// Thus, for the example above, 
//the model User is for the users collection in the database.

const userModel = mongoose.model('user', userSchema)

module.exports = userModel