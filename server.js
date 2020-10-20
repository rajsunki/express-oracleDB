const express = require('express')
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
const { Pool, Client } = require('pg');
const BasicRoutes = require('./Routes/index');
const port = 3000;
app.use(express.json())
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/', BasicRoutes);


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
