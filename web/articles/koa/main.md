# Koa 学习笔记

> 总需要学一个 Node 的服务器端框架吧，就从 Koa 开始吧。

## 开始

就像官网上说的，一切框架都从一个"Hello World"开始，首先我们新建一个 package.json，内容尽量简单：

    {
      "name": "koa-note",
      "description": "Koa 学习笔记",
      "main": "index.js"
    }  

然后 npm 安装 Koa

    npm i koa

将官网上给的示例粘贴进去：

    const Koa = require('koa');
    const app = new Koa();
    
    app.use(ctx => {
        ctx.body = 'Hello World';
    });
    
    app.listen(4000);

然后执行 `node --harmony index.js`，就可以在浏览器中访问 `http://localhost:4000/` 了。

注1：ctx 是 context 的简写，下面详细介绍。

注2：[示例源码](/articles/koa/demo/start.js)。

## 2个关键点

Koa 的核心设计思路是为中间件层提供高级语法糖封装，以增强其互用性和健壮性，并使得编写中间件变得相当有趣。Koa 应用是一个包含一系列中间件 generator 函数的对象。 

### 中间件级联

Koa 通过 generators 来实现“真正”的中间件。 Connect 简单地将控制权交给一系列函数来处理，直到函数返回。 与之不同，当执行到 yield next 语句时，Koa 暂停了该中间件，继续执行下一个符合请求的中间件('downstrem')，然后控制权再逐级返回给上层中间件('upstream')。

    const Koa = require('koa');
    const app = new Koa();
    
    // 定制请求头
    app.use(async function (ctx, next) {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    });
    
    // 日志
    app.use(async function (ctx, next) {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}`);
    });
    
    // 请求内容
    app.use(ctx => {
        ctx.body = 'Hello World';
    });

上面的例子在页面中返回 "Hello World"，然而当请求开始时，请求先经过定制请求头和日志中间件，并记录中间件执行起始时间。 然后将控制权交给 reponse 中间件。当中间件运行到 yield next 时，函数挂起并将控制前交给下一个中间件。当没有中间件执行 yield next 时，程序栈会逆序唤起被挂起的中间件来执行接下来的代码。

为了方便理解我 YY 了下面的例子：

    // 定制请求头
    app.use(async function (ctx, next) {
        console.log('step 1');
        await next();
        console.log('step 5');
    });
    
    // 日志输出
    app.use(async function (ctx, next) {
        console.log('step 2');
        await next();
        console.log('step 4:');
    });
    
    // 请求内容
    app.use(ctx => {
        console.log('step 3');
    });

注：[示例源码](/articles/koa/demo/middleware.js)。

说到中间件就不得不提到中间件的开发，简单地说中间件就是一个回调函数，中间件的原理可以参考下面这个"洋葱模型"：

![image](img/middleware-model.png) 

2.x 版可以使用 `yield` 来分割 request 和 response，但是 2.0 发版后就明确说明在 3.x 希望使用 `await` 来代替 `yield`，也就是要从 generator function 升级到 async function。某些组件还没有进行升级，经常会看到控制台上又这样的警告信息 "Support for generators will be removed in v3."，其中常用的 koa-router 和 koa-proxy 就在其中，如果想去除警告，并且与下一个版本兼容，可以参考 koa-static 这个库(做静态文件路由的一个中间件)。

### app 的几个方法

app.listen()，为应用绑定端口，参数的详细文档请查看[nodejs.org](http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback)。

app.callback()，返回一个适合 `http.createServer()` 方法的回调函数用来处理请求。

app.use(function)，为应用添加指定的中间件，详情请看 [Middleware](https://github.com/koajs/koa/wiki#middleware)。

app.keys=，设置签名Cookie密钥。

app.context，方便扩展 ctx：

    app.context.db = db();
    
    app.use(async (ctx) => {
      console.log(ctx.db);
    });

app.on，典型的是错误处理：

    app.on('error', function(err){
      log.error('server error', err);
    });

## 上下文

Koa Context 将 node 的 request 和 response 对象封装在一个单独的对象里面，其为编写 web 应用和 API 提供了很多有用的方法。
    
    app.use(function *(){
      this; // is the Context
      this.request; // is a koa Request
      this.response; // is a koa Response
    });

一堆 API 就不写了，自行到官网查看。

## 中间件

Koa 就是一个框架，大部分功能还需要靠中间件实现。

### 中间件 koa-router

安装

    npm install koa-router

使用
    
    const Koa = require('koa');
    const app = new Koa();
    const router = require('koa-router')();
    
    router.get('/', function *(next) {
        this.body = 'Hello World!';
    });
    
    router.get('/a', function *(next) {
        this.body = 'Hello World A!';
    });
    
    app.use(router.routes());
    app.listen(4000);
    
    console.log('服务已启动: localhost:4000');
    
RESTFul 风格的路由像这样配置：

    router.get('/users/:id', function *(next) {
        // ...
    }).del('/users/:id', function *(next) {
        // ...
    });

官网：[koa-router](https://github.com/alexmingoia/koa-router)。

### 中间件 koa-static

安装

    npm i koa-static --save
    
使用

    const koaStatic = require('koa-static')('./');
    app.use(koaStatic);

说明：

- 第一个参数指定根路径
- 第二个参数指定各种配置项

注意：

默认请求指向 `index.html` 文件，当然你可以通过第二个参数 options 自定义默认请求的文件。如果配置了 `koa-router` 的默认路径那么静态文件的路由默认会失效。如下面访问 `http://localhost:4000/` 这样的路径会返回报 404，而不会去读取 `../dist/index.html` 文件并返回。

    router.get('/', function *(next) {
    });
    const koaStatic = require('koa-static')('./', {
        index: '../dist/index.html'
    });

其他参数参考 koa-static 中间件官网：[koa-static](https://github.com/koajs/static)。

注：[示例源码](/articles/koa/demo/koa-static/index.js)，示例验证了 HTML，图片，CSS 和 JS 静态文件的加载。

### 中间件 koa-proxy

安装

    npm i koa-proxy --save
    
代理接口，默认只代理接口不代理静态文件，当前的 `router` 优先，也就是说如果已经配置了某接口的路由，那么此接口不会被代理带其他服务器上。

    const koaProxy = require('koa-proxy')({
        host: 'http://127.0.0.1:5000'
    });
    app.use(koaProxy);

也可以给静态文件做远程代理：

    app.get('index.js', proxy({
      url: 'http://127.0.0.1:5000/index.js'
    }));

注1：[示例源码](/articles/koa/demo/koa-proxy/index.js)。
注2：[中间件 koa-proxy](https://github.com/popomore/koa-proxy)

## 意外收获的包

> 读源码的时候发现了很多服务器开发有用的包，下面列一下：

### co

Generator 函数执行器，TJ大神的作品。[GitHub](https://github.com/tj/co)

    co(gen);
    
### methods

Node 支持的 http 类型，这种只返回一个数组的小包居然也是 TJ 大神创立的。[GitHub](https://github.com/jshttp/methods)

### assert

对 Node 原生包的扩展，支持浏览器。[GitHub](https://github.com/defunctzombie/commonjs-assert)

    // 判空
    assert(root, 'root directory is required to serve files');

### http-errors

处理 http 异常的模块，这个做服务器端开发肯定少不了。[GitHub](https://github.com/jshttp/http-errors)

### cookie

这种包用途也和广泛。[GitHub](https://github.com/jshttp/cookie)

### path-to-regexp

非常棒的路径匹配和 RESTFul 地址转化的工具。[GitHub](https://github.com/pillarjs/path-to-regexp)

### is-generator-function

判断一个函数是否是 Generator 函数。[GitHub](https://github.com/ljharb/is-generator-function)

    const isG = require('is-generator-function');
    isG(fn);
    
## 参考

[github koajs](https://github.com/koajs/koa)

[Koa 官网](http://koajs.com/)

[Koa 中文文档 1](http://koa.bootcss.com/)

[Koa 中文文档 2](https://github.com/guo-yu/koa-guide)

[《Koa 实战》](http://book.apebook.org/minghe/koa-action/hello-koa/index.html)




