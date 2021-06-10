# 打印排版

## 没有自动排版的方案

打印按钮的处理
```js
this.printReportBtnDisabled = true;
this.printReportBtnText = '报告生成中...';
```

暂缓页面
```js
const iframe = document.createElement('iframe');
const patientId = this.$route.params.id;
iframe.src = `/pages/report/${id}`;

document.getElementById('report-iframe-container').append(iframe);
```

需要将 iframe 插入到当前页面 dom 才可以进行渲染，dom 样式如下:

```css
#report-iframe-container {
    overflow: hidden;
    height: 0;
}
```

粗糙一点的处理可以用 setTimeout。

```js
setTimeout(() => {
    iframe.contentWindow.print();
    this.printReportBtnDisabled = false;
    this.printReportBtnText = '打印报告';
}, 5000);
```

精细一点的方案需要考虑异步请求和图片加载的完成。

## 自动排版方案

将 dom 按页眉、内容、页脚的顺序从上到下排列。

等待页面渲染完之后

## 长表格分布在多页的多表头

## 花絮

### 冷僻的样式

隐藏系统默认的页眉页脚。
```css
@page {
    size: auto;
    margin: 0mm;
}
```

可以强制换页的 CSS 样式。
```css
page-break-after: always;
page-break-before: always;
```

当用 `dom.style.pageBreakAfter = 'always'` 赋值时，在 chrome 中渲染出来是 `break-after: page;`

这个样式有一个副作用，打印的时候最后会出现一张空白页。这里卡了很久，最后找到不是很完美的方案:

在最后一页加这样一行，尺寸就是页面高度。
```css
margin-bottom: -1450px;
```

这其间还试过另一个方案:
```css
.print-page:last-child {
    page-break-after: avoid;
}
```
奇异的不生效。

只有打印的时候才出现的媒体选择器。
```css
/** 设置默认的页眉页脚默认为隐藏 **/
.beforeHeader, 
.afterFooter {
    display: none;
}
@media print {
    /* 打印时显示 */
    .beforeHeader, 
    .afterFooter {
        display: block;
    }
}
```

如果不需要在每一页添加也没和页脚，用这种方式也可以简单实现自定义分页打印。

### canvas

长段落怎么办？

用 canvas 来切割，判断一行是白色的

```js
ctx.getImageData(sx, sy, sw, sh);
```

参数
- sx：将要被提取的图像数据矩形区域的左上角 x 坐标。
- sy：将要被提取的图像数据矩形区域的左上角 y 坐标。
- sw：将要被提取的图像数据矩形区域的宽度。
- sh：将要被提取的图像数据矩形区域的高度。

### 难点

很难定义分页截断的规则。不同的业务场景有不同的页面布局，想要兼容全部场景并给出完美解法几乎不可能。

在不对页面布局结构做要求的情况下，重排分页布局也是一个

## 参考

https://blog.csdn.net/sinat_35626559/article/details/103474817

https://juejin.cn/post/6844903680945192974
