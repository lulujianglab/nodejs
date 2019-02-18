# express 整合

## 模板引擎

`express` 需要所有的模板引擎配合起来，需要 `consolidate` - 适配，给 `express` 提供统一的接口

安装

```sh
npm i consolidate
```

引入

```js
const consolidate=require('consolidate')

//4.配置模板引擎
//c.输出什么东西
server.set('view engine', 'html') // 为用户呈现一个 html
//b.模板文件放在哪儿
server.set('views', './views') // 对 `server` 进行全局的配置
//a.哪种模板引擎
server.engine('html', consolidate.ejs) // 用 ejs 引擎编译为 html
```

```js
const express=require('express')
const static=require('express-static')
const cookieParser=require('cookie-parser')
const cookieSession=require('cookie-session')
const bodyParser=require('body-parser')
const multer=require('multer')
const consolidate=require('consolidate')

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
server.use(bodyParser.urlencoded({extended: false}))
server.use(multer({dest: './www/upload'}).any())

//4.配置模板引擎
//c.输出什么东西
server.set('view engine', 'html')
//b.模板文件放在哪儿
server.set('views', './views')
//a.哪种模板引擎
server.engine('html', consolidate.ejs)

//接收用户请求
server.get('/index', function (req, res){
  res.render('1.ejs', {name: 'blue'})
})

//4.static数据
server.use(static('./www'))
```

运行 `node server.js`,在浏览器中访问 localhost:8080/index,就可以看到输出内容

`render()` 就是渲染输出，跟 `send()` 差不多

## 路由

route - 路由 子服务

把不同的目录，对应到不同的模块

`route` 属于 `express` 的一部分，并不是之前讲的中间件

```js
const express=require('express')

var server=express()

//目录1：/user/
var routeUser=express.Router() // 创建一个 router

routeUser.get('/1.html', function (req, res){   //http://xxx.com/user/1.html
  res.send('user1')
});
routeUser.get('/2.html', function (req, res){   //http://xxx.com/user/2.html
  res.send('user22222')
})

server.use('/user', routeUser) // 把 router 添加到 server 服务器上

//目录2：/article/
var articleRouter=express.Router()
server.use('/article', articleRouter) // 把 router 添加到 server 服务器上

articleRouter.get('/10001.html', function (req, res){   //http://xxxx.com/article/10001.html
  res.send('asdfasdfasdf')
})

server.listen(8080)
```

运行 `node server_route.js`，在浏览器中输入 localhost:8080/user/1.html 或者 localhost:8080/user/2.html 或者 localhost:8080/article/10001.html 就可以看到相应的渲染结果