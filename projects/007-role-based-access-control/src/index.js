const express = require('express')
const app = express()
const port = 3000
const {users, role} = require('./data')
const{
  accessId,
  accessRole,
  findUser
} = require('./access')


app.use(express.json())
app.use(findUser)


app.get('/data', (req, res) => {
  res.send('Home Page')
  })
  
app.get('/dashboard', accessId, (req, res) => {
    res.send('Dashboard Page')
  })
  
app.get('/admin', accessId, accessRole(role.admin),(req, res) => {
    res.send('Admin Page')
  })

// //user id




app.listen(port, () => console.log(`Example app listening on port ${port}!`))