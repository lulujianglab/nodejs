# 创建一个 http 服务器

[nodejs官网](https://nodejs.org/en/): https://nodejs.org/en/

1. 需要引入 `http` 模块 - `const http = require('http')`

2. 然后通过 `http` 创建一个服务器 - `http.createServer()` ,每当有人连接到这个服务器时，这个回调函数就会执行

```js
var server=http.createServer((request, response) => {
  console.log('有人来了');
})
```

其中，`request` - 请求，对于服务器来说是客户端需要请求的信息；`response` - 响应，对于服务器来说是向客户端输出的信息

3. 需要有一个监听端口 - `server.listen(8080)`

一台服务器应该永远在运行，有一项非常重要的工作就是 - 监听。我们可以将服务器理解为小超市，所谓的监听就是派个人来招呼客户。一台服务器可以同时提供很多种服务，比如既有 web 服务，又有邮件服务等，那客户端怎么知道应该跟哪个服务建立连接呢？这个时候就需要通过端口来区分，类似于房子的门牌号

需要注意的是，客户端发起连接的时候也需要提供这个端口，默认80

# 实践

```js
const http=require('http')

var server=http.createServer((request, response) => {
  console.log('有人来了')
})

server.listen(8080)
```

在终端输出 `node server.js` 启动服务端连接,然后在浏览器中输入 `http://localhost:8080/` 开启客户端连接，就会在终端输出有人来了

```js
const http=require('http')

var server=http.createServer((req, res) => {
  res.write("abc")
  res.end()
})

server.listen(8080)
```

可以通过 `res.write()` 向客户端发送消息，`res.end()` 表示结束请求,如果不加这行命令，浏览器端会一直在加载

```js
const http=require('http')

var server=http.createServer((req, res) => {
  switch(req.url){
    case '/1.html':
      res.write("111111")
      break
    case '/2.html':
      res.write("2222")
      break
    default:
      res.write('404')
      break
  }

  res.end()
})

server.listen(8080)
```

通过请求不同页面，发送不停内容到前台