const express = require('express')
const router = express.Router()
const jwt = require('./jwt')



// login & refresh 
router.post('/',(req,res)=>{
    if(req.body.username == "ciccio"){
        let token = jwt.setToken(2,req.body.username) //id , username
        let refresh = jwt.refresh(2, req.body.username)
        let payload = jwt.getPayload(token)
        res.json({token:token, payload:payload,refresh:refresh})
    }
    else{
        res.sendStatus(401)
    }
})


module.exports = router;

