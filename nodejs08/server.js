const express=require('express')

var server=express()

/*
server.get('/', () => {
  console.log('有GET')
})
server.post('/', () => {
  console.log('有POST')
})
*/

// server.use('/a.html', (req, res) => {
//  res.send('123')
//  res.end()
// })

server.use('/', (req, res) => {
  console.log('use了')
})

server.listen(8080)
