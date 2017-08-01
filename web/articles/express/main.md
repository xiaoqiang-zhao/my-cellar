# Express

> 了解完 Koa，需要了解一下适用范围更广泛的 Express，也为改造脚手架做准备。

## 快速开始

随便找个文件夹

    npm init
    npm install express --save

然后新建个 `index.js` 文件，把下面内容粘进去：

    var express = require('express');
    var app = express();

    app.get('/', function(req, res) {
        res.send('hello world');
    });

    var server = app.listen(3000, function () {
        var port = server.address().port;

        console.log('Example app listening at http://localhost:%s', port);
    });

然后 `node index` 就可以在浏览器访问了。

## 参考

[中文官网](http://www.expressjs.com.cn/)
