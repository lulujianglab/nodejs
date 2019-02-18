const express=require('express')
const cookieParser=require('cookie-parser')

var server=express()

//cookie
server.use(cookieParser('wesdfw4r34tf'))

server.use('/', function (req, res){
  req.secret='wesdfw4r34tf' // 签名的秘钥,有了上面的’server.use(cookieParser('wesdfw4r34tf'));‘，这里的req.secret可以不写。因为cookie会自动传值给secret
  res.cookie('user', 'blue', {signed: true}) // 签名
  console.log('签名cookie：', req.signedCookies)
  console.log('无签名cookie：', req.cookies)

  res.send('ok')
})

server.listen(8080)
