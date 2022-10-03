
const {users, role} = require('./data')


//access Id
accessId = (req, res, next)=>{
    if(req.user == null){
        res.status(403)
        return res.send('Sig in please')
    }
    next()
}
//access role
accessRole = (role) =>{
    return (req, res, next) => {
      if (req.user.role !== role) {
        res.status(401)
        console.log(req.header)
        return res.send('Not allowed')
      }
  
      next()
    }
}
  function findUser(req, res, next) {
    const userId = req.body.userId
    if (userId) {
      req.user = users.find(user => user.id === userId)
    }
    next()
  }

module.exports = {
    accessId,
    accessRole,
    findUser
}