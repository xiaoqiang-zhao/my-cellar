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

## 静态文件

为了安全起见，用户是不能随便访问服务器上的任意目录的，但是我们的网站有一些文件(如：图片、样式、js代码文件)总要提供给客户访问，一般把这些需要发放给用户的文件放在一个特定的文件夹下：

    app.use('/', express.static(__dirname + '/dist'));

向上面这样配置完毕后就可以访问了，具体代码参见 Demo。

如果我们想把某个链接，如 `/` 或 `/index`，指向一个 html 文件，可以在 `app.get` 中做些文章，完整配置如下：

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
            } 
            else {
                console.log('Sent:', fileName);
            }
        });
    });

你你让可以运行 Demo 查看效果。

## 路由

对路由进行管理会清晰一点：

    // 

自动路由会比较方便

    // 

两者结合同时具有上面的优点和缺点，对特殊路由要维护，并且要告诉新加入的成员，不推荐。

## 参考

[中文官网](http://www.expressjs.com.cn/)

[江涛的脚手架]()