const connectDb = require('../db')
const express = require('express')
const app = express()
const Url =  require('./routes/redirect')
const port = 3000
const router = express.Router()



app.use(express.json({extended : false}));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// Define Routes
// app.use('/', require ('./routes/url'))
app.use('/api/url', Url)







