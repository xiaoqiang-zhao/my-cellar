# CSS 盒模型

> 盒模型是 CSS 中最基础和最重要的概念之一，用了很久没有系统的总结过，本文将总结一下和模型的基本原理，组要注意的点，还有 CSS3 中的 box-sizing 和 弹性盒模型。

## 基本概念

页面中的每一个元素在成像上都是一个长方形，而这个长方形的宽和高又受到位置相关属性的影响(如一个块元素被浮动那么可能其在宽度上不会填充满父元素)，所以我更倾向于将定位浮动等影响位置的相关属性也算在盒模型中。在 W3C 标准浏览器下：

```css
元素的实际宽度 = width + padding + borderWidth 
```

高度同理。

## 需要注意的三点

### 部分 form 元素

元素的实际宽度计算方式大多数遵循标准，但是 `input:submit,reset,button` 和 `select` 的计算方式不遵循标准，对其设置 `border` 和 `padding` 时他们只会向内延伸。而且高度设置在 chrome 上无效，所以一般会通过对 `button` 来重新定义样式结合 js 实现 `input:submit,reset,button`；`select` 通过样式修饰很难做浏览器兼容，所以项目中如果需要自定义 `select` 的样式，一般自己写一个组件来替换。
 
### 最外层的盒子

最外层的盒子是 window，iframe 和 App 的网页容器(下文提到的 window 代表这三个小家伙)，这个盒子在一些渲染行为上会不同于普通元素。首先这是一个不可能被溢出的容器，其次非溢出的子元素的宽度不受溢出元素影响。先看一张图：

![image](img/box-model.png) 	

对应 [Demo链接](/articles/css-box-model/demo/x-scroll.html)，全部的 CSS 代码：

```css
html {
	background: #23CC41;
}
body {
	margin: 0;
	text-align: center;
}
header {
	background: #cc9;
	line-height: 4em;
}
.main {
	line-height: 200px;
	margin: 5px;
	background: #333;
	color: #fff;
}
.main div {
	position: absolute;
	display: inline-block;
	padding: 5px;
	line-height: 3em;
	background: #6B6969;
}
.main .right {
	right: -20px;
}
.main .left {
	left: -20px;
}
.main .bottom {
	bottom: -20px;
}
```
关键 DOM 部分代码

```html
<body>
	<header>
		header
	</header>
	<div class="main">
		main
		<div class="left"> left </div>
		<div class="right"> right </div>
		<!--<div class="top"> top </div>-->
		<div class="bottom"> bottom </div>
	</div>
	<div class="footer">
		footer
	</div>
</body>
```

`html` 是一个很特别的元素，当它的内部元素由于不折行或者绝对定位发生溢出时，其宽度属性对背景和超出隐藏属性表现为溢出后的宽度，但对内部的 `body` 元素的宽度表现为 window 的宽度。补充一点固定定位不会产生溢出：

```css
{
	position: fixed;
	right: -50px;
}
```

这样定义的元素不会产生横向滚动条，上面 Demo 中的 Right 块采取绝对定位 `position: absolute;` 会使浏览器产生横向滚动条，这一点在做“回到顶部”这类页面组件动画时很有用。

### 页面高度

在页面中提高度，不管是一个元素的高度，还是整个页面的高度，就不得不提到三种溢出方式：定位溢出，负外边距溢出，外边距底部溢出(由于字符串的不折行溢出不会影响其他元素的布局，所以这里暂时将其忽略)。这里的溢出指子元素在呈现上没有被父元素完全包围，如“定位溢出”的关键代码如下：

```css
{
	position: absolute;
	bottom: -50px;
}
```

由于绝对定位的关系，子元素的一部分必然会父元素从下部伸出，由于绝对定位已经脱离了文档流所以直接计算比较困难。

“负边距溢出”的关键代码如下：

```css
{
	margin-bottom: -50px;
}
```

“外边距底部溢出”的关键代码如下：

```css
{
	margin-bottom: 50px;
}
```

在容器没有设置 `overflow: hidden;` 或者边框时外边距才会底部溢出(其他方向不溢出)。

好了交代完溢出的三种类型，来说说这三种溢出对页面高度的影响。从非技术角度看页面的高度就是我们看到的页面全部内容的高度，页面上的所有可见元素都放在 `body` 中，那 body 的高度就是页面高度吗？未必，别忘了还有溢出。经过实际测试`document.body.scrollHeight` 这一属性在IE8+，chrome，firefox 浏览器中对无溢出和“负边距溢出”有效，可以获取到准确的页面高度，但是对其他两种溢出高度的度量结果比实际高度会少溢出的那一部分高度。还有一个获取高度的方法：

	document.documentElement.scrollHeight
	
