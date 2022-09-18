const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const users = require('../NoelLapedota/users');
const fs = require('fs');
var data=fs.readFileSync('exsercises.json', 'utf8')
const file = JSON.parse(data);


// 2 different solutions to read files and the way to search inside a json array

//GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
router.get('/:_id/logs' ,(req, res) =>{
    bodyParser.urlencoded({ extended: false })
    const {_id} = req.params
    //find ID inside exsercises
    for(i=0;i<file.length;++i)
    {
    if(file[i]._id==_id){
    res.send(file[i]);
    }
   }
   console.log("success");
   
  

    //asynchronous manner.
    // fs.readFile('exsercises.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         throw err;
    //     }
    // // parse JSON object
    // const user = JSON.parse(data.toString());

    // // print JSON object
    // console.log(user);
    // res.status(200).json({success : true, date : user})
    // });

//readFileSync
// let rawdata = fs.readFileSync('exsercises.json');
// let student = JSON.parse(rawdata);
// console.log(student);
});




module.exports = router;