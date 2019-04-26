# NodeJs 基础

> NodeJs 在 2019 年初的当前主要有这么几个应用场景：承担 Web Server 的部分或全部数据处理，开发 cli 工具(前端工程化的工具是主要方向)，借助 Electron 开发客户端。开发这些需要一些基础的知识储备，这里结合我自己的经验回顾和整理一下。

## 概述

Node.js 不是一门语言也不是框架，它只是基于 Google V8 引擎的 JavaScript 运行时环境。

当前的工具链在这调试方面已经支持的非常完善了，在 vscode 中可以直接运行并调试。

## 版本

Node.js 诞生于 2009 年，由 Joyent 的员工 [Ryan Dahl](https://github.com/ry) 开发而成。在 2015 年由于 Node 贡献者对 es6 新特性集成问题的分歧，促成了 2015 年 NodeJS 基金会的成立，NodeJS 基金会的创始成员包括 Google、Joyent、IBM、Paypal、微软、Fidelity 和 Linux 基金会。此后，Node.js 基金会发展非常好。

Node.js 从 5.0 开始一直遵循着半年一个大版本的发布周期，每年 4 月左右发布一个主版本号为偶数的 LTS（Long-Term-Support）版本，每年 10 月左右发布一个主版本号为奇数的非 LTS 版本。

每年 10 月的奇数版本发布后，同年 4 月发布的偶数版本进入 LTS 阶段，为期一年半。期间除非 Release 工作组同意，不再添加新特性，只对现有功能进行完善，变更内容仅限于：

- 修复 Bug
- 安全性升级
- npm 升级（主版本号不变）
- 相关文档的更新
- 性能优化（基本不会影响已有的应用程序）
- 会引入大量繁琐恶心的代码（对已有应用程序的影响很低），但是对未来做向下兼容补丁有利的变更

最后还有 1 年半的维护期，期间除非是非常严重的 Bug 或安全性问题，不再有改动，对文档的修改也需要授权才可以。LTS 版本的生命周期共计 3 年，之后不再维护。

下面是一个简单的版本和时间对应关系：

- 2015 node 4 5
- 2016 node 6 7
- 2017 node 8 9
- 2018 node 10 11

如果你要用 async/await 需要的版本是 node 8+，如果要用 import 那么需要的版本是 node 10+。

## 版本检测

NodeJs 版本是一切功能的依赖，如果你想做一个供大家使用的工具而不是自己的玩具，那就需要做好版本检测。

一般的做法是首先在 package.json 中配置最低版本依赖项：

```json
{
  "engines": {
    "node": ">=10.0.0"
  }
}
```

配置了依赖并不会直接产生提示，一般会搭配一个 `checkVersion` 来实现：

```js
const chalk = require("chalk");
const packageConfig = require("./package.json");

function check(done) {
  // Parse version number from strings such as 'v4.2.0' or `>=4.0.0'
  function parseVersionNumber(versionString) {
    return parseFloat(versionString.replace(/[^\d\.]/g, ""));
  }

  // Ensure minimum supported node version is used
  var minNodeVersion = parseVersionNumber(packageConfig.engines.node);
  var currentNodeVersion = parseVersionNumber(process.version);
  if (minNodeVersion > currentNodeVersion) {
    return console.log(
      chalk.red("  You must upgrade node to >=" + minNodeVersion + ".x to use")
    );
  }

  done();
}

module.exports = check;
```

以上代码摘录自 vue-cli 开源工具，最后再推荐一个成熟的 npm 包 `check-node-version`，用法如下：

```js
const check = require("check-node-version");
const packageConfig = require("./package.json");

check(
  {
    node: packageConfig.engines.node
  },
  (error, results) => {
    if (error) {
      console.error(error);
      return;
    }

    if (results.isSatisfied) {
      console.log("All is well.");
    } else {
      console.log(
        "You must upgrade node to " + packageConfig.engines.node + "to use"
      );
    }
  }
);
```

## 理解异步

从其他语言转过的开发者对异步不太了解，就算是前端开发者接触 NodeJs 会发现这里的异步要比前端更复杂。

你需要掌握 callback、promise、async/await 的相关知识，还要掌握 MacroTask(宏任务) 和 MicroTask(微任务)。

之前写过一篇 node-async，这里就不展开了。

## 事件

上面的模块引入用了 `require`，其实我们可以超前一点，把 `import` 用起来，文件扩展名从 js 升级为 mjs，启动 node 进程时添加 experimental-modules 参数，如 `node --experimental-modules rename`。

浏览器端的事件我们最熟悉的 click、hover、scroll 都是浏览器宿主提供的，也有一些框架提供的事件，比如 Vue 中的声明周期钩子 created、mounted、destroy 等。在 node 中事件都由原生模块 `events` 提供，下面是一个入门示例：

```js
import EventEmitter from 'events';
class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();
myEmitter.on('eventName', () => {
  console.log('an event occurred!');
});

