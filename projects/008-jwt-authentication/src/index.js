const express = require('express')
const app = express()
const port = 3000
const logIn = require('./logInRouting')
const checkAut = require('./midd') //it's midd

app.use(express.json())

app.use("/login",logIn)

app.get('/',checkAut, (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))