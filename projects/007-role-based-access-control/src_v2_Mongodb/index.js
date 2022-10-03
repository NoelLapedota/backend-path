require('dotenv').config()
const express = require('express')
const app = express()
const {authorization,checkAuthorization} = require('./access_midd')
const jwt = require('./jwt')
const cookieParser = require("cookie-parser")
// connection to the mongodb database
const mongoose = require('mongoose')
const {MongoClient} = require('mongodb'); //class
const userModel = require('./schema')

const mongoClient = new MongoClient(process.env.URI); //instance


//moongoose connection
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})

//Get the default connection
var datab = mongoose.connection
console.log('you are connected on Db')
//Bind connection to error event (to get notification of connection errors)
datab.on('error', console.error.bind(console, 'MongoDB connection error:'))
//-------------------------------------------------------------------------------------------

//mongoDb connection
// async function run(){
//     await mongoClient.connect();   // return a promis so I use await
//     console.log('you are connected on Db')
//     dataDb = mongoClient.db('data')
//     role = dataDb.collection('role')
// }run().catch(e =>console.log('Unable connect on Database' + e))
//------------------------------------------------------------------------------------------

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

//Routes
app.post('/sigin', async  (req, res) => {
  if(req.body === null){
     res.status(400).send('incorrect email')
     const email = req.body.email
     const onDb = await userModel.findOne({email: email})
  }if (onDb) {
     res.status(409).send('e-mail already registered')
  }else{     
    const newUser = req.body
    const _user =  new userModel({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    })
    _user.save()
    .then(doc => {
      console.log(doc)
    })
    .catch(err => {
      console.error(err)
    })
    res.send('user registered successfully')
    // res.redirect('/login')
  
 }
})



app.post('/login', async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email })
  if(user) {  
    let token = jwt.setToken(req.body.name, req.body.role)
    let payload = jwt.getPayload(token)
    username = req.body.name
    res.cookie( 'access_token', token,{
      httpOnly: true,
      sameSite: 'lax'
      // secure: 'ciao'//process.env.PASSWORD_COOKIE
    })
    //username
    res.cookie('username', username,{
      httpOnly: true,
      sameSite: 'lax'
    })
    console.log(await req.cookies['username'])
    res.redirect('/dashboard') 
  } else {
    res.redirect('/sigin')
  }
})
   
  
app.get('/dashboard', authorization, (req, res) => {
    res.send(`Welcome ${req.userName}`)
})
  
app.get('/admin', authorization, checkAuthorization, (req, res) => {
    res.send('Admin Page')
})


app.put('/update', authorization, async  (req, res) => {
    if(!req.userName) {
      return res.status(400).send('userName not passed')
    }
    if(!req.body.name) {
      return res.status(400).send('name not passed')
    }
    //Find  name on Db using cookie
    const user = await userModel.findOne({name: req.userName})
    const name = req.body.name
    if(user === name){
      return res.status(409).send( 'name already registered')
    //if names are different:
    
    await userModel.updateOne(
      {name:'Pippo'},
      {'$set':{name: name}
    })  
    .then((docChange)=>{console.log('Number of successful changes:', docChange.modifiedCount)})
    .catch(function(err){ console.log(err)})}
    
    const userChange = await userModel.findOne({name: name})
    return res.status(200).json({
      "status": "success",
      "data" : userChange
    })

})
  
app.get('/logout', authorization, checkAuthorization,(req, res) => {
  return res
  .clearCookie('access_token')
  .clearCookie('username')
  .status(200)
  .json({ message: 'Successfully logged out'});
})
  





app.listen(process.env.PORT, () => console.log(`App listening on port correctly!`))  

module.exports = mongoClient
