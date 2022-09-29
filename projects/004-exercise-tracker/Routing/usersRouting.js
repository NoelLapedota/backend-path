const express = require('express');
const { status } = require('init');
const users = require('../NoelLapedota/users');
const router = express.Router();
const bodyParser = require('body-parser');




//The returned response from POST /api/users with form data username will be an object with username and _id properties.
router.post('/users',(req, res) =>{
  newUser = req.body

  
res.json({'name': newUser.username,'id' : newUser._id})
res.end()
});

//The GET request to /api/users returns an array-----
//there are two identical endpoins, the exercise was not clear----
//  router.get('/users', (req, res) =>{
//  res.status(200).json({data:user})
 
//  });

//Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.

router.get('/users', (req, res) =>{
    const usernameAnd_Id = user.map((users =>{
          const{username, _id} = users
          return {username, _id}
    }))
   res.json(usernameAnd_Id)
   
   });





module.exports = router;