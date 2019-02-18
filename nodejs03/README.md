# GET 数据解析

前台到后台的数据请求方法有 form、ajax、jsonp等，后台到前台的也一样

双向的请求方法有 http

常用的请求方式有：GET、POST

GET数据解析的方法有：

1. 自己切

2. querystring 解析数据的部分 xxx=xx&xxx=xx

3. urlLib aaa?xxx=xx&xx=12
`const urlLib = url.parse(url,true)`  parse 传入 true 自动解析了 query

# 实践

## 自己切

```js
const http=require('http')

http.createServer((req, res) => {
  var GET={}

  if(req.url.indexOf('?')!=-1){
    var arr=req.url.split('?')
    var url=arr[0]
    var arr2=arr[1].split('&')

    for(var i=0;i<arr2.length;i++){
      var arr3=arr2[i].split('=')
      GET[arr3[0]]=arr3[1]
    }
  }else{
    var url=req.url
  }
  
  console.log(url, GET)

  res.write('aaa')
  res.end()
}).listen(8080)
```

比如我们在浏览器端输入 `http://localhost:8080/aaa?user=zhangsan&pass=123456` ，通过 `var arr=req.url.split('?')` ，此时 `arr = ['/aaa', 'user=zhangsan&pass=123456']`, `arr2 = ['user=zhangsan', 'pass=123456']` , `GET = { user: 'blue', pass: '123456' }`

## querystring 模块

```js
const http=require('http')
const querystring=require('querystring')

http.createServer((req, res) => {
  var GET={}

  if(req.url.indexOf('?')!=-1){
    var arr=req.url.split('?');
    var url=arr[0]
    
    GET=querystring.parse(arr[1])
  }else{
    var url=req.url
  }

  console.log(url, GET)

  res.write('aaa')
  res.end()
}).listen(8080)
```

通过 `querystring` 模块中的 `querystring.parse()` 可以将 `user=zhangsan&pass=123456` 解析成 `{ user: 'blue', pass: '123456' }`

## url 模块

```js
const http=require('http')
const urlLib=require('url')

http.createServer((req, res) => {
  var obj=urlLib.parse(req.url, true)

  var url=obj.pathname // /aaa
  var GET=obj.query // { user: 'blue', pass: '123456' }

  console.log(url, GET)

  res.write('aaa')
  res.end()
}).listen(8080)
```

通过 `url` 模块中的 `urlLib.parse()` 将 `req.url` - `/aaa?user=blue&pass=123456` 解析成 `{ user: 'blue', pass: '123456' }`

有个 bug 就是每次请求的时候在浏览器端开发者工具中会输出 `GET http://localhost:8080/favicon.ico 404 (Not Found)` ,这是 chrome 的 global 毛病,暂时不用理会