# NPM

> NPM的全称是Node Package Manager，是一个NodeJS包管理和分发工具，但是在实际的操作中此管理器已经不止是 NodeJs 的包管理了，浏览器端的资源管理也可以借助此工具完成，这里介绍一些基础知识和典型场景下的技巧。

## 一个包的基本组成

`package.json` 包的配置文件(一些重要的说明也在里面)；

`README.md` 包的说明书；

`LICENSE` 这个文件存放[许可协议](/index.html#!/articles/license)；

`bin` 这个文件夹中存放功能代码；

`test` 自动化测试文件。

## 安装一个包

自动把模块和版本号添加到dependencies部分。
 
	npm install module-name -save 

自动把模块和版本号添加到devDependencies部分。

	npm install module-name -save-dve

`npm install`默认会安转两种依赖相当于`npm install --production` + `npm install --dev`，如果你只是单纯的使用这个包而不需要进行一些改动测试之类的可以使用前一个，如果随着深入了解需要想进一步了解再将后一条命令执行以下就可以了。

另外参数 `npm install -g` 为全局安装。

## 安装依赖

一个项目的依赖包一般是不被提交的，这就需要在将项目克隆到本地后手动安转依赖

	npm install

## 常用命令

`npm init`: 初始化 package.json 文件，根据提示输入一些关键信息就可以将文件初始化完成；

`npm ls -g`: 查看所有全局安装的模块；
	
	
## 常见问题

### 缺 package.json 文件

`npm ERR! registry error parsing json` 填写了 `-save` 或者 `-save-dev` 参数但是当前位置没有 package.json 文件，需要先执行 `npm init`；

### 依赖安装失败

### 依赖变更

锁定依赖版本防止被人上房抽梯。

## 参考资料
	
[记npm包开发全过程](http://www.w2bc.com/Article/86039)	