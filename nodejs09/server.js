const express=require('express')

var server=express()
server.listen(8080)

//GET、POST
server.use('/', (req, res) => {
  console.log(req.query) //GET
})