//Functions
const pool = require('./db')
const queries = require ('./models/queries')
const jwt = require('./jwt')
const models = require ('./models/user')

//is needed here for cookies
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
app.use(cookieParser())

    
const addUser = (req, res) =>{
        if(req.body === null) {
           res.status(400).send('incorrect email')
        }
   
        //check if email exist
        models.checkEmailExist(req).then((results) => {
            if(results.rows.length) {
                res.send('E-mail already exists!')
            }
            //add user to db
            models.addUser(req).then((value) => {
                res.send('User Created succesfully!')
                console.log('User Created!')
            })
        }).catch(e=>console.log(e.message))
         
}    

const login = async (req, res) => {
    if(req.body === null) {
        res.status(400).send('incorrect email')
    }
    models.checkEmailExist(req)
    .then((results) => {
            if(results.rows.length) {
                const {name, email, role } = req.body

                //if there is a full array
                let token = jwt.setToken(name, role)
                let payload = jwt.getPayload(token)
                username = name
                res.cookie( 'access_token', token,{
                httpOnly: true,
                sameSite: 'lax'
                })
                //role
                res.cookie('role', role,{
                httpOnly: true,
                sameSite: 'lax'
                })
                //username
                res.cookie('username', username,{
                httpOnly: true,
                sameSite: 'lax'
                })
                console.log(req.cookies['username'])
                res.redirect('/dashboard') 
            } else {res.redirect('/login')}
            
    })
    .catch(e=>{
        console.log(e.message)
    })    
}        
    
const dashboard = (req, res) => {
    res.send(`Welcome ${req.userName}`)
}    

const update = (req, res) => {
    if(!req.userName) {
        return res.status(400).send('userName not passed')
    }
    if(!req.body.name) {
        return res.status(400).send('name not passed')
    }
    if(req.body.name === req.userName) {
        return res.status(409).send( 'name already registered')
    }
    //if names are different:
    
    models.updateUser(req)
    .then((results) => {     
        console.log('Update succesfully!')
        res.status(200).send('Update succesfully!')
    })
    .catch(e=>{
        console.log(e.message)
    })
}

const admin = (req, res) =>{
    const role = req.cookies['role']
    const name = req.cookies['username']
    const result = models.checkEmailExist(req)
    .then((results) => {
        if(role === 'admin' && result.rows.length) {
            res.send(`You are a ${role}! Welcome ${name}`)
        }
        res.status(404).send('Not Found')
    
    })
    .catch(e=>{
        console.log(e.message)
    })
}

const logout = (req, res) => {
    return res
    .clearCookie('access_token')
    .clearCookie('username')
    .clearCookie('role')
    .status(200)
    .json({ message: 'Successfully logged out'})
  }



module.exports = {
    addUser,
    login,
    dashboard,
    update,
    admin,
    logout,
}