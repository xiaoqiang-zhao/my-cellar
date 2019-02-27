# http2 素材

> 编写时间 2019.02.27

## koa + http2

## Fastify 框架

https://github.com/fastify/fastify

fastify 的 cli 工具现在还比较鸡肋。用 

### fastify-cli

cli 工具一般都是全局安装：

```shell
npm install fastify-cli --global
```

安装成功后会提供全局环境变量 "fastify"，初始化项目：

```shell
fastify generate <your app name>
```

初始化项目后你就会发现启动运行的脚本是这样的：

```js
"scripts": {
  "test": "tap test/**/*.test.js",
  "start": "fastify start -l info app.js",
  "dev": "fastify start -l info -P app.js"
},
```

也就是运行或调试依赖 "fastify-cli"，这么做肯定有一些弊端，比如在生产环境也需要安装 "fastify-cli"。从另一个角度看这种方案承担了项目的部分功能，比如你不需要在项目中再配置自动测试框架，还可以通过插件的形式添加 lint:

```js
"devDependencies": {
+ "standard": "^11.0.1",
}

"scripts": {
+ "pretest": "standard",
  "test": "tap test/**/*.test.js",
  "start": "fastify start -l info app.js",
  "dev": "fastify start -l info -P app.js",
+ "lint": "standard --fix"
},
```

入口模块是这样的：

```js
'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = function (fastify, opts, next) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })

  // Make sure to call next when done
  next()
}
```

入口文件向外输出一个函数，二函数的入参是 fastify 实例，如果想进行初始化入参：

```js
const fastify = require('fastify')({
  http2: true,
  https: {
    key: fs.readFileSync('./ssl/privkey.pem'),
    cert: fs.readFileSync('./ssl/server.pem')
  }
})
```

需要自己定义工程，实际项目中需要在自由和简洁之间做出选择。

### fastify

源码



[新近发布轻量级的 Node.js 服务端框架Fastify怎么样？-- 来自贺师俊的回答](https://www.zhihu.com/question/66797506)