可以正确处理三种溢出。其实 `documentElement` 就是 `html` 元素，还可以通过 `document.getElementsByTagName('html')[0]` 获取。 这个方案对于 Firefox 还有一个问题，在 iframe 高度比 html 的高度大时，这个方法取出来的高度是 iframe 的高度，要梳理清楚这个问题需要做的工作很多，要搞明白 clientHeight、offsetHeight 和 scrollHeight 在不同浏览器的实际表现，文档类型不同还会对实际表现产生影响，所以最好不要产生溢出。

三种溢出示例：
[定位溢出](/articles/css-box-model/demo/document-height.html)，
[负边距溢出](/articles/css-box-model/demo/document-height2.html)，
[外边距底部溢出](/articles/css-box-model/demo/document-height3.html)。

## 实例

### footer

`html` 的高度默认情况下不会与 window 的高度相同，也就是在高度上 `html` 不会将 window 填充满，所以在处理“版权信息”这种模块时可以这样处理：

```css
html {
	position: relative;
	box-sizing: border-box;
	min-height: 100%;
	padding-bottom: 30px; /* 与 footer 的高度要相同 */
}
.footer {
	position: absolute;
	bottom: 0;
	width: 100%;
	line-height: 30px;
}
```

页面内容不满一屏时“版权信息”在最下面，页面内容超过一屏时滚动条滑到最底部显示“版权信息”，详细代码和展示参见 Demo：
[内容小于一屏](/articles/css-box-model/demo/footer.html)，
[内容大于一屏](/articles/css-box-model/demo/footer2.html)

## 弹性盒模型

### 概述

弹性盒模型不是一个元素一个属性，而是父子元素配合多属性协同作用才可以达到目的。规范也有多个版本，不同浏览器对不同版本的规范支持情况又不同，部分浏览器对弹性盒模型还存在 bug，经过一番研究终于找到一条兼容的通路。IE9 还无法支持弹性盒模型，所以我的目标是兼容 IE10+,Chrome47+,Firefox43+,Safari9+ 这四大主流浏览器的当前版本。

三个版本：

- 旧版：2009年版，display: box | inline-box
- 混合版：2011年版，display: flexbox | inline-flexbox
- 最新版：2012年版，display: flex | inline-flex (候选推荐)

我们以最新版为主线，需要兼容旧版浏览器时再配合旧版属性配制方法。弹性盒模型涉及到的属性比较多，按照一贯的风格，先从最普遍实用的属性开始。

### display: flex | inline-flex;

指定为弹性布局容器。`flex` 设置为块弹性容器；`inline-flex` 设置为内敛弹性容器。块状弹性容器比较好预期效果，因为子元素的宽度或高度直接依赖父元素的高度或宽度(后面简称宽度)，但是内敛容器就不同了，父元素的宽度会受子元素的宽度影响，子元素的宽度同样受父元素宽度的影响，比如设置了最小宽度和最大宽度，更要命的是子元素之间会通过父元素相互影响宽度。我们可以通过下面两条规则来预期内敛弹性布局容器展示效果：

- 如果弹性布局容器的宽度已确定(包括宽度已给定，最小宽度，内容较多又有最大宽度或外部容器的限制)，按照 flex 的计算规则进行；
- 如果弹性布局容器的宽度未确定，会先将内部元素的自然宽度加和，然后按比例分配，如[示例](/articles/css-box-model/demo/display:inline-flex.html)。

### flex

flex: none | [ &lt;flex-grow&gt; &lt;flex-shrink&gt; ?  || &lt;flex-basis&gt;]

flex 定义在弹性布局子项的元素上，属性值有两组：

第一组只有一个 `none`，不弹性布局，按内敛的方式处理空间，见[示例](/articles/css-box-model/demo/flex:none.html)，另外 `none` 与 `0 0 auto` 等价；

