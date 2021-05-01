var express = require('express')
var app = express()
var db = require('./dbConfig/db')
const user = require("./routes/user");
const newUser = require("./routes/users");
// const Directory = require('./models/model')
var bodyParser=require("body-parser")

app.use(bodyParser.json());

app.use(express.json());

app.use(express.static("public"))

app.use("/api/v1", user )
app.use("/api/v1", newUser );

app.use(
  express.urlencoded({
    extended: false
  })
);

app.listen('8080', console.log('listening'))