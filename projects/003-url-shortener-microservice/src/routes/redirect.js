const express = require('express')
const router = express.Router()
const validUrl = require("valid-url");
const shortId = require("shortid");
const Url = require('../schema') // import the Url database model
const connectDb = require('../db')

// @route   POST /shorten
// @desc    Create short URL
const baseUrl = 'http:localhost:3000'

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  //  res.send(req.body)

//   // check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json({ message: "Invalid base url" });
  }

  // create url code
  const urlCode = shortId.generate();
   
  // check long url
  if (validUrl.isUri(longUrl)) {
    try {
      //returns the first url it finds in the database
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.status(201);
        res.json({ data: url });
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        

        url = {
          longUrl,
          shortUrl,
        
        };

        detail.create(url, function(err, result) {
          if (err) {
            res.send(err);
          } else {
            console.log(result);
            res.send(result);
        }});
      


        // await url.save();




        
        res.status(201).json({ data: url });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Some error has occurred" });
    }
  } else {
    res.status(400).json({ message: "Invalid long url" });
  }
});

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else { 
      return res.status(404).json({ message: "No url found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Some error has occurred" });
  }
});

module.exports = router;








