const {checkToken,getPayload} = require('./jwt')

// //jwt verify
const authorization = async (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
       return res.sendStatus(403)
    }
    data = checkToken (token)

    //Check if error is expired or invalid
    if (data === 'jwt expired'){
      //Return error for token validation
      return  res.status(401)
     .json({ success: false, message: 'Token invalid: '+ data }) 
    } 
     
    data = getPayload(token)
    req.userName = data.userName
    req.userRole = data.role
      
    return next()
 
}      




//check if the cookie is present
const checkAuthorization = (req, res, next) =>{
  try {
    const username = req.cookies['username']
    if (username){
    }next()
  } catch(err){
      console.log(err.message)
      res.sendstatus(401)
    }
}

module.exports = {
  authorization,
  checkAuthorization
}