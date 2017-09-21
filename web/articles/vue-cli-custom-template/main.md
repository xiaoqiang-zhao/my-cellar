# vue-cli 定义模板

> 由于 vue-cli 官方提供的模板不能满足前后端分离的工作模式(工具链层面的)，需要定制自己的模板，这篇文章主要讲怎样定制一个模板，并介绍一下我定制的模板特性。

## 站在巨人的肩上

我们的总体思路是最大限度的利用官方已有模板，进行改造和增强。我在 github 上建了一个 organization: [vuejs-custom-templates-aggregate](https://github.com/vuejs-custom-templates-aggregate) ---- vue 自定义模板集合。然后将 https://github.com/vuejs-templates/webpack 项目 fork 进 vuejs-custom-templates-aggregate，我给他取了个名字叫 spa。之所以没叫 webpack-spa，是应为 browserify 用的人越来越少了，大家提到包加载器基本默认就是 webpack，另外我想从应用场景来区分模板，并大胆的幻想将来出现的其他模板是：

- spa 纯前端单页应用；
- full-stack-spa 全栈单页应用，后端提供业务模板和数据库；
- spa-ts 单页应用 typescript 版；
- full-stack-spa-ts 全栈单页应用 typescript 版；
- mpa 纯前端多页应用。

然后我们将 spa 用 git clone 到本地，进行下一步。

## 改造前的观察

先看看有什么功能，看着有用的保留，没用的去除：

- Project name 保持不变；
- Project description 保持不变；
- Author 保持不变；
- Vue build 去掉，直接采用 Runtime-only 方案；
- Install vue-router 去掉，直接选中；
- ESLint 改为默认选中，需要增强，配置成自己公司的规范；
- Pick an ESLint preset
- Setup unit tests with Karma + Mocha 保留；
- Setup e2e tests with Nightwatch 保留；

### Compiler

讲一下 Runtime + Compiler 和 Runtime-only 的区别，首先我们讲知其然：

- Runtime + Compiler: 支持 template，如果用了 SSR，前后端要同构，那么不能用；
- Runtime-only: 体积小 6KB，不支持 template，模板只能写在 .vue 文件中。

所谓的“支持 template”，就是下面这种形式：

    export default {
        name: 'hello',
        template: '<h1>{{msg}}</h1>',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }

两种模式对下面写法都是支持的：

    <template src="./index.tpl"></template>
    <script>
        export default {
        name: 'hello',
            data() {
                return {
                    msg: 'Welcome to Your Vue.js App'
                }
            }
        }
    </script>

然后我们再探一下因 -- 知其所以然，模板转化成 html 并绑定事件有一个必不可少了步骤，那就是将模板转换成函数，这一步称为编译，数据和 html 标签的融合并输出 Dom 结构就是在编译后的函数中进行的，如果在打包的过程中完成编译，并将编译产生的函数打入代码中，那么发布出来的代码就没有必要包含这部分功能了，这部分功能压缩后所占的体积就是上面提到的 6KB。

还有另外一个问题，这个开关是在哪里控制的？
在 build/webpack.base.conf.js 中：

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    }

默认是不提供 Compiler 功能的，如果我们需要，把 vue 的引用指向 vue 代码包中的另一个文件 -- vue.esm.js，这个文件包含了 Compiler 功能。可以看到添加时很简单的，所以我们这里去掉 Compiler 功能的支持，万一有需要可以手动加回来。

### ESLint

本来不打算讲这一块的，但是发现有几处需要注意的地方，虽然比较简单，但如果不说很多人不知道。eslint 是用 node 写的，所以需要有 node 环境，并全局安装 eslint 和 其插件，IDE 才能玩的转：

    sudo npm install -g eslint
    // 为了能检测 .vue 文件，还需要装 eslint 插件
    sudo npm install -g eslint-plugin-html

vs code 需要加配置：

    "eslint.options": {
        "configFile": "./.eslintrc.js",
        "plugins": ["html"]
    },
    "eslint.validate": [
        "javascript",
        "html",
        "vue"
    ]

现在的规范有 3 种类型：

- standard 互联网通用，约束较轻；
- airbnb 约束较具体；
- none 没有约束。

国内互联网公司的编码规范，找到了百度的(欢迎补充其他厂的):

规范文档：https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md

配置文件：https://github.com/ecomfe/fecs/tree/master/lib

注意这套框架中没有 CSS 格式检测，可以扩展添加 csshint。

最后注意一点，如果把编码规范的 level 设为 2(也就是 error)，那么在编码格式有问题的时候运行会直接报错。

- "off" 或 0 - 关闭规则；
- "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)；
- "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)。

## 开始改造现有功能

写 vue 模板并没有什么特别好的方法，因为模板改完之后需要编译后才能运行，所以我们先用现有模板生成一份比较全的，然后把相关依赖装好，提交到 github 上，然后改这个模板生成后的项目，改完之后把修改点同步回模板中，这是我能想到的最简单快捷的方式。

### router

这个是一个项目必须的功能，如果只想写个 Demo 那直接用官方的模板好了。我们首先需要改配置：

首先删除下面的配置，使不再询问是否安装router：

    // meta.js，
    "router": {
      "type": "confirm",
      "message": "Install vue-router?"
    },

然后去掉多虑设置，使其恒定不过滤：

    "filters": {
      ".eslintrc.js": "lint",
      ".eslintignore": "lint",
      "config/test.env.js": "unit || e2e",
      "test/unit/**/*": "unit",
      "build/webpack.test.conf.js": "unit",
      "test/e2e/**/*": "e2e",
      // 删掉下面一行
      "src/router/**/*": "router"
    },

