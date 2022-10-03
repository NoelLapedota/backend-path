const express = require('express');
const app = express();
const router = express.Router();
const url = require('./url');
const routing = ('./routing');
const port = 3000


// Define Routes
app.use("/", require('./routing'));

app.use("/api/shorturl/", require('./routing'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));