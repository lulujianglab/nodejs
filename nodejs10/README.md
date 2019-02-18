之前已经讲到了 express 的数据请求和中间件，这里主要是讲解下 `cookie` 和 `session`

# Cookie

我们知道一切跟服务器的交互都是通过 `http` 这个协议完成的,但是 `http` 有个天然的不足就是，他是**无状态的**

换句话说就是，两次请求之间，服务器是无法识别你是哪个人的

有人会说通过 ip ,同一个 ip 就是同一个人，但是公司里边出口 ip 都是同一个，所以这是行不通的

所以这种情况就会出现一个麻烦，就是用户每打开一个页面都得重新登录一次

所以 `cookie` 应运而生，简单的说，`cookie` 就是在**浏览器(客户端)保存一些数据**，每次请求都会带过来

比如说用户第一次访问的时候，cookie 是空的，这个时候就可以种一个 cookie ，比如通过用户 id 随机生成的，这样通过第二次请求的时候，再把 cookie 带到服务器端，这样就识别出来了

但是，cookie 有个小缺陷，因为但凡是保存在客户端的信息，都是不安全的，也是不可信的

浏览器是听用户的，前端可以自行的修改 cookie

我们可以在控制台输入 `document.cookie = "BD_HOME=1"` , BD_HOME 就代表一个 cookie

所以是不安全的，所以 `session` 就应运而生

# Session

`session` 也是保存数据用的，跟  `cookie` 没有多大差别，唯一的差别就是 `session` 是**保存在服务端**

安全级别跟用户数据库是一个级别

而且 **`cookie` 保存的数据是有限的，只有 4k，`session` 可以认为是无限的，可以存很多**

那有人会说，既然 `cookie` 没有优势，那可以直接删掉，用 `session` 就好了？这是不对的

**`session` 是基于 `cookie` 实现的，不能独立存在的**

比方说，浏览器第一次访问服务器，这个时候 `cookie` 是空的 - `cookie:{}` ,然后服务器就会反过来给浏览器种一个 `cookie` ，比方说是 `session_id` - `cookie:{session_id: xxxxx}` ,等到下次浏览器请求服务器的时候，就会带过来，这个时候服务器就可以通过读取这个 `session_id` 相关的文件来得到 `session` 相关的信息

**`cookie` 中会有一个 `session` 的 id ,服务器利用 `session_id` 找到 `session` 文件，并进行读取、写入一系列操作**

但这样也有一个隐患，既然 `session_id` 用户那边能看到，也能修改

比方说这个时候登录到一个网站，并且有 `session_id`，但被别人拿走了，然后用到别人那里去了，现在别人请求服务器就是以你的身份请求了

这样一种方式就是 `session` 劫持，理论上没有完美的方式防止 `session` 劫持，可以做 `session_id` 的更换，或者 `cookie` 加密，这样也可以一定程度上缓解

接下来实践下 `cookie` 的读取和发送

# 实践

## cookie

1. 读取 - `cookie-parse`

```js
server.use(cookieParser("秘钥"))

server.use(() => {
  req.cookies        // 未签名版
  req.signedCookies // 签名版
})
```

`cookie` 也是键值对的存在方式，还有过期时间，path等参数

path - 在哪个目录下可以读取 `cookie`

```js
const express=require('express')
const cookieParser=require('cookie-parser')

var server=express()

//cookie
server.use(cookieParser())

server.use('/', function (req, res){
  console.log(req.cookies)

  res.send('ok')
})

server.listen(8080)
```

2. 发送 - `res.cookie` (名字, 值, { `path`: '/', `maxAge`: 毫秒, `signed` `true`})

`cookie` 也是键值对的存在方式，还有过期时间，path等参数

path - 在哪个目录下可以读取 `cookie`

```js
const express=require('express')

var server=express()

//cookie
server.use('/aaa/a.html', (req, res) => {
  res.cookie('user', 'blue', {path: '/aaa', maxAge: 30*24*3600*1000});

  res.send('ok')
})

server.listen(8080)
```

需要注意的是，`cookie` 是向上访问的，比如

一级目录 - '/'
二级目录 - '/aaa' 、 '/bbb'
三级目录 - '/aaa/ccc'

