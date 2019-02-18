# express 框架

1. 安装
```sh
npm i express
```
2. 配置
3. 接收请求：`get/post/use`
```js
get('/地址', (req, res) => {})
```
4. 响应

## 非破坏式的

也称为非侵入式封装，在原有方法的基础上增加新的方法，比如

原生：
```js
res.write()
res.end()
```

express:
```js
res.send()
res.write()
res.end()
```

`express` 保留了原生的功能，添加了一些方法（ `send` ）,增强了原有的功能

增强版的 `res.send()`,不止可以发送字符串

## 步骤

1. 创建服务

```js
var server = express()
```

2. 监听

```js
server.listen(8080)
```

3. 处理请求

```js
server.use("地址", (req, res) => {

})
```

3种接收用户请求的方法, `.use()` 能接收所有的请求方式

```js
.get("/", function (req,res){})
.post("/", function (req,res){})
.user("/", function (req,res){})
```

## 依赖中间件

比如读取静态文件

```js
server.get('/login', (req, res) => {

})

server.use(expressStatic('./www'))
```

来服务器获取 `get` `/login`, 只要没有 `get` 到，就被认为是静态的

运行 `localhost:8080/a.html` ，能读取到 `www` 文件夹下的 `a.html` 页面内容

## static 用法

```sh
cnpm i express-static
```

```js
const static = require('express-static')
server.user(static('./www'))
```

# 实践

```js
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
```

注意这里在浏览器端加载 `.html` 页面时，不能直接输入静态地址 `file:///Users/jianglu/code/github/nodejs/node9/www/a.html`,会出现跨域的问题

应该输入 `http://localhost:8080/a.html`