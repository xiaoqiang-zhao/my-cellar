# Koa 学习笔记

> 总需要学一个 Node 的服务器端框架吧，就从 Koa 开始吧。

## 开始

就像官网上说的一切框架都从一个"Hello World"开始，首先我们新建一个 package.json，内容尽量简单：

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

然后执行 `node index.js`，就可以在浏览器中访问 `http://localhost:4000/` 了。如果你是最新的 Node，已经不需要添加 harmony flag(实测版本 v7.1.0)。





