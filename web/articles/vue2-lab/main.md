# vue2-lab

> vue2.0 实验室，探索vue从起步到复杂的具体操作流程。

## 从那些依赖开始

要想跑起来一个简单的页面，需要各种工具的辅助，前端早已不是那个写个静态页面就能跑的年代了。

首先是 vue，版本在这里找：[git releases](https://github.com/vuejs/vue/releases)，好最新版：v2.1.4，我们就安装这个。

    npm i vue@2.1.4 --save

然后是 webpack 包管理工具，老办法：[git releases](https://github.com/webpack/webpack/releases)，最新版：v1.14.0。

    npm i webpack@1.14.0 --save

## 一个简单的页面要跑起来

先准备`dist/index.html` 和 `src/index.js`静态文件，我们这一趴只把包管理搞定。

这里需要 npm 和 webpack 的知识，可以出门右转到[我的博客](https://longze.github.io/#!/)看相关内容。

本来打算像下面这样在脚本里面配置一行脚本搞定打包：

    "scripts": {
        "lab-start": "webpack ./config/webpack.config.start.js"
    }

但是发现行不通，离开了 config 文件夹就玩不转了(知道怎么解决的劳烦告诉一下，红包答谢)。然后查看 vuecli 的源码是用 node 脚本包装了一下搞定的，好我也照猫画虎的搞一下，写一个 node 脚本：

    var webpack = require('webpack');
    var webpackConfig = require('../config/webpack.config');
    
    webpack(webpackConfig, function (err, stats) {
        // 打包完可以干一些事情
    });
    
补上脚本配置：
    
    "scripts": {
        "build-pack": "node ./build/build-pack.js"
    }

终于可以运行一下脚本了：

    run build-pack

运行之后可以看到在 `/dist/` 下面多了一个 `index.js` 文件，恭喜恭喜，终于把包打出来了，直接在浏览器中查看 `dist/index.html`，看到了下面的页面：

![页面展示-1](/articles/vue2-lab/img/1.png)