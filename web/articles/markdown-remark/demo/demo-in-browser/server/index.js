var express = require('express')
var expressAutoPathRouter = require('express-auto-path-router')

var app = express()

// 静态文件路由
app.use('/', express.static('./dist'))

app.use(expressAutoPathRouter('./mock/'))

var server = app.listen(3000, function () {
  var port = server.address().port

  console.log('Example app listening at http://localhost:%s', port)
})
