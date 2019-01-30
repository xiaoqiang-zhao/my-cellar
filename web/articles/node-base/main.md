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

## 操作本地文件

## 获取远程数据

## 提供 Web 服务
