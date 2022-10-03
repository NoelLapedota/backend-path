const jwt = require('./jwt')


const checkAut = (req,res,next)=>{
    tokeanAut = req.headers['authorization']
    if(tokeanAut == null){
       res.sendStatus(401)  
    }
    else{
        tokenAut = tokeanAut.slice(7,tokeanAut.length)
        //verify that all parameters are correct
         jwt.checkToken(tokeanAut)
        
    }
   next() 
}

module.exports = checkAut