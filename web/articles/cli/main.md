# cli - 匠者造器

> js 在端能力上，除了在浏览器中运行页面外还有一个很重要的分支，那就是在命令行中运行。前者有我们最熟悉的纯 Web 页面 和 App 中内嵌的页面，也有我们不太常用的基于 Electron 开发桌面应用。后者有前端工程的脚手架和文件批处理工具。

## 前置知识点

npm 全局安装一个包的时候到底偷偷摸摸做了那些事？

首先是从网上把这个包本身(敲黑板划重点：不包括依赖的包)下载下来；

然后根据参数下载依赖(依赖分 dependencies 和 devDependencies，具体出门左转[npm](/#!/articles/npm))，安装的目录 Mac 下是 `/usr/local/lib/node_modules`；

如果依赖没问题会读取 `package.json` 中的 `bin` 配置，然后把文件写入到 `/usr/local/bin/` 目录下，这个目录下放的是全局命令的，这个路径可能因为系统的不同而不同，可以在环境变量配置文件查看。我们在命令行中敲的任何一个用户命令都要首先从这个文件夹开始查找。

我们看一下 `gulp` 命令中有点啥：

```js
#!/usr/bin/env node

'use strict';
const gutil = require('gulp-util');
...
```

与浏览器端代码不同的是入口文件的第一行。env 是一个命令，参数是 node，就是在程序中用 nodejs 的引擎，也就是 v8 引擎，去执行下面的代码，这样就可以借助操作系统的能力，而不需要知道 node 装在哪里了。

一般安装全局包都需要 `sudo`，这货是干啥的？

我们看到上面有很多文件拷贝，而且涉及到 `/usr/local/bin/` 这样的军机要地，而且在系统中不是每个文件都可以被执行的，这有涉及到文件的权限问题，这里不展开，想了解更多出门左转我的另一篇文章 [Linux 笔记](/#!/articles/linux)。

这么多事不是谁想干就让干的，`sudo` 通俗一点可以理解为赐下尚方宝剑，想砍哪个砍哪个，专业一点讲就是赋予一系列执行的权限。

## Hello World

建一个 hw.js 文件，内如如下：

```js
#!/usr/bin/env node

console.log('Hello world.');
```

然后拷贝到 `/usr/local/bin/`，然后就可以在命令行中敲个命令爽一下了：

```shell
hw
```

靠，报了个错：`permission denied: cubao`，没爽成。但是有没有发现，已经不是没有定义的命令那种提示了(`command not found`)，从信息来看是没有权限。给一下权限：

```shell
chmod a+x hw
```

再执行上面的命令，ok，妥妥的 Hello world。有人该不乐意了，个你整个 Hello world 嘚瑟个啥劲呀。你可别小看这个 Hellow world，简直是开启新世界的一把钥匙，你可以使用 nodejs 的一切功能。比如这样：

```js
#!/usr/bin/env node
var fs = require('fs');

fs.copy
fs.past
fs.rename
fs.replace
```

一切文件的复制粘贴和简单改内容的操作都可以自动化了，当然上面 `fs.` 的那段代码是伪代码，你可以去 NodeJs 官网查看具体的 API，传送门:[中文API](http://nodejs.cn/api/fs.html)。

配合 js 的原生功能，一些定时任务也可以写了。通过文件监听还能统计你写代码的时间。能干多少事就取决于你的 NodeJs 的掌握程度了。

## 目录结构

```
${package root}
    ├── package.json 包文件
    ├── bin 命令执行的入口文件，对应 package.json 的 bin 配置
    ├── lib 功能代码，提供 bin 所需的一切
    └── test 自动化测试脚本
```

package.json 的 bin 配置如下:

```json
{
  "bin": {
    "package-name": "bin/index.js"
  }
}
```

## 调试

[!图片](./img/cli.png)

命令行工具不在浏览器中运行，所以和传统的网页调试有很大的不同。用 VS Code 调试比较方便，首先在调试面板中配置 `configurations`:

```json
{
    "type": "node",
    "request": "launch",
    "name": "Launch Program",
    "program": "${workspaceFolder}/bin/index.js",
    "args": [
        "config",
        "--path",
        "/home/usr/username",

        // start 开始
        // "start"

        // 重置参数
        // "reset"
    ],
}
```

program 是入口配置，args 是参数配置，关于命令行的参数使用在下一章中详细讲。

## 开发

cli 全称 Command Line Interface，在开发上有一些通用的技能和注意事项。下面带你快速收获这些技能包。

### 参数

第一个必须掌握的 npm 包就是 commander，它能帮你提取命令行中输入的参数

### 数据交互

### 动画

## 造福世界

上面是自己小打小闹的自己玩，如果想把自己的玩具分享给全世界的小伙伴怎么搞？其实建一个 npm 包就可以了，唯一不同的就是在第一行加上下面这行代码：

```shell
#!/usr/bin/env node
```

npm 包的内容可以参考我另一篇文章 [npm](/#!/articles/npm)，你可以完全手动完成然后发布，也可以用一些工具，比如 Yeoman：

```shell
sudo npm install -g yo
sudo npm install -g generator-cli-starter
yo cli-starter
```

注：Yeoman，直译“仆人”，一个通用的脚手架系统，更多信息参阅[官网](http://www.yowebapp.com/)。

## 我写的几个工具

每次登陆远程服务器都要敲一串很长的命令，其实把这个命令直接新进文件(文件名是 ssh-relay)就可以：

```shell
// 内容
ssh 远程服务器地址
// 命令
ssh-relay
```

用来操作git的工具....持续编写中

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    sudo apt-get install libssl-dev

https://github.com/nodegit/nodegit

## 参考

http://www.yowebapp.com/learning/index.html

https://segmentfault.com/a/1190000002810318

https://github.com/alonalon/get-ip
