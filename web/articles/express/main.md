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

## 路由

对路由进行管理会清晰一点：

    // 

自动路由会比较方便

    // 

两者结合同时具有上面的优点和缺点，对特殊路由要维护，并且要告诉新加入的成员，不推荐。

## 参考

[中文官网](http://www.expressjs.com.cn/)
