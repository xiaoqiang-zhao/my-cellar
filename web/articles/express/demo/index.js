var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

// 静态文件路由
app.use('/', express.static(__dirname + '/dist'));

// 首页路由  /  ->  /index.html
app.get('/', (req, res, next) => {
  var options = {
    root: __dirname + '/dist/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  var fileName = 'index.html';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

// 代理
var options = {
  target: 'http://192.168.1.6:3210'
};
app.use('/api', proxy(options));
// http://localhost:3000/api/aa  ->  http://192.168.1.6:3210/api/aa

var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Example app listening at http://localhost:%s', port);
});