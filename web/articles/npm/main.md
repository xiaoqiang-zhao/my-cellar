# NPM

> NPM的全称是Node Package Manager，是一个NodeJS包管理和分发工具，但是在实际的操作中此管理器已经不止是 NodeJs 的包管理了，浏览器端的资源管理也可以借助此工具完成，前端的各种辅助工具也对此有依赖，所以 NPM 基本可以算作前端的必备技能，这里介绍一些基础知识和典型场景下的技巧。

## 一个包的基本组成

`package.json` 包的配置文件(一些重要的说明也在里面)；

`README.md` 包的说明书；

`LICENSE` 这个文件存放[许可协议](/index.html#!/articles/license)；

`bin` 这个文件夹中存放功能代码；

`test` 自动化测试文件。

## 安装一个依赖包

自动把模块和版本号添加到dependencies部分。
 
	npm install module-name -save 

自动把模块和版本号添加到devDependencies部分。

	npm install module-name -save-dve

`npm install`默认会安转两种依赖相当于`npm install --production` + `npm install --dev`，如果你只是单纯的使用这个包而不需要进行一些改动测试之类的可以使用前一个，如果随着深入了解需要想进一步了解再将后一条命令执行以下就可以了。

另外参数 `npm install -g` 为全局安装。

还可以从指定路径安装需要的包：

	npm --registry=https://registry.npm.taobao.org install cnpm -g

如果装错了你可以不用管，但是如果有一点小洁癖的话可以卸载掉，加`-save`同样会将`package.json` 中的配置移除掉：

	npm uninstall module-name -save

### 依赖包版本的控制

如果我们没有精力去实时关注依赖包的更新，或者依赖包是一个不稳定版本，API 还处在一个快速迭代的时期，那么我们最好依赖一个特定的版本。根据自己的需求来指定版本依赖方式，下面是来自官方文档的部分译文。

Dependencies 用一个包名的简单哈希来描述包的版本范围(译者注：简单地说就是键值对"vue": "^2.1.4")。版本范围通过一个字符串来设置，该字符串可以有一个或多个间隔描述符。依赖包还可以通过源码或 git 的 URL来指定。 

注意不要讲测试工具和打包转换等工具的依赖放到 Dependencies 中。

- `^version` 能兼容所配置版本
- `version1 - version2`
- `range1 || range2`

[语法规则原文](https://github.com/npm/npm/blob/2e3776bf5676bc24fec6239a3420f377fe98acde/doc/files/package.json.md#dependencies)

## dependencies 和 devDependencies

简单的说 dependencies 是生产环境依赖的包，上线的时候需要将 dependencies 下的包打包；而 devDependencies 是开发这个包时需要的一些依赖，也就是说脱离了这个包的开发 devDependencies 可以被忽略。如果其他包引用了当前包，devDependencies 下的依赖是不会被安装的，dependencies 下的依赖 npm 会和其他包的依赖进行全集计算，使安装的包尽可能少。

## 安装依赖

一个项目的依赖包一般是不被提交的，这就需要在将项目克隆到本地后手动安转依赖

	npm install

## 常用命令

`npm init`: 初始化 package.json 文件，根据提示输入一些关键信息就可以将文件初始化完成；

`npm ls -g`: 查看所有全局安装的模块；

## 多版本 node 管理

在维护一些老项目的时候，一些工具依赖于某一版本的 node 才能运行起来，这就需要在不同的版本之间来回切换，这时你需要一个多版本管理工具 `n`，没错这个工具的名字就这么简短，只有一个字母，下面是使用方法：

	// 安装多版本管理工具
	sudo npm install -g n
	// 安装6.0.0版本的 node
	n 6.0.0
	// 查看和切换 node 版本，上下键选版本，回车确定
	n
	// 移除某一版本
	n rm 6.0.0

另外你可以直接打开文件夹查看 node 的版本，也可以直接删除某一版本的 node(因为经常会出现安装失败的情况所以需要删除后重装)
	
	/usr/local/n/versions/node

node 版本的偶数版是稳定版，使用 `n ls` 可以查看全部发布过的 node 版本，下面是一些关键的版本：

	0.0.1    // 里程碑的起点
    0.1.104  // 0.1 版本的最后一个版本
    0.12.12  // 这一版本的工具很多，很多没有持续维护的工具都对此版本有强依赖
    4.0.0    // node 和 io 合并直接跳到 io 的下一个非兼容版本
    4.4.4
    5.11.0
    6.0.0
    6.1.0

关于版本管理，可以查看我的另一篇博客 [语义化版本 2.0.0](/index.html#!/articles/semantic-versioning)。

## 常见问题

### 缺 package.json 文件

`npm ERR! registry error parsing json` 填写了 `-save` 或者 `-save-dev` 参数但是当前位置没有 package.json 文件，需要先执行 `npm init`；

### 依赖安装失败

待续...

### 依赖变更

锁定依赖版本防止被人上房抽梯，由 left-pad 引发的思考。 待续...

### 依赖的依赖放在哪里？

待续...

## 参考资料

[package.json 的官方说明](https://github.com/npm/npm/blob/2e3776bf5676bc24fec6239a3420f377fe98acde/doc/files/package.json.md)

[What's the difference between dependencies, devDependencies and peerDependencies in npm package.json file?](http://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies)
	
[记npm包开发全过程](http://www.w2bc.com/Article/86039)	

