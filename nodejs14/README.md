# 上传文件

```sh
npm install express express-static body-parser cookie-parser cookie-session jade ejs
```

```js
const express=require('express')
const static=require('express-static')
const cookieParser=require('cookie-parser')
const cookieSession=require('cookie-session')
const bodyParser=require('body-parser')
const multer=require('multer')
const ejs=require('ejs')
const jade=require('jade')

var server=express()

server.listen(8080)

//1.解析cookie
server.use(cookieParser('sdfasl43kjoifguokn4lkhoifo4k3'))

//2.使用session
var arr=[];
for(var i=0;i<100000;i++){
  arr.push('keys_'+Math.random())
}
server.use(cookieSession({name: 'zns_sess_id', keys: arr, maxAge: 20*3600*1000}))

//3.post数据
server.use(bodyParser.urlencoded({extended: false})) // 
// server.use(multer({dest: './www/upload'}).any())

//用户请求
server.use('/', function (req, res, next){
  console.log(req.query, req.body, req.files, req.cookies, req.session)
})

//4.static数据
server.use(static('./www'))
```

post 有两种用途，一种是上传各种数据，比如注册用户、密码，另一种是上传各种文件

`body-parser` 只能解析上传数据类的 post ，不能解析文件上传

## multer 模块

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <form action="http://localhost:8080/" method="post" enctype="multipart/form-data">
      文件：<input type="file" name="f1" /><br>
      <input type="submit" value="上传">
    </form>
  </body>
</html>
```

普通的 post 是没法上传文件的，这里注意必须要添加 `enctype` 属性，它有三个属性值

- `application/x-www-form-urlencoded` 普通的 & =，只能上传值
- `multipart/form-data` 分割成多个部分，比如多个文件，上传的是真正的表单的数据
- `text-plain` 纯文本

这里上传文件需要用到 `multipart/form-data`

后台需要用到的模块是 [multer](https://www.npmjs.com/package/multer)，是一个中间件，用来处理 `multipart/form-data` 这样的表单

安装

```sh
npm install multer
```

```js
const express=require('express')
const bodyParser=require('body-parser')
const multer=require('multer')
const fs=require('fs')
const pathLib=require('path')

var objMulter=multer({dest: './www/upload/'}) // 文件保存地址

var server=express()

//错误
//server.use(bodyParser.urlencoded({extended: false}));
server.use(objMulter.any()) // 可以接收任何文件，也可以用.single(’文件名发f1‘)

server.post('/', function (req, res){
  // console.log(req.files) // 文件信息
  //新文件名
  //'./www/upload/dfb33662df86c75cf4ea8197f9d419f9' + '.png'
  var newName=req.files[0].path+pathLib.parse(req.files[0].originalname).ext

  fs.rename(req.files[0].path, newName, function (err){
    if(err)
      res.send('上传失败')
    else
      res.send('成功')
  })

  //1.获取原始文件扩展名
  //2.重命名临时文件
})

server.listen(8080)
```

需要注意的是

### 获取到的文件信息是包含在数组对象中

```js
server.post('/', function (req, res){
  console.log(req.files) // 文件信息
})
```

比如我们上传一张名为 home.png 的图片，存入项目路径下 www 文件夹中的 upload 文件夹下，可以查看打印日志

```sh
[{
  fieldname: 'f1',
  originalname: 'home.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: './www/upload/',
  filename: '2cae8a6ab69256f64b5f624fde6da01a',
  path: 'www/upload/2cae8a6ab69256f64b5f624fde6da01a',
  size: 6351343 }
}]
```

### **文件的重命名**需要用到 `fs` 模块

比如

```js
const fs=require('fs')

fs.rename('www/a.txt', 'www/b.txtt', function (err){ // 第一个参数，原文件名；第二个参数，新文件名；第三个参数，异步的回调函数
  console.log(err)
})
```

### **获取原文件名称**用到的是 `path` 模块

比如

```js
const path=require('path')

var str='c:\\wamp\\www\\a.html'

var obj=path.parse(str) // 解析文件路径

//base      文件名部分(包含扩展名)
//ext       扩展名
//dir       路径
//name      文件名部分(不包含扩展名)
console.log(obj)
```

打印出来的结果就是

{
  root      'c:\\,
  dir       'c:\\wamp\\www',
  base      'a.html'
  ext       '.html'
  name      'a'
}

所以，`req.files[0].path+pathLib.parse(req.files[0].originalname).ext` 就是新文件名字加扩展名

## 总结

- `body-parser` : 解析 post 的数据, `enctype` 格式是 `application/x-www-form-urlencoded`，也是默认值。使用方式简单，`server.use(bodyParse.urlencode())`
- `multer`,解析 post 文件，`enctype` 格式是 `multipart/form-data`,使用方式也并不复杂，需要指定上传路径
`var obj = multer({dest: 'upload/'})`，也可以指定文件上传的限制，比如大小等。在用中间件时，可以直接接受任何上传，`server.use(obj.any()`,也可以接受单个上传文件，比如名为 f1 的文件，`server.use(obg.single('f1'))`，在使用文件时，也不是用 `req.body`,而是用 `req.files`

使用也不冲突，可以同时配合使用

```js
const bodyParser=require('body-parser')
const multer=require('multer')

server.use(bodyParser.urlencoded({extended: false})) 
server.use(multer({dest: './www/upload'}).any()) // 创建一个 multer 对象，同时接受任何上传

server.use('/', function (req, res, next){
  console.log(req.query, req.body, req.files, req.cookies, req.session)
})
```