第二组是 `flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为 `0 1 auto`，后两个属性可选。

`flex-grow` 子项放大比例，默认为0，即如果存在剩余空间，也不放大；如果有`flex-basis`配置，分配的空间是剩余空间，如果没有配置，分配的是全部空间。

`flex-shrink` 子项缩小比例，默认为1，即如果空间不足，该项目将缩小。

`flex-basis` 在分配多余空间之前，子项占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

这三个分属性和 `flex: none;` 有覆盖作用，同组样式中定义在后面的覆盖前面的，不同组中按 CSS 优先级的规则处理覆盖。从性能上考虑，建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

那个[示例](/articles/css-box-model/demo/flex.html)说明一下：

在容器空间充足的时候有这样的例子：

```css
.con {
	display: -webkit-flex;
	display: flex;
}
.con1 {
	width: 1000px;
	margin-bottom: 2px;
}
.con > .item {
	background: #cc9;
	padding: 1em 0;
	line-height: 1.5em;
	text-align: center;
	color: white;
}
.con > .item:nth-child(1),
.con > .item:nth-child(3) {
	background: #40a070;
}
.con > .item:nth-child(1) {
	-webkit-flex: 1 1 300px;
	flex: 1 1 300px;
	/*等价于 flex: 1 300px; 但是 IE10 对这样的简写解析会有问题*/
}
.con > .item:nth-child(2) {
	-webkit-flex: 2 1 300px;
	flex: 2 1 300px;
}
.con > .item:nth-child(3) {
	-webkit-flex: 1 2 300px;
	flex: 1 2 300px;
	background: #40a070;
}
```

容器宽度 1000，先为三个子项各分配 300，剩余 100，按 flex 的第一个值给出的 1:2:1 分配，实际表现为25:50:25，所以最后三个元素的宽度分别为 (300+25)，(300+50)，(300+25) = 325，350，325.

当空间不够时(其余代码和上面一样)：

```css
.con2 {
	width: 800px;
}
```

容器宽度 800，每个子项 300 缺 100，按 flex 的第二个值给出的分配比例1:1:2，实际表现为25:25:50，所以最后三个元素的宽度分别为 (300-25)，(300-25)，(300-50) = 275，275，250.

### order

弹性盒模型最核心的东西已经介绍完了，剩下的就是花式变换了，我们先将子项的最后一个属性 `order` 介绍完。

`order` 定义子项的排列顺序。数值越小，排列越靠前，默认为0，支持负数。[示例](/articles/css-box-model/demo/order.html)，关键代码：

	.con2 > .item:nth-child(2){
		order: -1;
	}

子项还有一个属性 `align-self` 它是容器属性的 `align-items` 的补充，放在一起介绍。

### flex-direction

适用于弹性容器，决定主轴的方向，即子项的排列方向。

	flex-direction: row | row-reverse | column | column-reverse;

- row(默认值)：主轴为水平方向，起点在左端。
- row-reverse：主轴为水平方向，起点在右端。
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿。

[示例](/articles/css-box-model/demo/flex-direction.html)

### flex-wrap

适用于弹性容器，用来定义单行还是多行显示。

	flex-wrap: nowrap | wrap | wrap-reverse;

- nowrap(默认值)：单行显示。
- wrap：多行显示。
- wrap-reverse：多行显示，并且将行整体倒排。

[示例](/articles/css-box-model/demo/flex-wrap.html)

### flex-flow

适用于弹性容器，是 `flex-direction` 和 `flex-wrap` 的缩写版。

### justify-content

适用于弹性容器，定义子项在主轴上的对齐方式。当一行的所有子项都不能伸缩或可伸缩但已经达到最大长度时，这一属性才会对弹性容器额外空间进行分配；当子项溢出一行时，也会在子项上施加一些控制。

	justify-content: flex-start | flex-end | center | space-between | space-around;

- flex-start(默认值)：左对齐；
- flex-end：右对齐；
- center：居中；
- space-between：两端对齐，项目之间的间隔都相等；
- space-around：每个项目两侧的间隔相等，所以，项目之间的间隔比项目与边框的间隔大一倍。

[示例](/articles/css-box-model/demo/justify-content.html)

### align-items 和 align-self

`align-items` 适用于弹性容器，定义子项在侧轴上的对齐方式。

	align-items: flex-start | flex-end | center | baseline | stretch;
	
- flex-start：交叉轴的起点对齐；
- flex-end：交叉轴的终点对齐；
- center：交叉轴的中点对齐；
- baseline: 项目的第一行文字的基线对齐；
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

[示例](/articles/css-box-model/demo/align-items.html)
	
`align-self` 适用于弹性盒模型的子项，定义其元素自身在侧轴上的对齐方式。
	
	align-self: auto | flex-start | flex-end | center | baseline | stretch;

默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

### align-content

适用于弹性容器，定义多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

	align-content: flex-start | flex-end | center | space-between | space-around | stretch;

[示例](/articles/css-box-model/demo/align-content.html)

## 参考

[https://drafts.csswg.org](https://drafts.csswg.org/css-flexbox-1/#flex)

[http://www.w3.org/Style/CSS/current-work.en.html](http://www.w3.org/Style/CSS/current-work.en.html) 

[Flex 布局教程：语法篇,作者： 阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[两个viewport的故事（第一部分）](http://weizhifeng.net/viewports.html)

[两个viewport的故事（第二部分）](http://weizhifeng.net/viewports2.html)

[flex布局踩过的那些坑](https://segmentfault.com/a/1190000006559564)