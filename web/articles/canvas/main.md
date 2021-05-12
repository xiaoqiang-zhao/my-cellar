# Canvas 基础和应用

> 重要特性

## 概述

打印功能，画图

## 基础实践

## 应用

你可能需要将页面的某个部分放到 canvas 中，原理大概是这样：

- 递归取出目标模版的所有 DOM 节点，填充到一个 rederList，并附加是否为顶层元素/包含内容的容器 等信息；
- 通过 z-index postion float 等 css 属性和元素的层级信息将 rederList 排序，计算出一个canvas 的 renderQueue；
- 遍历 renderQueue，将 css 样式转为 setFillStyle 可识别的参数，依据 nodeType 调用相对应 canvas 方法，如文本则调用 fillText，图片 drawImage，设置背景色的 div 调用 fillRect等；
- 将画好的canvas填充进页面。

```js
import html2canvas from 'html2canvas';

const dom = document.getElementById('app');
html2canvas(dom).then(canvas => {
    const container = document.getElementById('body');
    container.appendChild(canvas);

    // 放到某个图片中
    document.getElementById('img').src = canvas.toDataURL();

    // 保存图片
    
});
```

https://html2canvas.hertzen.com/

https://juejin.cn/post/6844903682761310216