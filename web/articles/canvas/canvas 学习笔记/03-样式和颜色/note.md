# 03 样式和颜色

> 到目前为止，我们只看到过绘制内容的方法。如果我们想要给图形上色，有两个重要的属性可以做到：fillStyle 和 strokeStyle。

## 色彩

fillStyle = color 设置图形的填充颜色。

strokeStyle = color 设置图形轮廓的颜色。

颜色值要符合 CSS3 标准。

```js
// 这些 fillStyle 的值均为 '橙色'
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```

## 透明度 Transparency

```js
// 用 rgba 指定透明颜色，用于描边和填充样式
ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
// 直接设置透明度
ctx.globalAlpha = 0.2;
```

## 线的样式 Line styles

### lineWidth

这个属性设置当前绘线的粗细。属性值必须为正数。默认值是1.0。

```js
// 宽度递增线条
for (var i = 0; i < 10; i++){
    ctx.lineWidth = 1+i;
    ctx.beginPath();
    ctx.moveTo(5+i*14,5);
    ctx.lineTo(5+i*14,140);
    ctx.stroke();
}
```

### lineCap

线段端点显示的样子。可选值：butt，round 和 square，默认是 butt。

```js
var lineCap = ['butt','round','square'];

// 创建路径
ctx.strokeStyle = '#09f';
ctx.beginPath();
ctx.moveTo(10,10);
ctx.lineTo(140,10);
ctx.moveTo(10,140);
ctx.lineTo(140,140);
ctx.stroke();

// 画线条
ctx.strokeStyle = 'black';
for (var i=0;i<lineCap.length;i++){
  ctx.lineWidth = 15;
  ctx.lineCap = lineCap[i];
  ctx.beginPath();
  ctx.moveTo(25+i*50,10);
  ctx.lineTo(25+i*50,140);
  ctx.stroke();
}
```

- butt 不处理端点；
- round 加半径为一半线宽的半圆；
- square 加等宽且高度为一半线宽的方块。

### lineJoin

定义图形中两线段连接处所显示的样子。可选值: round, bevel 和 miter。默认是 miter。

```js
var lineJoin = ['round', 'bevel', 'miter'];
ctx.lineWidth = 10;
for (var i = 0; i < lineJoin.length; i++) {
    ctx.lineJoin = lineJoin[i];
    ctx.beginPath();
    ctx.moveTo(-5, 5 + i * 40);
    ctx.lineTo(35, 45 + i * 40);
    ctx.lineTo(75, 5 + i * 40);
    ctx.lineTo(115, 45 + i * 40);
    ctx.lineTo(155, 5 + i * 40);
    ctx.stroke();
}
```
- round 标胶磨圆；
- bevel 削平教教；
- miter 线段会在连接处外侧延伸直至交于一点，延伸效果受到下面将要介绍的 miterLimit 属性的制约。

### miterLimit

线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数级增大。miterLimit 属性就是用来设定外延交点与连接点的最大距离，如果交点距离大于此值，连接效果会变成了 bevel。注意

```js
ctx.miterLimit = 10.2;
```

### 虚线 setLineDash 与 lineDashOffset

setLineDash 方法接受一个数组，来指定线段与间隙的交替；lineDashOffset 属性设置起始偏移量。

```js
var offset = 0;

function draw() {
  ctx.clearRect(0,0, canvasDom.width, canvasDom.height);
  // 实线和空白的长度定义
  ctx.setLineDash([10, 2]);
  // 偏移量
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10,10, 100, 100);
}

function march() {
  offset++;
  if (offset > 16) {
    offset = 0;
  }
  draw();
  setTimeout(march, 1000);
}

march();
```

## 渐变 Gradients

### 线性渐变

createLinearGradient(x1, y1, x2, y2)，定义渐变，(x1,y1) 与 (x2,y2) 为渐变的起点和终点。

addColorStop(position, color)，定义渐变的颜色，addColorStop 方法接受 2 个参数，position 参数必须是一个 0 到 1 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。可以根据需要添加任意多个。

```js
// 定义渐变
var lingrad = ctx.createLinearGradient(0, 0, 0, 150);
// 定义渐变颜色
lingrad.addColorStop(0, '#00ABEB');
lingrad.addColorStop(0.5, '#fff');
lingrad.addColorStop(1, '#26C000');

// fill 渐变
// 将渐变作为填充色
ctx.fillStyle = lingrad;
// 填充长方形
ctx.fillRect(10, 10, 130, 130);

// stroke渐变
ctx.beginPath();
ctx.moveTo(150, 10);
ctx.lineTo(150, 140);
ctx.lineWidth = 2;
ctx.strokeStyle = lingrad;
ctx.stroke();
```

### 辐射状渐变

createRadialGradient(x1, y1, r1, x2, y2, r2)，接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

```js
// 创建渐变
var radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
radgrad.addColorStop(0, '#A7D30C');
radgrad.addColorStop(0.9, '#019F62');
radgrad.addColorStop(1, 'rgba(1,159,98,0)');

// 画图形
ctx.fillStyle = radgrad;
ctx.fillRect(0, 0, 150, 150);
```

## 图案样式 Patterns

用循环实现图案的效果其实，有一个更加简单的方法：createPattern。

createPattern(image, type)，接受两个参数，Image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。Type 可选值：repeat，repeat-x，repeat-y 和 no-repeat。

```js
// 创建新 image 对象，用作图案
var img = new Image();
img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
img.onload = function() {
  // 创建图案
  var ptrn = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = ptrn;
  ctx.fillRect(0, 0, 300, 150);
}
```

## Canvas 填充规则

路径相交 或者 路径嵌套的时候，填充规则可选:
- "nonzero": 填充重叠部分, 默认值.
- "evenodd": 不填充重叠部分.

```js
ctx.beginPath();
ctx.arc(50, 50, 30, 0, Math.PI*2, true);
ctx.arc(50, 50, 15, 0, Math.PI*2, true);
ctx.fill('evenodd');
```
