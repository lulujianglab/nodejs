# 实现一个自定义中间件

## 前言

先来回顾下 express 基本结构

```js
const express=require('express')

var server=express()
server.listen(8080)

//GET、POST
server.use()
```

1. 数据： `GET` 、`POST`

`GET` - 无需中间件
`req.query` 获取 url 数据

`POST` - 需要 `body-parser` 中间件
`server.use(bodyParse.urlencoded({}))` // 解析 body 数据
```js
server.use(function(req, res, next){ // 使用数据 POST body
  // req.body
})
```

2. 中间件：使用、写、链式操作

安装 `body-parser` 中间件

```sh
cnpm i body-parser
```

**链式操作**

```js
server.use((req, res, next) => {}) // 中间件use next
server.get('/',(req, res, next) => {})
server.post((req, res, next) => {})
```

需要监听一个请求的地址

然后通过 `next()` 进行下一步操作

**写中间件**

在原生函数里解析 post 数据：`req.on()`

需要在所有的数据接收完之后执行 `next()`,所以`next()`应该放在 `end` 里执行

```js
req.on('end', () => {
  req.body=querystring.parse(str)

  next()
})
```

里边内部有 `next()` ,等到执行完成，就通过 `next()` 就把控制权交给下一个环节

中间件依赖于原生的东西,不可能用 express 里边的东西

**自定义中间件**

```js
server.use((req, res, next) => {
  var str=""
  req.on("data", (data) => {
    str += data
  })
  req.on("end", () => {
    req.body = querystring.parse(str)
    next() // 数据收集完了，移交给下一步
  })
})

server.use('/', (req, res) => {
  console.log(req.body)
})
```

实现了一个类似 `body-parser` 的中间件,可以将 `post` 请求中的 `body` 数据解析并赋值给 `req.body` ，否则输出的 `req.body` 就是 undefined

正常使用 `body-parser` 中间件如下

```js
const express=require('express')
const bodyParser=require('body-parser')

var server=express()
server.listen(8080)

server.use(bodyParser.urlencoded({
  extended: false,                 //扩展模式
  limit:    2*1024*1024           //限制-2M(最多接收多大的服务，默认2k)
}))

server.use('/', (req, res) => {
  console.log(req.body) //POST
})
```

需要注意的是


```js
app.use(bodyParser.urlencoded({ extended: false })) // 这个方法也返回一个中间件，这个中间件用来解析body中的urlencoded字符
app.use(bodyParser.json()) // 返回一个仅仅用来解析json格式的中间件
```

extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型

一个接受form请求，一个接受json请求，解析的规则不一样,都可以接收 zip 和 gzip

extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型
