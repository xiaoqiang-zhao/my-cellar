# Express

> 了解完 Koa，需要了解一下适用范围更广泛的 Express，也为改造脚手架做准备。

## 快速开始

随便找个文件夹

    npm init
    npm install express --save

然后新建个 `index.js` 文件，把下面内容粘进去：

    const express = require('express');
    let app = express();

    app.get('/', function(req, res) {
        res.send('hello world');
    });

    app.listen(3000, function () {
        const port = server.address().port;

        console.log('Example app listening at http://localhost:%s', port);
    });

然后 `node index` 就可以在浏览器访问了。

## 静态文件

为了安全起见，用户是不能随便访问服务器上的任意目录的，但是我们的网站有一些文件(如：图片、样式、js代码文件)总要提供给客户访问，一般把这些需要开放给用户的文件放在一个特定的文件夹下：

    app.use('/', express.static(__dirname + '/dist'));

向上面这样配置完毕后就可以访问了，具体代码参见 Demo。

如果我们想把某个链接，如 `/` 或 `/index`，指向一个 html 文件，可以在 `app.get` 中做些文章，完整配置如下：

    app.get('/', (req, res, next) => {
        let options = {
            root: __dirname + '/dist/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        let fileName = 'index.html';
        res.sendFile(fileName, options, function (err) {
            if (err) {
                next(err);
            }
            else {
                console.log('Sent:', fileName);
            }
        });
    });

你可以运行 Demo 查看效果。

## 路由

对路由进行管理会清晰一点，一般 Node 后台系统会这么做：

    app.get('/aa', function (req, res) {
        // 转到 Nodejs 业务处理模块
    })

    app.listen(3000, function () {
        // 在这里按规则读取数据
    });

两者结合同时具有上面的优点和缺点，对特殊路由要维护，并且要告诉新加入的成员，不推荐。

## 路由参考

### 斌哥的后端脚手架用的 Express

    import * as express from 'express';
    import router from './routes';
    let app = express();

    router(app);

    app.listen(3000);

`./routes` 中的内容：

    import editor from './aa';

    export default app => {
        app.use(aa);
    };

`./aa` 是多个接口的路由集合，把一个模块的接口放在里面：

    import * as express from 'express';
    import aa from '../action/aa';

    const router = express.Router();
    // 这里可以配置多个接口，访问会被打到 action 上，然后就可以读取数据库等操作
    router.post('/ara/aa/create', aa.create);

### 涛哥用的 Koa

    var app = require('koa')()
    var router = require('koa-router')()

涛哥个脚手架用的是代理，没有 Mock 数据。

## 代理

在搭建脚手架时，支持前后端联调的最简单有效的方式就是配置代理，所以有必要讲一下代理中间件，以  http-proxy-middleware 为例。

    const options = {
        target: 'http://192.168.1.6:3210'
    };
    app.use('/api', proxy(options));
    // http://localhost:3000/api/aa  ->  http://192.168.1.6:3210/api/aa

更多配置参见[官网](https://github.com/chimurai/http-proxy-middleware)。

## 中间件

```js
app.use(function (req, res, next) {
  // req is the Node.js http request object
  // res is the Node.js http response object
  // next is a function to call to invoke the next middleware
});
```

## 参考

[中文官网](http://www.expressjs.com.cn/)

[江涛的脚手架](https://github.com/chef-template/vue-mobile) 用的 Koa
