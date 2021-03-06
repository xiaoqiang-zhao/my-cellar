# js 打印页面

> 工程上的实践。

## iframe 方案

默认情况下页眉有网站的 title 和 当前日期，可以通过设置打印页面的样式来实现隐藏页眉：

```html
<style media="print">
    @page {
        size: auto;
        margin: 0;
    }
</style>
```

页脚有当前的网站地址。

无法局部打印。

```js
const iframe = document.createElement('iframe');
iframe.src = '/#/report';
document.getElementById('report-iframe-container').append(iframe);
// 等待加载图片等资源
setTimeout(() => {
    iframe.contentWindow.print();
}, 2000);
```

## pdf 方案

需要借助服务端生成 pdf，无法直接使用工程化页面的样式，优点是可以兼顾下载。

## canvas

无需网络直接生成打印，支持页面的局部打印，最推荐。

```js
import html2canvas from 'html2canvas';

const dom = document.getElementById('app');
html2canvas(dom).then(canvas => {
    const container = document.getElementById('body');
    container.appendChild(canvas);
});
```
