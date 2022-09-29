const express = require('express')
const app = express()
const port = 3001
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//I set the response to be sent to the home
app.get('/', (req, res) => res.send('Home!'))

//Route Params
app.get('/api/:date', (req, res) => {
 try{
    inputDate = req.params.date
    resObj = {}
    //if it has one of these features convert to obj
    if (inputDate.includes(" ") ||inputDate.includes(":") || inputDate.includes("-")){
        unixDate = Date.parse(inputDate)
        utcDate = new Date(inputDate).toUTCString()
        resObj = {
            unix : unixDate,
            utc : utcDate
        }
         res.json(resObj)
    }
    //a request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
    //The isNaN() function determines whether a value is NaN or not
    if (isNaN(inputDate) == false) {
        inputDate = parseInt(inputDate)
        utcDate = new Date(inputDate).toUTCString()
        resObj = {
            unix : inputDate,
            utc : utcDate
        }
        res.json(resObj)
    }
//If the input date string is invalid, the api returns an object having the structure { error : "Invalid Date" }    
}catch (err){
    res.json({
        error: "Invalid Date"
    })
}
   
})
// the /api/ route without parameters will return current time in unix and utc 
app.get('/api/', (req, res) => {
    res.json({
        "unix": Date.now(),
        "utc": new Date().toUTCString()
    })

})


