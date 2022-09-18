const fetch = require("node-fetch");

const callFirstApi = (url)=>{
    return fetch(url)
   .then(res => res.json())
   .then(data =>{JSON.stringify(data)
    return data  
   })
 };
 module.exports = callFirstApi