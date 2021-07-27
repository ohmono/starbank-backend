
const express = require("express")
const bodyParser = require("body-parser")

// create the server
const app = express()

// middleware for parse json
app.use(bodyParser.json())
// middleware for parse url encoded request bodys
app.use(bodyParser.urlencoded({ extended: true }));

// include the routes
const routes = require('./Router/router')
app.use('/', routes)

// start the server
app.listen(3000, () => {
    console.log("listening at port:3000")
})