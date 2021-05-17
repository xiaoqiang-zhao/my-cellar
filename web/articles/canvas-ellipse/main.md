# canvas 画椭圆

> 从基础讲起用 canvas 与原生 js 画椭圆。

## 圆

最基础的 API 是画圆弧
arc(x, y, radius, startAngle, endAngle, anticlockwise)
- x，y，圆心的位置
- radius，半径
- startAngle，endAngle，弧线的起止
- anticlockwise，方向，默认顺时针

1.html 中在正中间画圆，半径 200
```js
const canvasDom = document.getElementById('canvasId');
const ctx = canvasDom.getContext('2d');

const size = 500;
canvasDom.height = size;
canvasDom.width = size;

// 线的颜色
ctx.strokeStyle = '#00f';
// 定义圆
ctx.arc(size / 2, size / 2, 200, 0, Math.PI * 2, true);
// 描边
ctx.stroke();
```

## 变形

变形函数
ctx.scale(ratioX, ratioY)

2.html 通过变形，将圆压成椭圆。
```js
ctx.scale(1, 0.5);
// 线的颜色
ctx.strokeStyle = '#00f';
// 定义圆
ctx.arc(size / 2, size / 2, 200, 0, Math.PI * 2, true);
// 描边
ctx.stroke();
```

3.html 变形也同样会影响到圆心，圆心也需要按缩放比例移动。
```js
// 变形
const ratioX = 1;
const ratioY = 0.5;
ctx.scale(ratioX, ratioY);
// 线的颜色
ctx.strokeStyle = '#00f';
// 定义圆
const x = size / 2;
const y = size / 2;
const r = 200;
ctx.arc(x / ratioX, y / ratioY, r, 0, Math.PI * 2, true);
// 描边
ctx.stroke();
```

## save、restore 与 path

4.html 通过变形等会影响到其他绘制，需要引入 save 与 restore 机制。
```js
ctx.save();
const ratioX = 1;
const ratioY = 0.5;
ctx.scale(ratioX, ratioY);
// 线的颜色
ctx.strokeStyle = '#00f';
// 定义圆
const x = size / 2;
const y = size / 2;
const r = 200;
const ellipse = new Path2D();
ellipse.arc(x / ratioX, y / ratioY, r, 0, Math.PI * 2, true);
// 描边
ctx.stroke(ellipse);
ctx.restore();

ctx.save();
ctx.strokeStyle = '#0f0';
const circle = new Path2D();
circle.arc(x, y, r, 0, Math.PI * 2, true);
// 描边
ctx.stroke(circle);
ctx.restore();
```

用 save 与 restore 将变换和样式控制在一个范围内，通过 path 只绘制特定的图形。

## 画椭圆函数

```js
drawEllipse(250, 250, 200, 100, '#00f');

/**
 * @param {number} x 圆心 x 坐标
 * @param {number} y 圆心 y 坐标
 * @param {number} xHalfAxis x半轴长度
 * @param {number} yHalfAxis y半轴长度
 * @param {string} color 颜色
 */
function drawEllipse(x, y, xHalfAxis, yHalfAxis, color) {
  const r = xHalfAxis > yHalfAxis ? xHalfAxis : yHalfAxis;
  const ratioX = xHalfAxis / r;
  const ratioY = yHalfAxis / r;

  // 绘制圆
  const ellipse = new Path2D();
  ellipse.arc(x / ratioX, y / ratioY, r, 0, Math.PI * 2, true);

  ctx.save();

  // 变形
  ctx.scale(ratioX, ratioY);
  // 颜色
  ctx.strokeStyle = color || '#fff';
  // 描边
  ctx.stroke(ellipse);

  ctx.restore();
}
```

## 参考

http://www.alloyteam.com/2015/07/canvas-hua-tuo-yuan-di-fang-fa/