还有 template/src/main.js 需要改，一大堆判断真是复杂，直接去掉，最后像下面这样：

    import Vue from 'vue';
    import App from './App';
    import router from './router';

    Vue.config.productionTip = false;
    new Vue({
      el: '#app',
      router,
      render: h => h(App),
      components: { App }
    });

最后把 template/package.json 里面对 `vue-router` 包的判断去掉，这个功能就改造完成了，我们试着跑一下:

    //            本地模板路径        测试项目名
    vue init ~/code-github/spa spa-router
    cd spa-router
    yarn
    npm run dev

耶，完美✌️.

注：
- 1、不要测试会快很多；
- 2、我们打算干掉编码规范，所以选择 node

### Vue build



## 添加 Mock 功能

### 原有功能分析

先看看原来的和 server 有关的功能，首先从 package.json 中了解到启动开发环境是从 dev-server.js 文件开始的。首先通过 express 启动 Web 服务：

    var app = express()
    // ...
    var server = app.listen(port)

然后通过中间件 webpack-hot-middleware 路由静态文件：

    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    })

再然后通过中间件 webpack-hot-middleware 提供热加载：

    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: false,
        heartbeat: 2000
    })

热加载需要 webpack 插件配合才能实现：

    // 当 html 模板改变时，触发页面重新加载
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' })
            cb()
        })
    })

再然后是代理，用的中间件 http-proxy-middleware，可以设置多个代理：

    Object.keys(proxyTable).forEach(function (context) {
        var options = proxyTable[context]
        if (typeof options === 'string') {
            options = { target: options }
        }
        app.use(proxyMiddleware(options.filter || context, options))
    })

最后用 connect-history-api-fallback 中间件支持 HTML5 History，原理就是将所有的 text/html 请求都打到 /index.html 上，当然这个是可以设置的，像下面这样：

    var history = require('connect-history-api-fallback');
    app.use(history({
        index: '/default.html'
    }));

其实看到这里我们就明白了，官方想让我们通过代理直接调用 server，但是我们开发的流程一般是定完接口前后端个开发各的，然后联调。对于全栈来说启两个项目很显然来回切换很麻烦，但是官方并没有提供全栈的模板，我们后面会完善。

### 功能改造和增强

找了很久没找到一个 start 数较高的自动路由中间件(根据访问路径直接读取相同路径模块并返回结果)，可能因为这种包对于后台开发来说太鸡肋，像下面这种路由需要将 id 写死：

    articles/:id

但是在脚手架 Mock 功能上这是很通用的需求，其中最核心的功能需求是不需要每新加一个接口都要改配置文件，直接添加文件就好了，这也是一种思路的体现 -- 流程优于配置。所以决定先造个轮子: 
[express-auto-path-router](https://github.com/longze/express-auto-path-router)。
怎么开发中间件这里就不展开了，解决的主要问题就是省略路由配置文件，路由和功能的对应采用一种逻辑关系，规则如下：

    GET /a -> /GET/a/index.js
    POST /a -> /POST/a/index.js

这对于我们写 Mock 数据是很便捷的方式，我们先把 axios 加进来：

    // mian.js
    import axios from 'axios';
    // 将axios挂载到prototype上，在组件中可以直接使用this.$http访问
    Vue.prototype.$http = axios;

然后加 Mock 功能，之前只有代理模式，现在我们要加一种提供数据的模式 Mock，考虑到后面我们还要加 全栈模式，这里把配置顺便升一下级：

    // config/index.js
    dataType: 'mock',  // proxy:代理; mock:模拟; full-stack:全栈(默认此项)
    proxyTable: {
      '/': {
        target: 'http://172.0.0.1:8800/'
      }
    },
    mockTable: {
      // 相对于整个项目的路径
      rootPath: './mock/'
    }

然后改造路由，添加 mock 路由和 proxy 路由以及全栈路由的区分逻辑，关键代码如下：

    // build/dev-server.js
    var expressAutoPathRouter = require('express-auto-path-router')
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware
    if (config.dev.dataType === 'proxy') {
    Object.keys(config.dev.proxyTable).forEach(function (context) {
        var options = proxyTable[context]
        if (typeof options === 'string') {
        options = { target: options }
        }
        app.use(proxyMiddleware(options.filter || context, options))
      })
    }
    // https://github.com/longze/express-auto-path-router
    else if (config.dev.dataType === 'mock') {
      app.use(expressAutoPathRouter(config.dev.mockTable.rootPath))
    }

最后添加 mock 数据的文件夹和客户端的调用逻辑：

    // mock 数据的写法
    // mock/GET/a/index.js
    let mock = require('mockjs');
    module.exports = function (param) {
        return {
            status: 0,
            statusInfo: '',
            data: mock.Random.cparagraph()
        };
    };
    // 前端调用
    // src/components/Hello.vue
    data () {
        this.$http.get('/a').then(res => {
            console.log('mock 数据支持成功', res)
        })
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }

到此为止 mock 数据功能就基本添加完了，把添加的代码同步到模板中就不展开了。

## 参考

http://gcdn.gcpowertools.com.cn/showtopic-36912-1-3.html?utm_source=segmentfault&utm_medium=referral&utm_campaign=20170417&utm_content=36912

http://eslint.cn/docs/rules/
