const express = require('express')
const router = express.Router()
const url = require('./url')


// router.get()

  router.get("/:code", (req, res) => {
try {
    if(req.params ['code'] == url.short_url){
      res.redirect(url.original_url);
    }else{ res.json( { error: 'invalid url' })};
  
}catch (error) {
  console.error(error);
    }

    });
  //home with json
router.get('/', (req, res) => res.json(url));

module.exports = router;