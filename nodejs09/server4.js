const express=require('express')
const querystring=require('querystring')
const bodyParser=require('body-parser')

var server=express()
server.listen(8080)

/*
// 实现一个 bodyParser 中间件
server.use((req, res, next) => { // 针对所有的路径请求都接收
  var str=''
  req.on('data', (data) => {
    str+=data
  })
  req.on('end', () => {
    req.body=querystring.parse(str) // 字符串变json

    next()
  })
})
*/

server.use(bodyParser.urlencoded({}))

server.use('/', (req, res) => {
  console.log(req.body)
})
