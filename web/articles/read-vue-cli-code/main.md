# Vue-cli 源码解读

> Vue-cli 是创建 Vue 项目的脚手架，但是不像 Angular 和 React 脚手架那样提供大而全的功能，而是让使用者通过学习其他开源工具(如 Express，webpack 等)来根据自己的项目定制脚手架。两种思路各有优劣，这里不做评判，关于这一点可以在知乎看 大漠穷秋 和 尤雨溪 的论战。由于 Vue-cli 脚手架的特点，我们需要深入了解 Vue-cli 的源码，才能更好的配置自己的脚手架，所以这篇文章来了。cli -> Command Line Interface for batch scripting.

## 用到了那些库？

如果你对前端的开源项目保持关注，那么通过阅读 package.json 中的依赖你就能大体猜到这个脚手架有什么功能，采用那个方案实现的。Vue-cli 一共用到 53 个库，我们挑几个说一下。

- babel 系列，那意味着可以写 ES6 了；
- commander，看来能在命令行敲几行命令玩玩；
- express，有服务端的能力，不是个简单打包工具；
- postcss-loader，写样式不用加浏览器前缀了；
- vue 系列，哦 ~ 这是个 Vue 脚手架；
- webpack，可以随便玩包了；
- webpack-hot-middleware，看来不用手动刷页面了；
- eslint，编码规范检测也有了；
- mocha，单元测试也有了。

一眼瞥过去能看懂这些，还有什么能一眼看出来的欢迎补充。

## 目录

了解项目下的各个文件夹是干什么的，是一种读源码不错的开始：

    ${object-root}
        ├── bin  命令执行的入口文件，对应 package.json 的 bin 配置
        ├── docs 文档
        ├── lib  功能代码，提供 bin 所需的一切
        └── test 测试相关
    
其实最重要的就是 bin 和 lib 这两个文件夹了，之所以没有将代码全部写进 bin 我觉得有以下几点考虑(其实很多项目都是这么做的)：

一、bin 中的每个文件会比较大；

二、bin 中的内容提供一个二级目录的功能，具体实现交给 lib 中的模块，你可以从 bin 中找到你关心的内容然后进入到 lib 中查看细节，而不用把全部代码都看一遍。

三、一些公用的配置和功能模块可以抽离出来，A 和 B 公用的部分放在 A 和 B 任何一方都是不合理的。

## 整理流程和关键点

读一个库要把它能干什么时刻放在心里，这样不会“因为走的太久，而忘记为什么出发”。

- vue-init，初始化项目命令；
- vue-list，列出可选模板；
- vue-build，构建项目；
- vue，通过参数调用上面 3 个。

### vue list

先从最简单的 vue-list 说起，调用 github api 提供的接口，然后拼字符串打印出来。显然这货在断网环境下是玩不转的。这这段并不是很长的源码里，我们可以 get 两个新技能：

- https://api.github.com 原来世界上还存在这么个东东，我是如此的孤陋寡闻；
- 库 chalk，有了这个宝贝妈妈再也不用担心我的命名行输出不能高亮了。

官方提供了 6 套模板，帮助我们初始化不同类型(从技术栈的角度划分)的项目。

### vue init

用法：

    $ vue init <template-name> <project-name>

template-name 首先可以从官方提供的 6 套模板中选一套，也可以自定义一套模板，放在你的 github 上：

    $ vue init <username/repo> <project-name>

如果你不想开源你的模板，还可可以放在本地：

    $ vue init <~/fs/path/to-custom-template> <project-name>

上面这些就是 `vue init` 命令实现的功能，下面我们通过源码分析一下这些功能是怎么实现的。

首先是一段参数的定义 Usage，然后是一段帮助文档 Help，这些都不是重点我们直接跳过。从 Settings 开始进入重点，首先是处理模板和项目路径这两个输入值，然后判断项目路径是否存在，如果存在给出提示，并询问是否继续，代码就是下面这一段：

    if (exists(to)) {
        inquirer.prompt([{
            type: 'confirm',
            message: inPlace
                    ? 'Generate project in current directory?'
                    : 'Target directory exists. Continue?',
            name: 'ok'
        }], function (answers) {
            if (answers.ok) {
                run()
            }
        })
    } else {
        run()
    }

然后判断模板的类型，如果是本地模板那么直接复制，这部分逻辑在上面用到的 run 函数中：

    function run () {
        // check if template is local
        if (isLocalPath(template)) {
            ...
        }
        else {
            ...
        }
    }

而 isLocalPath 函数就来自 lib 文件夹下的一个自定义模块中。如果不是本地模板那就是远程模板，进入到 else 分支中。进入到 else 后做的第一件事就是检验 Node 版本：

    checkVersion(function () {
        // ...
    })

因为如果 Node 版本不够高，官方的模板根本跑不起来，看到这里还是佩服作者的，如果只把文件给你下载到本地其实他的本质工作已经做完了，但是你跑不起来会报错，如果是小白用户卡在这里可能就过不去了。回调函数中放的是版本检测没问后才执行的代码。

经过上面一个检测 Node 版本的小插曲后我们回到正题，本地模板的对立面就是远程模板，远程模板又分两种，上面提到过，一种官方模板，一种自定义模板，区分他们的方式也很简单，就是看输入值是否有斜杠：

    if (!hasSlash) {
        // 官方模板逻辑
    }
    else {
        // 自定义模板逻辑
    }

下载官方模板前，对是否包含 “#” 和 “-2.0” 两个字符串做了判断，来识别是 vue 1.0 还是 vue 2.0。直接从远程下载内容到本地，这里面有个东西挺好玩 -- `ora`，命令行中的 loading。还有一个 `download-git-repo`，用来下载 github repository。这两个库在写一些工具的时候很有用。

