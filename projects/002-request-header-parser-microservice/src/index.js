const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))





let responseObj = {}
app.enable('trust proxy')
app.get('/api/whoami',(req, res) =>{
    
//A request to /api/whoami should return a JSON object with your IP address in the ipaddress key.
responseObj['ip'] = req.ip
//A request to /api/whoami should return a JSON object with your preferred language in the language key.

responseObj['language'] = req.get('Accept-language')
//A request to /api/whoami should return a JSON object with your software in the software key.

responseObj['software'] = req.get('User-Agent')

res.json({responseObj})
})