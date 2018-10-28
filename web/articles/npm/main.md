# NPM

> NPM 的全称是 Node Package Manager，原本是一个 NodeJS 包管理和分发平台，但是浏览器端运行的 JS 也缺一个第三方包管理平台，后来在社区的推动下 NPM 可以管理全部的第三方 JS 包，包括 Node 端和浏览器端，浏览器到目前为止还没有原生支持包管理，现在浏览器端项目的包管理一般借助脚手架来实现。NPM 可以算作前端的必备技能，这里介绍一些基础知识和典型场景下的技巧。

## 一个包的基本组成

NPM 是一个包管理平台，它对包做了一些规范，一些重要文件的描述如下：

`package.json` 包的配置文件(一些重要的说明也在里面，依赖，版本，描述)；

`README.md` 包的说明书；

`LICENSE` 这个文件存放[许可协议](/index.html#!/articles/license)；

`bin` 如果是 node 包，是命令执行的入口文件，对应 package.json 的 bin 配置；

`lib`  功能代码，提供 bin 所需的一切；

`src` 如果是浏览器端的包，源码会放在这里；

`dist` 存放浏览器端包的压缩代码，方便直接被下载使用，在模块化和自动构建盛行的今天可省略；

`test` 自动化测试文件。

## 安装一个依赖包

自动把模块和版本号添加到dependencies部分。

```shell
npm install module-name --save 
```

自动把模块和版本号添加到devDependencies部分。

```shell
npm install module-name --save-dev
```

`npm install`默认会安转两种依赖相当于`npm install --production` + `npm install --dev`，如果你只是单纯的使用这个包而不需要进行一些改动测试之类的可以使用前一个，如果想进一步了解。

另外，如果想全局安装可以加参数 `-g`，像这样：`npm install -g <package-name>`。

还可以从指定路径安装需要的包：

```shell
npm --registry=https://registry.npm.taobao.org install cnpm -g
```

如果装错了你可以不用管，但是如果有一点小洁癖的话可以卸载掉，加`--save`同样会将`package.json` 中的配置移除掉：

```shell
npm uninstall module-name --save
```

### 依赖包版本的控制

如果我们没有精力去实时关注依赖包的更新，或者依赖包是一个不稳定版本，API 还处在一个快速迭代的时期，那么我们最好依赖一个特定的版本。根据自己的需求来指定版本依赖方式，下面是来自官方文档的部分译文。

Dependencies 用一个包名的简单哈希来描述包的版本范围(译者注：简单地说就是键值对"vue": "^2.1.4")。版本范围通过一个字符串来设置，该字符串可以有一个或多个间隔描述符。依赖包还可以通过源码或 git 的 URL来指定。 

注意不要将测试工具和打包转换等工具的依赖放到 Dependencies 中。

- `^version` 能兼容所配置版本
- `version1 - version2`
- `range1 || range2`

[语法规则原文](https://github.com/npm/npm/blob/2e3776bf5676bc24fec6239a3420f377fe98acde/doc/files/package.json.md#dependencies)

Git URLs 可以是下面格式：

```shell
git://github.com/user/project.git#commit-ish
git+ssh://user@hostname:project.git#commit-ish
git+ssh://user@hostname/project.git#commit-ish
git+http://user@hostname/project/blah.git#commit-ish
git+https://user@hostname/project/blah.git#commit-ish
```

## dependencies 和 devDependencies

简单的说 dependencies 是生产环境依赖的包，上线的时候需要将 dependencies 下的包打包；而 devDependencies 是开发这个包时需要的一些依赖，也就是说脱离了这个包的开发 devDependencies 可以被忽略。如果其他包引用了当前包，devDependencies 下的依赖是不会被安装的，dependencies 下的依赖 npm 会和其他包的依赖进行全集计算，使安装的包尽可能少。

如果写的是某个库的或框架的插件，还有一种 dependencies 类型是 peerDependencies，应该在 peerDependencies 中写一份，再在 devDependencies 写一份。具体的原因参考[开发组件库时 Vue 应该放哪儿](https://cnodejs.org/topic/5819624a1a9a7d9909531395)

## 安装依赖

一个项目的依赖包一般是不被提交的，这就需要在将项目克隆到本地后手动安转依赖

```shell
npm install
```

## 常用命令

`npm init`: 初始化 package.json 文件，根据提示输入一些关键信息就可以将文件初始化完成。

`npm ls -g`: 查看所有全局安装的模块。如果你不想看到那么多层的依赖，那就加个参数吧：`sudo npm ls -g --depth 0`。

`npm prune`: 如果你的 node_modules 目录中已经安装了一个 package，但是package.json 中并没有对该 package 做依赖，那么这个 package 就应该被删除。这时如果执行npm ls命令则指示有一个 “npm ERR! extraneous: ...”。为了清理代码，你需要执行npm prune。

`npm uninstall <package-name>`: 卸载包。

`npm root -g`: 查看全局安装路径。

## 多版本 node 管理

在维护一些老项目的时候，一些工具依赖于某一版本的 node 才能运行起来，这就需要在不同的版本之间来回切换，这时你需要一个多版本管理工具 `n`，没错这个工具的名字就这么简短，只有一个字母，下面是使用方法：

```shell
// 安装多版本管理工具
sudo npm install -g n
// 安装6.0.0版本的 node
n 6.0.0
// 查看和切换 node 版本，上下键选版本，回车确定
n
// 移除某一版本
n rm 6.0.0
```

另外你可以直接打开文件夹查看 node 的版本，也可以直接删除某一版本的 node(因为经常会出现安装失败的情况所以需要删除后重装)

```shell
/usr/local/n/versions/node
```

node 版本的偶数版是稳定版，使用 `n ls` 可以查看全部发布过的 node 版本，下面是一些关键的版本：

```shell
0.0.1    // 里程碑的起点
0.1.104  // 0.1 版本的最后一个版本
0.12.12  // 这一版本的工具很多，很多没有持续维护的工具都对此版本有强依赖
4.0.0    // node 和 io 合并直接跳到 io 的下一个非兼容版本
4.4.4
5.11.0
6.0.0
7.0.0
8.0.0
```

关于版本管理，可以查看我的另一篇博客 [语义化版本](/index.html#!/articles/semantic-versioning)。

## 常见问题

### 缺 package.json 文件

`npm ERR! registry error parsing json` 填写了 `--save` 或者 `--save-dev` 参数但是当前位置没有 package.json 文件，需要先执行 `npm init`；

### 依赖安装失败

国内环境受到墙的影响，可能安装缓慢，也可能大面积安装失败，如果大面积安装失败可以尝试 `cnpm` 这样的国内镜像，或者翻墙。个别安装失败会在安装或运行的时候提示某个包找不到，这时需要单独安装缺失的包，npm 2.0 之后依赖的依赖不会放在依赖下面的 node_modules，而是会放在依赖的同级，所以只要在项目路径下安装缺失的包就可以。如果以上方法都不行，先去喝杯咖啡回来可能就可以装上了...

### 依赖变更

锁定依赖版本防止被人上房抽梯，由 left-pad 引发的思考。如果某个包不遵守开原版本规范，有了不兼容升级却只改了一个小版本，npm 平台并不限制这种行为，但是 npm 是不允许修改已发布版本的，所以版本锁定是一个较为稳妥的方案。

### 引用逻辑

先说一下定义文件的读取规则：

- .js;
- 文件夹，读取 package.json 的 main 设置，然后根据设置引用文件;
- 文件夹，读取不到 package.json 的直接引用 index.js;
- 注意 .json 并不能直接被包引用识别。

自定义文件像这样引用 `import packageName from './package-path`，依赖包的引用像这样`import packageName from 'package-name`。依赖包的引用规则：

- 先找缓存中是否有;
- 然后当先项目下的 node_modules 文件夹下，如果找到了添加到缓存下;
- 项目上一层目录的 node_modules，如果找到了添加到缓存下。

ES6 与 CommonJs 的引用略有不同，具体参考我的另一篇学习笔记[ ES6 学习笔记 - Part 3](/index.html#!/articles/es6-3)。

### permission denied

`Error: EACCES: permission denied` 这段报错也是较为常见的，尤其是一些不太出名的需要全局安装的包，在执行的时候可能会报这个错，直译就是“许可被拒绝”，也就是文件权限的问题，最简单粗暴的方法就是把 node_modules 的权限改成 777，污染小一点的方案是改单个工具的文件所属。比如我遇到的问题是公司全家桶 yog2，可以这样

```shell
sudo chown -R $USER /usr/local/lib/node_modules/yog2
```

再补充一下前端工具经常用的的路径：

```shell
// node 全局命令的入口
/usr/local/bin
// 全局 node_modules路径
/usr/local/lib/node_modules
```

## 发布一个包

首先去 [npm 官网](https://www.npmjs.com/)注册账户;
    
然后登录

```shell
npm login
```

最后发布

```
sudo npm publish
```

实测我开发的一个中间件 `koa-auto-path-router` 从发布到可以搜到只需要 3 分钟。如果要发布新版本记得手动修改 package.json 中的版本号。发布后在项目中的更新命令：

```shell
npm update <package name>
```

删除一个包

```shell
npm --force unpublish 包名
```

查看其它配置:

```shell
npm config ls -l
// 查看当前用户
npm whoami
```

退出登录

```shell
    npm logout
```

有一次发布包的时候遇到个小问题，报错信息如下：

```shell
    npm ERR! you must verify your email before publishing a new package: https://www.npmjs.com/email-edit :
```

首先包中配置的邮箱要和 npm 账户中的邮箱要匹配，如果邮箱改变了需要重新验证，npm 会发验证邮件到邮箱，你需要点一下。有段时间翻墙有点问题，发现配 gmail 死活 publish 不上去，后来换成 163 邮箱就上去了。

## 收集常用的包

### 浏览器端、客户端

- js-cookie 浏览器端操作 cookie
- clipboard 复制，支持 IE9+

### 服务端、CLI

- consolidate，集成模板引擎；

- chalk，命令行高亮；

- commander，命令行辅助，TJ 大神的库。还有更简单的库 -- yargs；

- inquirer，收集用户输入，支持单选，多选，文本输入，密码输入，更具前面输入判断是否展示当前项，校验，加工输入；

- download-git-repo，下载远程仓库。容易被忽略的一点就是带了 ssh 的功能，可以用来从私有库下载，回调函数执行的时候文件没有被保存到本地硬盘，可以在回调函数中加工下载文件；

- metalsmith，构建静态网站的工具，每一个加工的工序就是一个插件；

## 参考资料

[官方文档](https://docs.npmjs.com)

[package.json 的官方说明](https://github.com/npm/npm/blob/2e3776bf5676bc24fec6239a3420f377fe98acde/doc/files/package.json.md)

[What's the difference between dependencies, devDependencies and peerDependencies in npm package.json file?](http://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies)

[开发组件库时 Vue 应该放哪儿：devDependencies or peerDependencies？](https://cnodejs.org/topic/5819624a1a9a7d9909531395)
	
[记npm包开发全过程](http://www.w2bc.com/Article/86039)	
