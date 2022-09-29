const fetch = require("node-fetch");

const callFirstApi = (url)=>{
    return fetch(url)
   .then(res => res.json())
   .then(data =>{JSON.stringify(data)
    return data  
   })
 };


const callSecondApi = async (url)=>{
  console.log('url seconda api', url)
        let response = await fetch(url)
        let user = await response.json()
        return JSON.stringify(user)
    };
 module.exports = {
  callFirstApi,
  callSecondApi
 }