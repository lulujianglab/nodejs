# 接收 ajax 数据请求

前台对后台的请求有两种，一种是对文件的访问，一种是对接口的访问

1. 对文件的访问
http://localhost:8080/1.html
http://localhost:8080/ajax.js
http://localhost:8080/1.jpg

2. 对接口的访问
http://localhost:8080/user?act=xx...
http://localhost:8080/news?act=xxx...

接口类似

```
/user?act=reg&user=aaa&pass=123456
{"ok": false, "msg": "原因"}

/user?act=login&user=aaa&pass=123456
{"ok": true, "msg": "原因"}
```

# 用户注册、登录

```js
const http=require('http')
const fs=require('fs')
const querystring=require('querystring')
const urlLib=require('url')

var users={} // 模拟数据库存用户数据

var server=http.createServer(function (req, res){
  // 解析数据
  var str=''
  req.on('data', function (data){
    str+=data
  })
  req.on('end', function (){
    var obj=urlLib.parse(req.url, true)

    const url=obj.pathname
    const GET=obj.query
    const POST=querystring.parse(str)

    // 区分——接口、文件
    if(url=='/user'){ // 接口
      switch(GET.act){
        case 'reg':
          // 1. 检查用户名是否已经有了
          if(users[GET.user]){
            res.write('{"ok": false, "msg": "此用户已存在"}')
          }else{
            // 2. 插入users
            users[GET.user]=GET.pass
            res.write('{"ok": true, "msg": "注册成功"}')
          }
          break
        case 'login':
          // 1. 检查用户是否存在
          if(users[GET.user]==null){
            res.write('{"ok": false, "msg": "此用户不存在"}')
          // 2. 检查用户密码
          }else if(users[GET.user]!=GET.pass){
            res.write('{"ok": false, "msg": "用户名或密码有误"}')
          }else{
            res.write('{"ok": true, "msg": "登录成功"}')
          }
          break
        default:
          res.write('{"ok": false, "msg": "未知的act"}')
      }
      res.end()
    }else{ // 文件
      // 读取文件
      var file_name='./www'+url
      fs.readFile(file_name, function (err, data){
        if(err){
          res.write('404')
        }else{
          res.write(data)
        }
        res.end()
      })
    }
  })
})

server.listen(8080)
```

在终端启动 `node server.js` ,在浏览器端输入 `http://localhost:8080/user.html` ,输入用户名和密码，点击注册和登录后台就可以接收到请求并作出反馈了