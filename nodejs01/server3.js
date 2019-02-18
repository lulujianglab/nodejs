const http=require('http')

var server=http.createServer((req, res) => {
  switch(req.url){ // 浏览器要什么，就返回什么信息 http://localhost:8080/1.html
    case '/1.html':
      res.write("111111") // 往前台发东西
      break
    case '/2.html':
      res.write("2222") // 往前台发东西
      break
    default:
      res.write('404')
      break
  }

  res.end() // 结束请求
})

//监听——等着
//端口-数字
server.listen(8080)

//http://localhost:8080/
