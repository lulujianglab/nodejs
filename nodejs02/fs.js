const fs=require('fs')

//readFile(文件名, 回调函数) readFile异步函数
fs.readFile('aaa.txt', (err, data) => {
  if(err){
    console.log('读取失败')
  }else{
    console.log(data.toString()) // 读取出来的data是个二进制数据格式buffer
  }
})

//fs.writeFile
