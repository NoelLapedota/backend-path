const express = require('express');
const router = express.Router();
const fs = require('fs');
const fetch = require("node-fetch");
const validUrl = require('valid-url');
const callFirstApi = require('./func');
const callSecondApi = require('./func');


//GET
router.get('/location',(req, res)=>{

  //read file json
  fs.readFile('../sunset.json', 'utf-8', (err, file) => {
    if (err) {
      throw err;
    }
    // parse JSON object 
    const user = JSON.parse(file.toString());

    //rapid contoll & call api
    let url = user['actions'][0]['options']['url'];
    if(validUrl.isUri(url)){
      callFirstApi(url)
        .then((location) => {
          let url = user['actions'][1]['options']['url'];
          url = url.replace('{{location.latitude}}', location.latitude)
          url = url.replace('{{location.longitude}}', location.longitude)
          callSecondApi(url)
            //print
            .then((data) =>{
              // let sunset = JSON.parse(data)
              // let template = user['actions'][2]['options']['message'];
              // template = template.replace('{{location.city}}', location.city);
              // template = template.replace('{{location.country}}', location.country);
              // template = template.replace('{{sunset.results.sunrise}}', sunset);
              // console.log(sunset)
              // console.log((`Sunset in ${location.city}, ${location.country} is at ${sunset.results.sunrise}.`))
            }) 
            .catch(e => {
              console.log('Error with fetch operation' + e.message)
            })
        })}else {
          console.log('Not a URI')}
       })
         res.end();
    });

    //Functions
      // const callFirstApi = (url)=>{
      //        return fetch(url)
      //       .then(res => res.json())
      //       .then(data =>{JSON.stringify(data)
      //        return data  
      //       })
      //     };

    
            
      
      
     

      

module.exports = router, callFirstApi