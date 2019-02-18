# POST 解析数据

在 GET 请求数据内容时，我们是通过 `url` 模块 - `urlLib.parse(req.url, true)` ，解析 `req.url`

而 POST 数据接收的比 GET 大得多，是在 body 里边传输数据

所以 POST 接收数据是分段接收的，通过 `req.on('data', () => {})` 方法, `req.on('end', () => {})` 表示数据全部到达后的处理

# 实践

```js
const http=require('http')
const querystring=require('querystring')

http.createServer((req, res) => {
  var str=''  //字符串接收数据并不是特别好 (如果是文件、音乐就是二进制的)
  var i=0
  req.on('data', (data) => {
    console.log(`第${i++}次收到数据`)
    str+=data
  })

  req.on('end', () => {
    var POST=querystring.parse(str)
    console.log(POST) 
  })
}).listen(8080)
```

在终端运行 `node server.js` ,在浏览器端运行 form.html ,`querystring.parse(str)` 会将服务端接收的 `user=zhanshan&pass=123456` 转化为 `{ user: 'zhanshan', pass: '123456' }`

```js
const http=require('http')
const fs=require('fs')
const querystring=require('querystring')
const urlLib=require('url')

var server=http.createServer((req, res) => {
  //GET
  var obj=urlLib.parse(req.url, true)

  var url=obj.pathname
  const GET=obj.query

  //POST
  var str=''
  req.on('data', (data) => {
    str+=data
  })
  req.on('end', function (){
    const POST=querystring.parse(str)

    //文件请求
    var file_name='./www'+url
    fs.readFile(file_name, (err, data) => {
      if(err){
        res.write('404')
      }else{
        res.write(data)
      }
      res.end()
    })
  })
})

server.listen(8081)
```

将 GET 请求、POST 请求、文件请求放入一个文件