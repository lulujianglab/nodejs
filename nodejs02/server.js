const http=require('http')
const fs=require('fs')

var server=http.createServer((req, res) => {
  //req.url=>'/index.html'
  //读取=>'./www/index.html'
  //  './www'+req.url
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
