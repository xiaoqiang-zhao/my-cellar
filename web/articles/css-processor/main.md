# CSS 预处理器

> 随着前端工程越来越大，CSS 本身的限制严重影响了开发的速度的工程化管理能力，所以在大型应中使用 CSS 预处理器带来的好处相当明显，这篇文章旨在快速的学完 CSS 预处理器。

## Less

### 环境

对于代码，一个东西理解的正不正确没有比把代码跑一下验证一下来的更直接了。这里的学习期提供一个简单的命令行工具，可以一键编译 less(更多的工具可以在[这里](http://lesscss.cn/usage/)找到)：

```shell
// 全局安装 Less 解析工具
npm install less -g
// 解析less文件 less.less 输出为css文件less.css
lessc less.less less.css
```	

工程化工具需要根据自己项目的工程化选型来决定，webpack，gulp，fis 等工程化工具对 less 的集成和扩展就不展开了。这里只提供 webpack 的示例：

```shell
// 加载器安装
npm install less-loader less
// 加载器配置
```
```json
loaders: [
	{
		test: /\.less$/,
		loader: "style!css!less"
	}
]
```

### 语法
 
[中文语法文档](http://www.css88.com/doc/less/features/)

[英文原版文档](http://lesscss.org/features/)

### 辅助工具

[百度 Less 编码规范](https://github.com/ecomfe/spec/blob/master/less-code-style.md#user-content-混入mixin-1)，按照这份规范来可以绕过一些坑，代码的风格也更统一。

[工具库 est](http://ecomfe.github.io/est/)，提供了一系列方便快捷的 mixin，帮助您更轻松地书写 Less 代码。

[中文官网](http://www.1024i.com/demo/less/)。

## Stylus

### 环境

命令行工具：

```shell
// 全局安装 stylus 解析工具
npm install stylus -g
// 解析为 css，-w 可以监听文件改变自动解析
stylus -w style.styl -o style.css
```

工程化工具 webpack：

```shell
// 在当前位置安装解析器
sudo npm install stylus --save
// 加载器安装
npm install stylus-loader --save
```
```json
// 加载器配置
module: {
	loaders: [
		{ 
			test: /\.styl$/, 
			loader: 'style-loader!css-loader!stylus-loader' 
		}
	]
}
```

### 语法

[张鑫旭翻译的中文文档](http://www.zhangxinxu.com/jq/stylus/css-style.php)

[原版英文文档](http://stylus-lang.com/docs/selectors.html)

### 辅助工具

[官方工具库 nib](http://tj.github.io/nib/)，小而美的 mixin 库。

[百度工具库 rider](https://github.com/ecomfe/rider/)，提供更丰富的 mixin。

## PostCss

[postcss-loader](https://github.com/postcss/postcss-loader)

## PostStylus

[poststylus github](https://github.com/seaneking/poststylus)

[using postcss together with sass stylus or less](http://webdesign.tutsplus.com/tutorials/using-postcss-together-with-sass-stylus-or-less--cms-24591)

## 你需要掌握的点

以 Less 为例，你最起码要知道下面这几条语法和套路。

### 变量

```css
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

#header {
  color: @light-blue;
}
```

变量是存在作用域的，和 js 类似。

### mixins

```css
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#menu a {
  color: #111;
  .bordered;
}
```
混合的作用在大多数场景中可以被组合替代。

### 函数

```css
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```

用来做单位转换等工作。

### 推荐书写顺序

```css
@import "est/all.less";

@default-text-color: #333;

.page {
    width: 960px;
    margin: 0 auto;
}
```

按这种顺序书写更易读：
- 1、@import
- 2、变量声明
- 3、样式声明

## 扩展资料

[再谈 CSS 预处理器](http://efe.baidu.com/blog/revisiting-css-preprocessors/)

[CSS 预处理器与 CSS 后处理器](http://zhaolei.info/2014/01/04/css-preprocessor-and-postprocessor/)
