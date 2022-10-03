const jwt = require('jsonwebtoken')

const options = {
    algorithm : "HS256",
    expiresIn : "1m"
}
// create
let setToken = (id, username) =>{
    let payload = {id:id, username:username}
    let token = jwt.sign(payload,'civè',options)
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
        jwt.verify(token, 'civè',options)
    }
    catch(err){
        console.log(err.message)
        res.sendstatus(401)

    }
   
}
//expire
let refresh = (id, username) =>{
    let payload = {id:id, username:username}
    let token = jwt.sign(payload,'civè',{algorithm : "HS256",expiresIn : "4h"})
    return token
}




module.exports = {
    setToken,
    getPayload,
    checkToken,
    refresh
}
