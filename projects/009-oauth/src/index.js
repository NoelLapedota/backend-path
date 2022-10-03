require('dotenv').config()
const fetch = (...args) => // I was having problems to import fetch module
import('node-fetch').then(({ default: fetch }) => fetch(...args));
const express = require('express')
const app = express()
const port = 3000

const client_id = process.env.GITHUB_CLIENT_ID

const client_secret = process.env.GHITHUB_CLIENT_SECRET


app.get('/', (req, res) => res.send('Hello World!'))

//1 - access to http://localhost:3000/login/github
//2- take a code line 65, it is in req
//3- first  fn
//4- second fn


//-----------------------------------------------------------------------------------------------
//exchange token for acces token
//fetch with method post
//first Fn
const getToken = async(code)=>{
let res = await fetch('https://github.com/login/oauth/access_token',{
  method: 'POST',
  headers:  {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({   // Parameters request
    client_id,
    client_secret,
    code //from line 66
  })
})
//manage the res
data = await res.text()
//use a costuctor for a query string
params = new URLSearchParams(data)
//return an spacific value
return params.get('access_token')

}
//-------------------------------------------------------------------------------------------------
//access the API
//Second Fn
const getGithubUser = async(access_token)=>{
  const req = await fetch('https://api.github.com/user', {
    headers:{
      Authorization: `bearer ${access_token}`
    }
  })
  const data =  await req.json()
  return data
} 
//-------------------------------------------------------------------------------------------------
app.get('/login/github',(req,res) => {
    const redirect_uri = 'http://localhost:3000/login/github/callback'
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`
    )
})
//Authorization callback URL
app.get ('/login/github/callback',async (req,res) => {
  code = req.query.code
  const token = await getToken(code)
  //use the access token to access the API
  getGithub = await getGithubUser(token)
  res.json({getGithub})
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))