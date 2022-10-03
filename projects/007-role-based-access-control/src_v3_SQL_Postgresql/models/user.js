const pool = require('../db')
const queries = require ('./queries')

const checkEmailExist = async (req) =>{
      const { email } = req.body
      return greeting = await pool.query(queries.checkEmailExist, [email])
   
}

const addUser = async (req)=>{
    const {name, email, role } = req.body
    return greeting = await pool.query(queries.addUser, [name, email, role])
}

const updateUser = async (req)=>{
    const newName = req.body.name
    return greeting = await pool.query(queries.updateUser, [newName, req.userName])
}


const checkRole = async (req)=>{
    const name = req.cookies['username']

    return greeting = await pool.query(queries.checkRole, ['admin', name])
}


module.exports = {
    checkEmailExist,
    addUser,
    updateUser,
    checkRole,
}