# 文件读写

1. 首先需要引入 `fs` 文件模块 - `const fs=require('fs')`

2. 读取文件 - `readFile(文件名, 回调函数)`异步函数
   
3. 写入文件 - `writeFile(文件名, 内容, 回调)`异步函数

这里的读写函数都是异步函数，异步相比于同步可以很大的提高程序运行的效率

异步：多个操作可以同时进行，第一次的操作没完成，后一次也能开始
同步：一次一个
    
# 实践

## 读取文件

```js
const fs=require('fs')

fs.readFile('aaa.txt', (err, data) => {
  if(err){
    console.log('读取失败')
  }else{
    console.log(data.toString()) // 读取出来的data是个二进制数据格式buffer
  }
})
```

在终端输出 `node fs.js`, 会直接输出 aaa.txt 里边的内容

## 写入文件

```js
const fs=require('fs')

fs.writeFile("bbb.txt", "sdafasdwere", (err) => {
  console.log(err)
})
```

在终端输出 `node fs2.js`，会直接生成一个 bbb.txt 文件

## 在浏览器端显示读取的文件内容

```js
const http=require('http')
const fs=require('fs')

var server=http.createServer((req, res) => {

  var file_name='./www'+req.url
  
  fs.readFile(file_name, (err, data) => {
    if(err){
      res.write('404')
    }else{
      res.write(data)
    }
    res.end()
  })
})

server.listen(8080)
```

比如在浏览器端输入 `localhost:8080/1.html` ,此时获取到的 `req.url` 就是 /1.html , file_name 就是 `'./www/1.html'`

