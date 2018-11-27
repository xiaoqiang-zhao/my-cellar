# CSS Widget

> 零零总总写前端 5 年多了，几乎任何业务项目都需要用到一些样式片段，功能复杂的已经被抽象成了组件库，还有一些只有几行十几行的样式片段却在不断的重复编码，决定花时间整理一些这个类型的片段，利人利己。

## 辅助功能

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
.line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
}
```

-webkit-line-clamp 是一个不规范的属性，它没有出现在 CSS 规范草案中。也就是说只有 webkit 内核的浏览器才支持这个属性，像 Firefox, IE 浏览器统统都不支持这个属性，浏览器兼容性不好。

使用场景：多用于移动端页面，因为移动设备浏览器更多是基于 webkit 内核。

### 多行文字超出截断【PC】

```css
 .wrap {
    // box-sizing: content-box;
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
    height: 100%;
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
    // background: #2479cc;
    background: linear-gradient(to right, rgba(255,255,255,.1) 10%, #fff, #fff);
    text-align: right;
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

支持 IE8+，如果文字可能隐藏搭配清除浮动更稳定。

```css
.img-text-container {
    padding: 2px 10px;
    border-radius: 5px;
    font-size: 16px;
    line-height: 28px;
    background: rgba(120, 120, 120, .3);
}
.img-text-container::before,
.img-text-container img {
    margin-right: 5px;
    font-size: 28px;
    float: left;
}
```

图片采用浮动是比较稳定，还有一个附带的好处是避免换行产生的不稳定间距。

### 小图大字

### 数据为空&暂无权限

### 文字间隔

## 布局

### 信息单元样式一


