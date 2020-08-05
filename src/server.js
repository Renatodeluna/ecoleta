const express = require("express")
const server = express()

// config public
server.use(express.static("public"))

// config rotes
// home
server.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) => {
  res.sendFile(__dirname + "/views/create-point.html")
})

server.get("/search-results", (req, res) => {
  res.sendFile(__dirname + "/views/search-results.html")
})

// start o server
server.listen(3000)
