const express=require('express')

var server=express()

//目录1：/user/
var routeUser=express.Router()

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
