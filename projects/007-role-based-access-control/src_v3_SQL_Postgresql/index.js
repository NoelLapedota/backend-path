require('dotenv').config()
const userRoutes = require('./routes')
const express = require('express')
const app = express()
// const {PORT} = require('./.env')
const cookieParser = require('cookie-parser')



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


 app.use('/', userRoutes)










app.listen(3000, () => console.log(`App listening on port correctly!`))  
