# CSS Widget

> 零零总总写前端 5 年多了，几乎任何业务项目都需要用到一些样式片段，功能复杂的已经被抽象成了组件库，还有一些只有几行十几行的样式片段却在不断的重复编码，决定花时间整理一些这个类型的片段，利人利己。

## 辅助功能

### 字体

Helvetica，无衬线字，字母 I l，可能是设计师最爱的字体，Realist风格，简洁现代的线条，非常受到追捧。在Mac下面被认为是最佳的网页字体，在Windows下显示很糟糕。

苹方 PingFang SC，无衬线，字母 I l，美观大于实用。

大河马 tahoma，无衬线，字母 I l，中英文混排推荐，XP 时代的微软默认字体，字体界的老炮。

sans-serif，无衬线，字母 I l，大河马的备胎。

微软雅黑 Microsoft Yahei，无衬线，字母 I l，Windows7+ 时代的微软默认字体，同样字号情况下微软雅黑的字要大一点。

```css
font: 14px/1.5 Helvetica "PingFang SC", tahoma, arial, sans-serif;
```

- 如果是对设计感有需求的网站或App，用 Helvetica 和 "PingFang SC" 打头是不错的选择；
- 如果是中规中矩的网站或App，用 tahoma 做主打，arial 和 sans-serif 娄底是不错的选择；
- 微软雅黑是收费字体，Mac 也提供，如果是 PC 可以考虑用微软雅黑，如果有 Android 场景那就不要用了。

### 清除浮动

```css
/* 清除浮动 */
.c-f,
.clear-float {
    zoom: 1; /* 兼容IE7及以下 */
}
.c-f:after,
.clear-float:after {
    content: "\200B";
    display: block;
    height: 0;
    clear: both;
}
```

