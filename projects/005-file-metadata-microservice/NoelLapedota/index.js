const express = require('express')
const app = express()
const port = 3000
const multer = require('multer')

// I use Diskstorage
const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
       cb(null, './images');
},
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    },
});
const upload = multer({storage:fileStorage});

app.post('/api/upload',upload.single('image'), (req, res)=>{
    console.log(req.file);
    res.send('single file upload success');
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))