myEmitter.emit('eventName');
```

组件内部触发事件是更常用的写法，示例如下：

```js
import EventEmitter from 'events';

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    setTimeout(() => {
      this.emit('eventName', 'params Value');
    }, 1000)
  }
};

const myEmitter = new MyEmitter();
myEmitter.on('eventName', (params) => {
  console.log('event params:', params);
});
```

## 操作本地文件

node 10 添加了 Promise 的试验性支持，启动 node 进程的时候需要加参数 `node --experimental-modules rename`：

```js
import fs from 'fs';
const fsPromises = fs.promises;

try {
  const result = fsPromises.rename('./a.js', './b.js');
  result.then(error => {
    console.log('-- success --');
  });
}
catch(e) {
  console.log('error');
}
```

Promise 将来会成为主流，所以我们以 Promise 为主展开介绍。

首先重塑一个认知，当我们本地直接操作文件夹的时候需要先判断是否存在然后再写入或删除，但是这种在高并发业务场景是有问题的。一个文件现在存在，但当你对它操作的时候可能其他异步任务刚好在写入或者已经删除了，所以 fs 模块移除了 `exists` 添加了 `access`。`access` 检查文件是否可用，包括文件是否存在和文件是否正在写入。我们在设计文件内容结构的时候可能需要转变思路，比如“在文件首次被创建的时候要在开头中加一些特殊的内容”，向“不管是首次还是非首次向文件中添加的内容时同构的”。再举个业务中的例子，比如我们写日志，每个月的一个日志文件，我们可以获取当前的年月数据，以此为文件名用 `appendFile` 向其中添加日志。

读写较小文件时选择方法 `readFile` 和 `writeFile` 是很好的方案，能一次性完成读写，注意 writeFile 时文件不存在时会自动创建，文件存在时写入会覆盖原有内容：

```js
import fs from 'fs';
const fsPromises = fs.promises;

fsPromises.readFile('./readFile-demo.txt', {
  encoding: 'utf-8'
}).then(content => {
  return fsPromises.writeFile('./readFile-demo-2.txt', content, {
    encoding: 'utf-8'
  });
}).then(() => {
  console.log('读写完成');
}, error => {
  console.log('-- error --', error);
});
```

如果文件较大就要考虑流式读写，读的速度一般比写的快还要控制“写任务”堆积造成内存爆满。还可以直接向文件中添加内容，当文件不存在时先新建后添加：

```js
import fs from 'fs';
const fsPromises = fs.promises;

fsPromises.appendFile('a.md', 'my string', {
  encoding: 'utf8'
}).then(data => {
  console.log('内容添加成功');
});
```

很重要的提前检测和路径

修改文件属性，读写权限和执行权限 `chmod`:

```js
import fs from 'fs';
const fsPromises = fs.promises;

fsPromises.chmod('./a.js', 777).then(() => {
  console.log('权限修改完成');
});
```

同理还有修改文件所有者和用户分组的命令 `chown`。

## 路径相关操作

node 提供了全局变量 __filename 和 __dirname，分别表示当前执行文件的 “文件路径+文件名” 和 “文件所在路径”，如果开启了 `experimental-modules` 模式这两个全局变量暂不可用，可以用下面的方案代替：

```js
import path from 'path';
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(new URL(import.meta.url).pathname);
```

不同模块对相对路径的定义时不一样的，require 和 import 的相对路径指的是当前执行文件的路径，fs 和 path 的相对路径是启动脚本的路径。当前执行文件的所在路径可以用 `__dirname` 获取，脚本启动路径可以用 `process.cwd()` 获取。两种路径的转换可以借助 path 的 resolve 方法：

```js
import path from 'path';
const cwdPath = process.cwd();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
path.resolve(__dirname, cwdPath); // 等价于 path.resolve(__dirname, './')
```

## 获取远程数据

使用第三方库 `request` 可以跨系统间调用，可以从 github 和豆瓣这些第三方网站提供的在线 api 提供数据：

比如可以用豆瓣的开放 API 通过 ISBN 搜索图书信息:

```js
const request = require('request');

module.exports = function (req, response) {
  request({
    url: 'http://api.douban.com/book/subject/isbn/9787508658339',
    method: 'GET'
  }, function (err, res, body) {
    // xml 形式的数据
  });
};
```

cli 工具可能需要从远程 git 拉取仓库，第三方模块 `download-git-repo` 可以提供此功能:

```js
const download from 'download-git-repo';

