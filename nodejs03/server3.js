const http=require('http')
const urlLib=require('url')

http.createServer((req, res) => {
  var obj=urlLib.parse(req.url, true)

  console.log('111', req.url)
  var url=obj.pathname
  var GET=obj.query

  console.log(url, GET)

  //req获取前台请求数据
  res.write('aaa')
  res.end()
}).listen(8080)
