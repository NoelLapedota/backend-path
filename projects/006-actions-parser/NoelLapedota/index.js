const express = require('express')
const app = express()
const port = 3000
const fetch = require("node-fetch");

//routing
app.use('/', require('./Routing/url'));
app.use('/api', require('./Routing/url'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))