download('bitbucket:flipxfx/download-git-repo-fixture#my-branch', 'test/tmp', { clone: true }, function (err) {
  console.log(err ? 'Error' : 'Success')
});
```

## 提供 Web 服务

用 NodeJS 提供 Web 服务在方案上有 3 个层次的选择：纯原生、Express/Koa、Egg。纯原生一般在学习和研究的层面使用，功能简单，很多基础需要自己开发。Express 和 Koa 封装了路由和插件扩展支持等基础功能，在中小项目中使用较为常见。Egg 企业级应用，封转了权限鉴定等企业级功能，大型项目推荐使用，Egg 2.x 基于 Koa 2.x，框架底层以及所有内置插件都使用 async function 编写。

https 提供安全升级，有效的防止运营商劫持；http2 提供网站资源加速。这两项都可以在 Koa 和 Egg 上。

百度、淘宝、京东都用了。

### 启动 https

启用 https 可以防止中间人攻击，想了解和 http 区别的可以去看一下这组漫画：[漫画：什么是 HTTPS 协议？](https://zhuanlan.zhihu.com/p/57142784)

原生启动：

```js
const https = require('https');
const fs = require('fs');
 
// SSL options
var options = {
  key: fs.readFileSync('./ssl/privkey.pem'),
  cert: fs.readFileSync('./ssl/server.pem')
}
 
const port = 8081;
https.createServer(options, (request, response) => {
  const encoding = 'utf-8';

  response.writeHead(200, {
    'Content-Type': 'application/javascript; charset=utf-8;'
  });

  response.write('{"a": "a"}', encoding);
  response.end();
}).listen(port);

console.log('启动成功，127.0.0.1:', port);
```

使用 Koa2 启动 https 服务：

```js
const Koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');
const { default: enforceHttps } = require('koa-sslify');
 
const app = new Koa();
 
// Force HTTPS using default resolver
app.use(enforceHttps({
  port: 8081
}));
 
// index page
app.use(ctx => {
  ctx.body = "hello world, from xiaoqiang-zhao. " + ctx.request.url;
});
 
// SSL options
var options = {
  key: fs.readFileSync('./ssl/privkey.pem'),
  cert: fs.readFileSync('./ssl/server.pem')
}
 
// start the server
http.createServer(app.callback()).listen(8080);
https.createServer(options, app.callback()).listen(8081);
```

### http2

http2 的主要作用是提高资源的加载速度，浏览器强制 http2 建立在 https 上，所以获取证书并且让服务器支持 https 是必须的先决条件。需要了解更多可以去读这篇博文: (HTTP2 详解)[https://www.jianshu.com/p/e57ca4fec26f]。

原生 NodeJs 启动 http2:

```js
const http2 = require('http2');
const fs = require('fs');

// SSL options
var httpsOptions = {
  key: fs.readFileSync('./ssl/privkey.pem'),
  cert: fs.readFileSync('./ssl/server.pem')
};

const server = http2.createSecureServer(httpsOptions, (request, response) => {
  const encoding = 'utf-8';

  response.writeHead(200, {
    'Content-Type': 'application/javascript; charset=utf-8;'
  });

  response.write('{"a": "a"}', encoding);
  response.end();
});

const port = 8443;
server.listen(port);
console.log('启动成功，127.0.0.1:', port);
```

顺便介绍一个新框架 fastify 的 http2 实现:

```js
const fs = require('fs')
const path = require('path')
const fastify = require('fastify')({
  http2: true,
  https: {
    key: fs.readFileSync('./ssl/privkey.pem'),
    cert: fs.readFileSync('./ssl/server.pem')
  }
})

fastify.get('/', function (request, reply) {
  reply
    .code(200)
    .type('text/html')
    .send(`
<!DOCTYPE html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <meta http-equiv=X-UA-Compatible content="IE=edge">
  <meta name=viewport content="width=device-width,initial-scale=1">
  <title>Fastify Demo</title>
  <meta name=description content="Fast and low overhead web framework, for Node.js">
</head>
<body>
    Fastify Demo for https and http/2
</body>
</html>
`);
})

fastify.listen(3000)
```

## 参考

(NodeJs中的stream（流）- 基础篇
)[https://juejin.im/post/5a75d037f265da4e9e303773]

(在Node.js中读写大文件)[https://blog.csdn.net/yhhwatl/article/details/53311214]

(简单比较 http https http2)[https://juejin.im/post/5a77fe396fb9a063317c2e71]

(HTTP2 详解)[https://www.jianshu.com/p/e57ca4fec26f]

(KOA2 提供HTTPS安全服务)[https://blog.csdn.net/ErErFei/article/details/73875795]

(浅谈推进全站HTTPS项目-工程篇)[https://juejin.im/post/5aa7327051882510fd3f488a]