到目前为止，远程的模板已经下载到了本地，但是并没有写入本地文件夹，而是在本地内存里悬着，具体为什么，我们在下一趴揭晓。

### 自定义模板

自定义模板就是把官方模板用到的那套模板引擎流程做了规范，主要的有这么几点：

- 必须要有一个 template 文件夹；
- 以 meta.js 为配置文件；
- meta.js 中配置用户输入项 和 要过滤的文件。

上面这些不需要深入理解，只需要把官方模板复制一份出来，做简单的修改就可以。

说一下实现，vue cli 用了一个叫 metalsmith 的任务管理器，和 gulp 比较类似。然后依次执行下面任务：

- 收集用户输入；
- 根据用户输入过滤文件；
- 渲染模板。

这些操作在 lib/generate.js 中，关键代码摘录如下：

    metalsmith.use(askQuestions(opts.prompts))
        .use(filterFiles(opts.filters))
        .use(renderTemplateFiles(opts.skipInterpolation))

渲染模板用的是 consolidate.handlebars，consolidate 是 TJ 大神开发的集成模板引擎，支持很多模板引擎：

- [atpl](https://github.com/soywiz/atpl.js)
- [bracket](https://github.com/danlevan/bracket-template)
- [doT.js](https://github.com/olado/doT) [(website)](http://olado.github.io/doT/)
- [dust (unmaintained)](https://github.com/akdubya/dustjs) [(website)](http://akdubya.github.com/dustjs/)
- [dustjs-linkedin (maintained fork of dust)](https://github.com/linkedin/dustjs) [(website)](http://linkedin.github.io/dustjs/)
- [eco](https://github.com/sstephenson/eco)
- [ect](https://github.com/baryshev/ect) [(website)](http://ectjs.com/)
- [ejs](https://github.com/mde/ejs) [(website)](http://ejs.co/)
- [haml](https://github.com/visionmedia/haml.js)
- [haml-coffee](https://github.com/9elements/haml-coffee)
- [hamlet](https://github.com/gregwebs/hamlet.js)
- [handlebars](https://github.com/wycats/handlebars.js/) [(website)](http://handlebarsjs.com/)
- [hogan](https://github.com/twitter/hogan.js) [(website)](http://twitter.github.com/hogan.js/)
- [htmling](https://github.com/codemix/htmling)
- [jade](https://github.com/visionmedia/jade) [(website)](http://jade-lang.com/)
- [jazz](https://github.com/shinetech/jazz)
- [jqtpl](https://github.com/kof/jqtpl)
- [JUST](https://github.com/baryshev/just)
- [liquor](https://github.com/chjj/liquor)
- [lodash](https://github.com/bestiejs/lodash) [(website)](http://lodash.com/)
- [marko](https://github.com/marko-js/marko) [(website)](http://markojs.com)
- [mote](https://github.com/satchmorun/mote) [(website)](http://satchmorun.github.io/mote/)
- [mustache](https://github.com/janl/mustache.js)
- [nunjucks](https://github.com/mozilla/nunjucks) [(website)](https://mozilla.github.io/nunjucks)
- [pug (formerly jade)](https://github.com/pugjs/pug) [(website)](http://jade-lang.com/)
- [QEJS](https://github.com/jepso/QEJS)
- [ractive](https://github.com/Rich-Harris/Ractive)
- [react](https://github.com/facebook/react)
- [slm](https://github.com/slm-lang/slm)
- [swig (unmaintained)](https://github.com/paularmstrong/swig)
- [templayed](http://archan937.github.com/templayed.js/)
- [twig](https://github.com/justjohn/twig.js)
- [liquid](https://github.com/leizongmin/tinyliquid) [(website)](http://liquidmarkup.org/)
- [toffee](https://github.com/malgorithms/toffee)
- [underscore](https://github.com/documentcloud/underscore) [(website)](http://underscorejs.org/#template)
- [vash](https://github.com/kirbysayshi/vash)
- [walrus](https://github.com/jeremyruppel/walrus) [(website)](http://documentup.com/jeremyruppel/walrus/)
- [whiskers](https://github.com/gsf/whiskers.js)    

也就是在一些复杂的项目中，不同类型的文件可以使用不同的模板，而 handlebars 是一个比较简单的模板引擎，用法大概是这样：

    var render = require('consolidate').handlebars.render
    render(fileStr, data, function (err, res) {
        // ...
    })

## 整理用到的库

consolidate，集成模板引擎，。

chalk，命令行高亮。

commander，命令行辅助，TJ 大神的库。还有更简单的库 -- yargs。

inquirer，收集用户输入，支持单选，多选，文本输入，密码输入，更具前面输入判断是否展示当前项，校验，加工输入

download-git-repo，下载远程仓库。容易被忽略的一点就是带了 ssh 的功能，可以用来从私有库下载，回调函数执行的时候文件没有被保存到本地硬盘，可以在回调函数中加工下载文件。

metalsmith，构建静态网站的工具，每一个加工的工序就是一个插件。

## 参考

https://github.com/vuejs/vue-cli

https://github.com/vuejs-templates/webpack

http://blog.fens.me/nodejs-commander/

https://github.com/segmentio/metalsmith

https://github.com/tj/consolidate.js

https://github.com/wycats/handlebars.js/

## 相关文章

https://zhuanlan.zhihu.com/p/25000026

https://segmentfault.com/a/1190000009803941

https://segmentfault.com/q/1010000007948863

https://github.com/dwqs/blog/issues/56

## 遗留的问题

如何调试 nodejs commander？ debug nodejs commander in vscode 