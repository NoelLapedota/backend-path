const express = require('express');
const { status } = require('init');
const users = require('../NoelLapedota/users');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');


//  You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.   
router.post('/:_id/exercises', (req, res) =>{
try {
    //find user
    bodyParser.urlencoded({ extended: false })
    const {_id} = req.params
    const User = users.find(element => element._id == _id)
    

    let user = req.body
    //check date
    if(user.date === ''){
        user.date= new Date().toISOString().substring(0, 10)
     }
    // new scheda
    const UserExercies = {
        username: User.username ,
        count: 0,
        _id: User._id,
        log: [{
          description: user.description ,
          duration: user.description,
          date: user.date
        }]
      }
    //count user's exercises  
    logLenght =  UserExercies.log
    UserExercies.count = logLenght.length
   
    const data = JSON.stringify(UserExercies)
    //write file
    fs.writeFile('exsercises.json', data, (err) => {
      if (err) {
          throw err;
      }
      console.log("JSON data is saved.");
  });
    res.status(200).json({success : true, date : exercises
     })
  } catch (error) {
      console.error(error + 'user not found');
    }
  });





module.exports = router;