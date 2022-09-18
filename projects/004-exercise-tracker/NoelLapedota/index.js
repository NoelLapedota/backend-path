const express = require('express');
const app = express();
const routing = require('./routing');
const port = 3000
const bodyParser = require('body-parser');
const exercises = require('../Routing/exercisesRouting');
const logs = require('../Routing/logsRouting');

app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));


// Define Routes

app.use("/api" ,require('../Routing/usersRouting'));
app.use("/api/users" ,exercises);
app.use("/api/users" ,logs);







app.listen(port, () => console.log(`Example app listening on port ${port}!`));