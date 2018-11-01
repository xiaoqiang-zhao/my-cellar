# webpack

> 我们从简单到复杂通过一个一个的例子来学习 webpack，所有实例都可以在我的 github 上下载到源码。

## webpack 是什么？

是一款模块加载器兼打包工具，它能把各种资源，例如JS(含JSX和coffee)、样式（含less/sass）、图片、HTML 片段都作为模块来使用和处理。

那么能处理什么问题？主要是资源合并和依赖管理。

## 2分钟跑起来

NodeJs 的安装就不多说了，webpack 的全局安装命令如下：

```shell
npm install webpack -g
```

准备配置文件 `webpack.config.js`

```js
module.exports = {
	entry: {
		main: './a.js'
	},

	output: {
		path: './dist/',
		publicPath: '/js/',
		filename: '[name].js'
	}
};
```

入口模块 a.js，依赖模块b.js

```js
// a.js
var b = require('./b');
var text = 'hello ' + b.text;
document.getElementsByTagName('body')[0].innerHTML = text;
exports.model = {
	text: text
};

// b.js
module.exports = {
	text: 'world.'
};
```

上面所有文件放在同一目录下面，在此目录下运行下面任一命令

```shell
webpack           // 合并文件  
webpack --watch   // 监听变动并自动打包
```

就生成的 main.js 可被页面直接使用，具体代码可以到当前文章的 `./demo/quick-start/` 中查看。

## 简单解释几句

