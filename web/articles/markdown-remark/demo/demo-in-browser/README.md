# demo-in-browser

> A Vue.js project

## Build Setup

``` bash
# install dependencies
# 安装依赖
npm install

# serve with hot reload at localhost:9090
# 在 localhost:9090 启动项目并热加载
npm run dev localhost:9090

# build for production with minification
# 打包压缩
npm run build

# build for production and view the bundle analyzer report
# 打包压缩并查看报告
npm run build --report

# build for qa, do not uglify code
# 打包但不压缩不混淆代码
npm run qa

# run server for dist
# 为 dist 中的代码提供运行容器
npm run server
```

## mock

supported server mock data, integrated [mockjs](http://mockjs.com/examples.html), supported several types of data including image. Under mock fold, the fold path is the sport path, detail in sport `a`.

支持服务器端的 mock 数据，集成了 [mockjs](http://mockjs.com/examples.html)，支持包括图片在内的各种数据。在 mock 下直接以文件夹路径作为接口路径，具体写法可以参见接口 `a`。

## About Code Style

Text editor plugins: https://standardjs.com/#are-there-text-editor-plugins

If you used vscode-fecs-plugin in other project, find the plugin in left and last icon, and then click the "Disable(Workspace)".

如果你在其他项目使用了 vscode-fecs-plugin，点击右边最后一个图标找到该插件，在设置中点击“禁用(工作区)”

## contfont

没有图标的项目现在真是太少了，传统的小图标用小图片来实现，会产生一些问题，iconfont 就是为了解决这些问题而引入的，具体如下：

- 放大或缩小失真，iconfont 用 svg 来处理解决此问题；
- 为了提高性能要合并成雪碧图不方便管理，iconfont 用字体库方便管理；
- 多个颜色的小图标用图片需要多个，iconfont 可以像改变文字一样改变图标颜色。

怎么用呢？如下：

- 首先你要有个账号：http://www.iconfont.cn/
- 然后建立一个项目；
- 选择图标加到项目中，然后下载到本地；
- 解压添加到 assets 目录下；
- 在项目代码中引入；
- 在标签上添加 class：<div class="iconfont icon-item-right">。

## 目录结构

    ${src}
        ├── assets      存放静态文件
        ├── components  存放公共组件 
        ├── pages       存放页面
        ├── router      路由
        ├── App.js      单页应用中，Vue 组件的根节点
        └── main.js     入口文件，公共资源在这里加载

由于在单页应用中一切兼组件，所以全部的组件都放在 components 中反而不容易快速定位某个功能的代码，把页面全部放在 pages 中，pages 中的每个组件就是一个页面，和 router 中的配置一一对应。如果多个页面用到了相同的功能，或者功能本身不依赖于业务比较独立，那么把这类型的功能封装成组件放进 components 中。
