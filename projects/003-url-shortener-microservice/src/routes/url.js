// const express = require('express')
// const router =  express.Router() // creating express route handler
// const validUrl = require('valid-url')
// const shortid = require('shortid')
// const url = require = ('./schema')  // import the Url database model


// // @route POST /api/url/shorten // @description Create short URL 
// // The API base Url endpoint
//  const baseUrl = 'http:localhost:3000'

//  router.post('/shorten ', async (req, res) => {
//     const {
//         longUrl   // look in Schema
//     } = req.body // destructure the longUrl from req.body.longUrl 
     
//     // check base url if valid using the validUrl.isUri method    
//     if (!validUrl.isUri(baseUrl)) {
//         return res.status(401).json('Invalid base URL')
//     }
//     // if valid, we create the url code     
//      const urlCode = shortid.generate()
    
//     //check long url
//     if (validUrl.isUri(longUrl)) {
//         try {
           
//             let url = await Url.findOne({
//                 longUrl
//             })
//             if (url) {
//                 res.json(url)
//             } else {
//                 const shortUrl = baseUrl + '/' + urlCode  // http:localhost:3000 + / + shortid.generate()
//                 url = new Url({
//                     longUrl,
//                     shortUrl
                    
//                 })
//                 console.log(url)
//                 await url.save()
//                 res.json(url)
//             }
//         }   
//         // exception handler         
//         catch (err) {
//             console.log(err)
//             res.status(500).json('Server Error')
//         }
//   }else {
//         res.status(401).json('Invalid longUrl')
//     }
// })    

// module.exports = router




