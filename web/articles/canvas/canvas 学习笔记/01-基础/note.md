# 01 基础

## 背景

最近在写一个医疗项目，目标用户是眼科医生，其中有个标注工具门槛比较高。调研了各种库总有这样那样的不满足。比如 cornerstone 系列的 Area 无法去除。先做一些知识储备，万不得已自己写。

## canvas 基础

canvas 直译为画布，与页面最大的不同是里面没有 Dom 元素，所有的操作本质都是擦掉局部或全部后重画，交互依赖鼠标位置，需要自己计算或者依赖第三方库。

canvas 是一个 Dom 元素，Dom 元素的通用特性它都有，id、class，样式上的 等，padding、border、margin、background 等都会生效。

注意点: canvas 有默认宽度，宽高 300*150，如果 CSS 的宽高和这个不一致，绘制图形会变形。推荐的做法是直接用属性或脚本来设置宽高。

## 画两个填充框

```js
const canvasDom = document.getElementById('canvasId');
const ctx = canvasDom.getContext('2d');
// 第一个框
ctx.fillStyle = 'rgb(200,0,0)';
ctx.fillRect(0, 0, 55, 50);
// 第二个框
ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
ctx.fillRect(30, 30, 55, 50);
```

展示效果是这样:

![结果图](./images/1.png)

fillStyle 设置的是填充颜色。

fillRect(x, y, width, height) 是填充长方形。

需要注意的是 x, y 的坐标是从左上角作为原点的，不包括 padding 在内。

## 原教程

https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial
