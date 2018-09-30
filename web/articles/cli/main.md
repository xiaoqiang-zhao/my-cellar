# cli - 匠者造器

> 用前端的知识来写命令行工具，能敲几个字母搞定的事情我们就不要浪费生命了，这篇文章手把手从零叫你写命令行工具。

## 前置知识点

npm 全局安装一个包的时候到底偷偷摸摸做了那些事？

首先是从网上把这个包本身(敲黑板划重点：不包括依赖的包)下载下来；

然后根据参数下载依赖(依赖分 dependencies 和 devDependencies，具体出门左转[npm](/#!/articles/npm))，安装的目录 Mac 下是 `/usr/local/lib/node_modules`；

如果依赖没问题会读取 `package.json` 中的 `bin` 配置，然后把文件写入到 `/usr/local/bin/` 目录下，这个目录下放的是全局命令的，这个路径可能因为系统的不同而不同，可以在环境变量配置文件查看。我们在命令行中敲的任何一个用户命令都要先从这个文件夹找。

我们看一下 `gulp` 命令中有点啥：

    #!/usr/bin/env node

    'use strict';
    var gutil = require('gulp-util');
    ...

为了简单只看 4 行代码。env 是一个命令，参数是 node，就是在程序中用 nodejs 的引擎，也就是 v8 引擎，去执行下面的代码，这样就不需要知道 node 装在哪里了。

一般安装全局包都需要 `sudo`，这货是干啥的？

我们看到上面有很多文件拷贝，而且涉及到 `/usr/local/bin/` 这样的军机要地，而且在系统中不是每个文件都可以被执行的，这有涉及到文件的权限问题，这里不展开，想了解更多出门左转我的另一篇文章 [Linux 笔记](/#!/articles/linux)。

这么多事不是谁想干就让干的，`sudo` 通俗一点可以理解为赐下尚方宝剑，想砍哪个砍哪个，专业一点讲就是赋予一系列执行的权限。

## 简单粗暴

我们做点简单粗暴的事爽一下，建一个文件内如如下：

    #!/usr/bin/env node

    console.log('Hello world.');

然后拷贝到 `/usr/local/bin/`，然后就可以在命令行中敲个命令爽一下了：

    cubao

靠，报了个错：`permission denied: cubao`，没爽成。但是有没有发现，已经不是没有定义的命令那种提示了(`command not found`)，从信息来看是没有权限。好给一下权限：

    chmod a+x cubao

再执行上面的命令，ok，妥妥的 Hello world。有人该不乐意了，个你整个 Hello world 嘚瑟个啥劲呀。你可别小看这个 Hellow world，简直是开启新世界的一把钥匙，你可以使用 nodejs 的一切功能。比如这样：

    #!/usr/bin/env node
    var fs = require('fs');

    fs.copy
    fs.past
    fs.rename
    fs.replace

一切文件的复制粘贴和简单改内容的操作都可以自动化了，当然上面 `fs.` 的那段代码是伪代码，你可以去 NodeJs 官网查看具体的 API，传送门:[中文API](http://nodejs.cn/api/fs.html)。

配合 js 的原生功能，一些定时任务也可以写了。通过文件监听还能统计你写代码的时间。能干多少事就取决于你的 NodeJs 的掌握程度了。

## 造福世界

上面是自己小打小闹的自己玩，如果想把自己的玩具分享给全世界的小伙伴怎么搞？其实建一个 npm 包就可以了，唯一不同的就是在第一行加上下面这行代码：

    #!/usr/bin/env node

npm 包的内容可以参考我另一篇文章 [npm](/#!/articles/npm)，你可以完全手动完成然后发布，也可以用一些工具，比如 Yeoman：

    sudo npm install -g yo
    sudo npm install -g generator-cli-starter
    yo cli-starter

注：Yeoman，直译“仆人”，一个通用的脚手架系统，更多信息参阅[官网](http://www.yowebapp.com/)。

## 我写的几个工具

每次登陆远程服务器都要敲一串很长的命令，其实把这个命令直接新进文件(文件名是 ssh-relay)就可以：

    // 内容
    ssh 远程服务器地址
    // 命令
    ssh-relay

用来操作git的工具....持续编写中

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    sudo apt-get install libssl-dev

https://github.com/nodegit/nodegit

## 参考

http://www.yowebapp.com/learning/index.html

https://segmentfault.com/a/1190000002810318

https://github.com/alonalon/get-ip
