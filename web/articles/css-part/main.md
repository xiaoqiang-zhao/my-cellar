# 常用 CSS 片段收集

> 提供简写和非简写两种方式，有点小洁癖的可以采用了简写的方式，多人协作的长期项目建议采用非简写简明知意。另外简写容易造成冲突，按字母顺序排列样式能在一定层度上减少这种冲突，所以下面的样式都是按字母顺序排列的，另外简写的一般规则是 “属性-属性值-修饰”，表意的CSS片段取首字母缩写。可以更具自己的项目定制此文件的部分或全部，无需任何许可。一些实例：[DEMO](demo/demo.html)，也可下载[dem/css.css](demo/css.css)直接使用。

## 清除浮动

这是一个很不错的解决方案，兼容IE6与现代浏览器，理论部分查看：
[那些年我们一起清除过的浮动](http://www.iyunlu.com/view/css-xhtml/55.html)

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

## 可点击

其实就是鼠标以上后形状变成手型。

```css
/* 可点击 */
.c-p,
.cursor-pointer {
    cursor: pointer;
}
```
  
## 数据为空
   
只写一个空的div就可以实现数据为空的页面提示。

```css
/* 数据为空,只兼容到IE8及以上 */
.d-e,
.data-empty {
    font-size: 14px;
    text-align: center;
    color: #a8a8a8;
    padding: 5px 0;
}
.d-e:after,
.data-empty:after {
    content: "数据为空";
}
```

## 隐藏

隐藏元素推荐使用class来操作，这样便于显示时还原display的值，另外加上body来提高优先级使适用范围更广泛。

```css
/* 隐藏 */
body .hide {
    display: none;
}
```

## 不被内容撑大的table

常用的 table 形式，不被撑大，内容优先自动折行。

```css
/* 不被撑大的table */
.t-f,
.table-fixed {
    table-layout: fixed;
    word-wrap: break-word;
}
```

## 单行文字超出截断

不折行，超出部分截断，并以三个点结尾。`white-space` 是一个可以继承的属性（上层元素定义之后下层元素会自动继承），如果与 `word-wrap` 和 `word-break` 相遇，并且 `white-space: nowrap` 时，页面表现为不折行。

```css
/* 超长截断,只兼容到IE8及以上 */
.to-e,
.text-overflow-ellipsis,
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

## 多行文字超出截断

```css
.line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
}
```

line-clamp 属性还不是标准，还有一个 js 库可以考虑：https://github.com/josephschmitt/Clamp.js
 
## 自动折行

一般块式容器汉字和英文默认都会自动折行，只有url这种连续的英文字母片段需要设置折行，word-wrap单词结束折行，word-break不管单词是否结束到容器末尾立即折行。值得注意的是word-wrap也可以对连续英文字符串折行，所以实践中首选word-wrap。

```css
    /* 自动折行 */
    .ww-bw,
    .word-wrap-break-word {
        word-wrap: break-word;
        white-space: normal;
    }
```css

- word-wrap: break-word; 内容将在边界内换行。如果需要，单词内部允许断行。

- word-break: keep-all; 只能在半角空格或连字符处换行，无法对某些链接地址进行换行。

这里补充 `white-space: normal;` 是因为其继承的特性，为了使程序更健壮，这一行在某些情况下的冗余是值得的。

[word-wrap/word-break/white-space](http://www.cnblogs.com/charling/p/3615111.html)

## 大图小字水平居中

图片浮动，文字行高等于图片高度。

```css
.tag {
    padding: 2px 10px;
    border-radius: 5px;
    font-size: 16px;
    line-height: 28px;
    background: rgba(120, 120, 120, .3);
}
.tag::before {
    margin-right: 5px;
    font-size: 28px;
    float: left;
}
```

## 大字小图水平居中

字体不管多大始终保持居中。

```css
.img-tag {
    position: relative;
    top: 10px;
    left: 10px;
    border-radius: 5px;
    padding: 2px 10px 2px 2px;
    background: rgba(120, 120, 120, .3);

    font-size: 30px;
}

.img-tag::after {
    content: "\e6d6";
    position: absolute;
    top: 50%;
    margin-top: -0.5em;
    display: inline-block;
    width: 10px;
    height: 10px;
    font-size: 10px;
}
```


## 多段文字间隔

多个标签之间间隔一个字符是常用的样式，字符 | 会因为字体的不同无法居中无法控制高度等问题，我们用伪元素画一个：

```css
.item {
    display: inline-block;
    font-size: 20px;
    line-height: 1em;
}
.item:nth-of-type(n + 2)::before {
    content: "\200B";
    display: inline-block;
    height: 0.15em;
    width: 1px;
    border-bottom: 0.7em solid #fff;
    margin: 0 0.5em;
}
```

## todo

写个示例页面...

## 扩展阅读

[60个有用CSS代码片段](https://segmentfault.com/a/1190000002773955)