这可能是兼容性最好副作用最小的一种方案了。理论部分可以看看“一丝冰凉”的这篇文章：
[那些年我们一起清除过的浮动](http://www.iyunlu.com/view/css-xhtml/55.html)

### 单行文字超出截断

兼容 IE8 及以上：
```css
/* 单行文字超出截断 */
.text-overflow-ellipsis,
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```
### 多行文字超出截断【移动】

移动端方案，只兼容 webkit 内核的浏览器：
```css
/* 多行文字超出截断【移动端】 */
.line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
}
```

-webkit-line-clamp 是一个不规范的属性，它没有出现在 CSS 规范草案中。也就是说只有 webkit 内核的浏览器才支持这个属性，像 Firefox, IE 浏览器统统都不支持这个属性，浏览器兼容性不好。

使用场景：多用于移动端页面，因为移动设备浏览器更多是基于 webkit 内核。

### 多行文字超出截断【PC端】

```css
/* 多行文字超出截断【PC端】 */
.wrap {
    height: 40px;
    line-height: 20px;
    overflow: hidden;
}
.wrap .text {
    float: right;
    margin-left: -5px;
    width: 100%;
    word-break: break-all;
}
.wrap::before {
    float: left;
    width: 5px;
    content: '';
    height: 40px;
}
.wrap::after {
    float: right;
    content: "...";
    height: 20px;
    line-height: 20px;
    /* 为三个省略号的宽度 */
    width: 3em;
    /* 使盒子不占位置 */
    margin-left: -3em;
    /* 移动省略号位置 */
    position: relative;
    left: 100%;
    top: -20px;
    padding-right: 5px;
}
```
真是一个无比巧妙的方案，原理部分参见这篇文章：[https://github.com/happylindz/blog/issues/12](https://github.com/happylindz/blog/issues/12)。


这里的多行是需要通过高度和行高配合实现的，省略号的背景默认是白色如果容器是其他背景色需要手动重置。如果你需要边框需要手动设置伪元素的高度，或者使用 outline 来代替 border。

```css
.wrap::before {
    height: 40px;
}
```

line-clamp 属性还不是标准，还有一个 js 库可以考虑：[https://github.com/josephschmitt/Clamp.js](https://github.com/josephschmitt/Clamp.js)

## 独立样式

### 大图小字

支持 IE8+

```css
/* 大图小字 */
.img-text-container {
    font-size: 16px;
    line-height: 40px;
}
.img-text-container img,
.img-text-container::before {
    font-family: "iconfont";
    margin-right: 5px;
    font-size: 40px;
    height: 40px;
    vertical-align: top;
}
```

将图片或图标的 `vertical-align` 设置成 `top` 是关键。需要注意的有两点：
- 1、图和字中间会有间隔，采用浮动方案可消除间距同时带来浮动产生副作用；
- 2、文字的行高需要和图的高度一致。

### 小图大字

支持 IE8+

```css
/* 小图大字 */
.icon-text-container {
    font-size: 16px;
    line-height: 1em;
}
.icon-text-container img {
    display: inline-block;
    height: 14px;
    margin-right: 5px;
    // 高度的一半
    margin-bottom: -7px;
    vertical-align: 32%;
}
.icon-text-container::before {
    display: inline-block;
    font-family: "iconfont";
    font-size: 14px;
    color: #555;
    vertical-align: top;
}
```

多用于装饰性的小图标。这里的关键在于 `vertical-align: 32%;` 这个设置，之母 x 的高度占整个行高的一半，如果 `vertical-align` 的值是百分数，那么相对值就是行高，参考点就是字母 x 的下边沿，字母 x 的高度刚好占到行高的一半，所以 `25%` 的相对值设置会使图片的下边沿正好在字母 x 的垂直中线上，字母 x 位于一行偏下一点，上下的距离比实际测量大概是 16:9，然后 (16-9)/(16+9) 刚好是 28%，再取一半的一半刚好是 7%，于是 25% + 7% = 32%。

对于图片同样有两点需要注意：
- 1、容器行高必须是一倍字号，如果需要间距通过 `padding` 设置；
- 2、图片的 `margin-bottom` 必须是图片高度的一半取负。

对图标要简单很多，只要自动继承容器的单倍行高然后这是 `vertical-align: top` 就可以了。

### 文字间隔

多个标签之间间隔一个字符是常用的样式，字符 | 会因为字体的不同无法居中无法控制高度等问题，我们用伪元素画一个：

```css
/* 文字间隔 */
.space-item {
    display: inline-block;
    line-height: 1em;
}
.space-item:nth-of-type(n + 2)::before {
    content: "\200B";
    display: inline-block;
    height: .15em;
    width: 1px;
    border-bottom: .7em solid #f00;
    margin: 0 .5em;
}
```

这段代码的的第一个妙处在于用 `border-bottom` 画间距线，而用高度作为上间距(用 padding 会有问题)；第二个妙处在于用了关系选择器，不需要手动去指定哪一个有间隔符。

### 数据为空&暂无权限

支持 IE8+

```css
/* 数据为空&暂无权限 */
.no-right,
.data-empty {
    text-align: center;
    padding: 50px 0;
    color: #555;
}
.icon-no-right:before,
.icon-empty:before {
    display: block;
    margin: 0 auto;
    font-size: 48px;
    margin-bottom: 10px;
}
```

常用样式，需要引入相应的 iconfont 图标。

### 加载中

兼容IE9+

从网站 [http://tobiasahlin.com/spinkit/](http://tobiasahlin.com/spinkit/) 中摘取的一个样式。使用简单，只有一个元素。

```css
/* 加载中 */
.loading {
    width: 40px;
    height: 40px;
    position: relative;
    margin: 100px auto;
}
.loading::before,
.loading::after {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #333;
    opacity: .6;
    position: absolute;
    top: 0;
    left: 0;
    animation: sk-bounce 2.0s infinite ease-in-out;
}
.loading::after {
    animation-delay: -1.0s;
}
```
