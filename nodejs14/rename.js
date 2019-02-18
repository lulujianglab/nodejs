const fs=require('fs')

fs.rename('www/a.txt', 'www/b.txt', function (err){ // 第一个参数，原文件名；第二个参数，新文件名；第三个参数，异步的回调函数
  console.log(err)
})
