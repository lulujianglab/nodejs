const http=require('http')
const querystring=require('querystring')

http.createServer((req, res) => {
  //POST——req

  var str=''   //字符串接收数据并不是特别好 (如果是文件、音乐就是二进制的)

  //data——有一段数据到达(很多次)
  var i=0
  req.on('data', (data) => {
    console.log(`第${i++}次收到数据`)
    str+=data
  })
  //end——数据全部到达(一次)
  req.on('end', () => {
    var POST=querystring.parse(str)
    console.log(POST)
  })
}).listen(8080)
