require('dotenv').config()

const jwt = require('jsonwebtoken')

const options = {
    algorithm : "HS256",
    expiresIn : "10min"
}
// create
let setToken = (userName, role) =>{
    let payload = { userName, role}
    let token = jwt.sign(payload, process.env.PASSWORD_JWT, options)
    return token
}
// decode
const getPayload = (token)=> {
    let decode = jwt.decode(token, {complete : true})
    return decode.payload
}
// verify
const checkToken = (token)=>{
    try{
        data = jwt.verify(token, process.env.PASSWORD_JWT, options) 
    }
    catch(err){
         console.log(err.message)
         return err.message
    }
}

//expire
let refresh = ( userName, role) =>{
    let payload =  { userName, role}
    let token = jwt.sign(payload, process.env.PASSWORD_JWT, {algorithm : "HS256",expiresIn : "4h"}) 
}




module.exports = {
    setToken,
    getPayload,
    checkToken,
    refresh
}