三级目录 '/aaa/ccc' 下有 `cookie` , 则二级目录 'aaa' 下是能访问到的，但是二级目录 '/bbb' 下是访问不到 cookie 的，同理，根目录下 '/' 是能访问到的

3. 删掉 `cookie` - res.clearCookie("cookie 名")

```js
const express=require('express')
const cookieParser=require('cookie-parser')

var server=express()

//cookie
server.use(cookieParser('wesdfw4r34tf'))

server.use('/', function (req, res){
  res.clearCookie('user')

  res.send('ok')
})

server.listen(8080)
```

4. 签名

签名不叫压缩也不叫加密，可以看到铭文，可以杜绝修改

```js
const express=require('express')
const cookieParser=require('cookie-parser')

var server=express()

//cookie
server.use(cookieParser('wesdfw4r34tf')) // 接收 cookie 时要加入秘钥解析

server.use('/', function (req, res){
  req.secret='wesdfw4r34tf' // 签名的秘钥,有了上面的’server.use(cookieParser('wesdfw4r34tf'));‘，这里的req.secret可以不写。因为cookie会自动传值给secret
  res.cookie('user', 'blue', {signed: true}) // 签名

  console.log('签名cookie：', req.signedCookies)
  console.log('无签名cookie：', req.cookies)

  res.send('ok')
})

server.listen(8080)
```

需要注意的是

* 一定要把签名的内容告诉 `cookieParser`，如 `server.use(cookieParser('wesdfw4r34tf'))` ，否则它不知道解读谁，就会返回很长一串
* `cookie` 的空间非常小，需要省着用
* 安全性非常差

所以需要改进

* 精打细算 `cookie` 长度
* 校验 `cookie` 是否被篡改过

可以通过 `cookie-encrypter` 对 `cookie` 进行加密

## session 

1. 往 `cookie` 写入 

2. 从 `session` 读取

`cookie-session` 需要提供一个 `keys` 来进行加密，预防 `session` 劫持

`keys` 加到 `cookieSession` 处，全局的，是一个数组,因为存放多个秘钥，循环使用，比如，第一次访问用第一个秘钥，第二次访问用第二个秘钥，依次循环等等

访问浏览器端我们就可以看到跟 `session` 相关的 `cookie` 有两个，一个是 sess ，存放的是一个 `session_id` ,另一个是 sess.sig ，存放的是签名，用来保护 `session_id` ，防止被篡改

每次刷新 sess.sig 都会更改，但是 `session_id` 是不会更改的

正因为签名 -  sess.sig 总在变化，即使被盗取也只是短时间的有效，一旦页面被刷新，签名和后台对应解密的秘钥都会变化。后台只有在秘钥解密签名正确的情况下，才能通过 `session_id` 拿到真正的信息

所以从客户端的角度无法预测，也不能骗过服务器

`session` 也有过期时间，为了安全，防止劫持

有效期越长，越不安全，占用服务器资源越大

```js
const express=require('express')
const cookieParser=require('cookie-parser')
const cookieSession=require('cookie-session')

var server=express()

// 往 cookie 写入
server.use(cookieParser())
server.use(cookieSession({
  name: 'sess',
  keys: ['aaa', 'bbb', 'ccc'], // 秘钥
  maxAge: 2*3600*1000
}))

// 从 session 读取
server.use('/', function (req, res){
  if(req.session['count']==null){
    req.session['count']=1
  }else{
    req.session['count']++
  }

  console.log(req.session['count'])

  res.send('ok')
})

server.listen(8080)
```

`session` 需要通过 `cookie-session` 来解析，`session` 其实并不存在，是一个逻辑上的东西，不是个代码上的东西

实际上还是 `cookie` ，只不过只存一个 id 而已，还是在 `cookie` 之类的

所以我们需要先 `cookie-parser`, 再 `cookie-session`

```js
server.use(cookieParser())
server.use(cookieSession({
  name: 'sess',
  keys: ['aaa', 'bbb', 'ccc'], // 秘钥
  maxAge: 2*3600*1000
}))
```

# 总结

1. cookie - 存在浏览器，4K，不安全
   签名、加密

2. session - 存在服务器
   不能独立存在，基于 cookie