webpack 兼容 AMD 和 CMD 以及 CommonJs 规范，官方建议使用 CommonJS 的规范来组织模块关系。如果对前面的三个规范还不了解可以看我的另一篇文章[js 模块化](/#!/articles/js-module)。webpack 也可算是预编译类的模块管理工具，所有的资源都被打包放在一起统一加载，虽然有一些技巧可以打出多个包或提取多个包之间的公用模块，但这种 all in one 的思想需要注意，用空间换时间带来不可避免的问题是加载用户可能用不到的资源(即非按需加载)，从而造成初始化时间变长移动端流量浪费等问题。在 http/2 场景下使用此方案做做整站打包的话劣势就会更加明显，所以面对当前国内的网络环境和大多数应用场景一个较为推荐的方案是使用 webpack 做与业务无关的组件打包，用 AMD 或 CMD 做业务的拆分打包(为了按需加载)，前端资源库单独引用或打包后整体引用。好了扯远了，我们继续 webpack。

## 调试

先说说source maps，source maps 是将合并后的文件拆分成源文件以方便调试的一种技术，在合并文件的末尾看到下面这样的一行声明，就表示当前文件是合并而来，而合并后的文件通过"main.js.map"重新拆解开来，不打开开发者工具时不会加载 .map 文件也不会拆解，声明也被当做普通的注释来处理，打开开发者工具后需要刷新才可以拆解文件(也就是是否拆解在加载资源时决定)可以在拆解后的文件上打断点调试，当前的 Chrome,FireFox,Safari,IE11 已经支持。

```js
//# sourceMappingURL=main.js.map
```

顺便介绍一下 webpack 的参数，	

```shell
webpack           // 不加参数，合并文件  
webpack -p        // 压缩混淆脚本
webpack --watch   // 监听变动并自动打包
webpack -d        // 生成合并文件 和 map拆解文件
```

可以用上面 `./demo/quick-start/` 中的代码做实验。补充说明一下，这篇文章提到的所有示例的依赖都已经在 `package.json` 定义好了，开始之前需要在 demo 文件夹下执行 `sudo npm install` 来安装这些依赖，否则示例可能跑不起来。

[chrome source Maps官方资料](https://developer.chrome.com/devtools/docs/javascript-debugging#source-maps)

## webpack 插件

[加载器使用文档](http://webpack.github.io/docs/using-loaders.html)	
	
## 拒绝 js 中拼 html 片段

使用 html-loader 插件可以使 html 片段转化成字符串模块，模块安装命令如下：

```shell
npm install html-loader --save
```

html 模块示例如下：

```html
// b.html
<div>
	Hello world.
</div>
```

使用示例：

```js
// a.js
var b = require('./b.tpl');
document.getElementById('container').innerHTML = b;
```

配置示例代码较长请自行到 `./demo/html/webpack.config.js` 中查看。

在实际项目中不结合数据的 html 片段是很少的，所以项目中一般会将 html 片段作为模板并以扩展名为 `.tpl` 作为结尾来标识，webpack 的作用是将模板加载进来，但是加载进来的格式是字符数串，和数据的融合需要借助模板引擎，如jQuery的插件 `tmpl` 或者独立模板引擎 `mustache`，来自腾讯的 `artTemplate` 也是不错的选择，如果使用 MVVM 的框架(如 vue)则自带此功能。需要注意的是模板引擎的不同语法也可能不同。

## CSS也玩起来

需要两个插件:css-loader将 css 作为模块加载进来，style-loader 将样式写进页面。

```shell
npm install style-loader css-loader --save
```

IE8 及以下有一个 Style 个数超过32后面的不识别的 bug，在生成的 js 文件中可以看到对低版本的 IE 做了判断。下面是配置文件部分代码：

```js
// webpack.config.js
module: {
	loaders: [
		{
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}
	]
}
```

在 js 模块中直接 require 就可以在当前页面创建 style 标签并将 css 文件的内容添加到其中。

```js
require('./css-1.css');
```

对于CSS 预处理器，可以查看我的[另一篇博文](/#!/articles/css-pre-processor)。

## 有了CSS怎么能没有装饰图

使用 url-loader 加载器可以直接将图片文件转成 base64内容打包到 CSS 中，加载器安装：

```shell
npm install url-loader
```

CSS 的写法和普通的一样，部分配置代码如下：

```js
loaders: [
	{
		test: /\.png$/,
		loader: "url-loader?limit=100000"
	}
]
```

## 分模块加载

如果模块较多，将所有的代码都打包到一起体积会很大，为了解决这个问题就需要将各模块单独打包方便按需加载模块。这种按需加载的写法如下：

```js
// CommonJs
require.ensure(['./b'], function (require) {
	var m = require('./b');
	console.log('3' + m.text);
});

// AMD
require.ensure(['./b'], function (b) {
	console.log('3' + b.text);
});
```

推荐明确使用 `ensure` 来表示异步加载模块，但是在逻辑中的 `require` 也会被视为异步加载模块，会被单独打包：

```js
var a = document.getElementById('app').innerHTML;
if (a === '') {
	require(['./b'], function (b) {
	
	});
}
```

但是如果变形为：

```js
var a = document.getElementById('app').innerHTML;
if (a === '') {
	var b = require('./b');
}
```

就不会单独打包了，通过参数形式来决定行为(参数为数组时执行多文件打包异步加载，参数为字符串时执行单文件打包一次性加载)。另外在存在分模块打包的时候，配置的时候需要注意 `publicPath` 配置项：

```json
output: {
	path: './dist/',        // 将生成的文件放到此路径下
	publicPath: './dist/',  // 异步加载的模块的请求路径，默认是 webpack.config.js 所在的路径
	filename: '[hash].js'
}
```

那么为什么生成路径和请求路径一定要分两个参数呢，他们不应该是统一的吗？

ES6 分片，异步模块引入，一般在前端路由中配置：

```json
{
	path: '/home',
	name: 'home',
	component() {
		return System.import('@/pages/home');
	}
}
```

## 被集成

一个好的工具最好能集成其他工具或插件，也最好能被其他程序集成。webpack 就是这样一个工具，可以方便的集成加载器插件，也提供了被 node 作为独立模块使用的接口：

```js
var webpack = require('webpack');
var webpackConfig = require('./webpack-config');
webpack(webpackConfig, function (err, stats) { 
	// webpack 打包完成后会进入此回调函数
	
	// 文件哈希
	stats.hash;
});
```

下面是调试时用到的参数，可以通过自定义参数来判断是开发环境还是生成环境

```js
webpackConfig.devtool = 'sourcemap';
webpackConfig.optimize = {
	// 是否压缩
	minimize: false
};
webpackConfig.output.filename = 'debug.js';
webpackConfig.output.sourceMapFilename = 'debug.map';
webpackConfig.watch = true; // 是否监听改变
```

利用 watch 可以结合web容器和 websocket 做一些 livereload 的事情。
	
## 参考资料

[webpack 官网](https://webpack.github.io/)

[webpack GitHub](https://github.com/webpack/webpack)

[加载器的使用方法](http://webpack.github.io/docs/using-loaders.html)

[Webpack 入门指迷](http://sfau.lt/b5kR2G)

[webpack 加载器](https://webpack.github.io/docs/list-of-loaders.html)

[chrome source Maps官方资料](https://developer.chrome.com/devtools/docs/javascript-debugging#source-maps)

[less-loader](https://github.com/webpack/less-loader)

[code-splitting](http://webpack.github.io/docs/code-splitting.html)


