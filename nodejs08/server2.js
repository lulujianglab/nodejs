const express=require('express')
const expressStatic=require('express-static')

var server=express()
server.listen(8080)

//用户数据
var users={
  'blue': '123456',
  'zhangsan': '654321',
  'lisi': '987987'
}

server.get('/login', (req, res) => {
  console.log('user',req.query)
  var user=req.query['user'] // 用户名
  var pass=req.query['pass'] // 密码

  if(users[user]==null){
    res.send({ok: false, msg: '此用户不存在'})
  }else{
    if(users[user]!=pass){
      res.send({ok: false, msg: '密码错了'})
    }else{
      res.send({ok: true, msg: '成功'})
    }
  }
})

server.use(expressStatic('./www'))
