const express=require('express')
const bodyParser=require('body-parser')

var server=express()
server.listen(8080)

server.use('/', (req, res, next) => {
  console.log('a')

  next()
});

server.use('/', (req, res, next) => {
  console.log('b')
})
