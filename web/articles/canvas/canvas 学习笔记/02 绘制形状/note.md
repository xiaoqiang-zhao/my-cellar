# 02 绘制形状

> canvas 只支持两种形式的图形绘制：矩形和路径。所有其他类型的图形都是通过一条或者多条路径组合而成的。

## 绘制矩形

三个基本函数:
- fillRect(x, y, width, height) 绘制一个填充的矩形
- strokeRect(x, y, width, height) 绘制一个矩形的边框
- clearRect(x, y, width, height) 清除指定矩形区域，让清除部分完全透明。

```js
ctx.fillRect(25, 25, 100, 100);
ctx.clearRect(45, 45, 60, 60);
ctx.strokeRect(50, 50, 50, 50);
```

1.html

## 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤:

- 首先，你需要创建路径起始点。
- 然后你使用画图命令去画出路径。
- 之后你把路径封闭。
- 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

以下是所要用到的函数:

- beginPath() 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
- closePath() 闭合路径之后图形绘制命令又重新指向到上下文中。
- stroke() 通过线条来绘制图形轮廓。
- fill() 通过填充路径的内容区域生成实心的图形。

闭合路径函数 closePath() 不是必需的。当你调用 fill() 函数时，所有没有闭合的形状都会自动闭合。

### 以线围图画三角形

绘制一个三角形:
```js
ctx.beginPath();
ctx.moveTo(75, 50);
ctx.lineTo(100, 75);
ctx.lineTo(100, 25);
ctx.fill();
```

核心: 路径(path) 与 填充(fill)。

2.html

### 以线画笑脸图

当 canvas 初始化或者 beginPath() 调用后，你通常会使用 moveTo() 函数设置起点。
绘制一个笑脸:

```js
const canvasDom3 = document.getElementById('canvasId3');
const ctx3 = canvasDom3.getContext('2d');
ctx3.beginPath();
ctx3.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制脸
ctx3.moveTo(110, 75);
ctx3.arc(75, 75, 35, 0, Math.PI, false);   // 口(顺时针)
ctx3.moveTo(65, 65);
ctx3.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左眼
ctx3.moveTo(95, 65);
ctx3.arc(90, 65, 5, 0, Math.PI * 2, true);  // 右眼
ctx3.stroke();
// acr 为圆弧函数
```

核心: 线条的断开 moveTo，arc 画圆的局部或全部，stroke 画线。

启示: 图形和路径都不会直接出现在画布上，需要调用 fill 函数去填充 或者 stroke 函数去描边。

3.html

### 线

绘制两个三角形，一个是填充的，另一个是描边的

```js
ctx.beginPath();
// 填充三角形
ctx.beginPath();
ctx.moveTo(25, 25);
ctx.lineTo(105, 25);
ctx.lineTo(25, 105);
ctx.fill();

// 描边三角形
ctx.beginPath();
ctx.moveTo(125, 125);
ctx.lineTo(125, 45);
ctx.lineTo(45, 125);
ctx.closePath();
ctx.stroke();
```

4.html

### 圆弧

arc(x, y, radius, startAngle, endAngle, anticlockwise)
画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。

arcTo(x1, y1, x2, y2, radius)
根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

### 椭圆

```js
ctx.save();
const xHalfAxis = 80;
const yHalfAxis = 40;
const r = xHalfAxis > yHalfAxis ? xHalfAxis : yHalfAxis;
const ratioX = xHalfAxis / r;
const ratioY = yHalfAxis / r;
ctx.scale(ratioX, ratioY);  // 变形
ctx.beginPath();
ctx.arc( xHalfAxis / ratioX, yHalfAxis / ratioY, r, 0, 2 * Math.PI);
ctx.closePath();
// 线的颜色
ctx.strokeStyle = "rgba(255, 0, 0, 0.8)";
ctx.stroke();
ctx.restore();
```
5.html

http://www.alloyteam.com/2015/07/canvas-hua-tuo-yuan-di-fang-fa/

### 贝塞尔曲线

二次 quadraticCurveTo

三次 bezierCurveTo

略...

## Path2D 对象

正如我们在前面例子中看到的，你可以使用一系列的路径和绘画命令来把对象“画”在画布上。为了简化代码和提高性能，Path2D 对象已可以在较新版本的浏览器中使用，用来缓存或记录绘画命令，这样你将能快速地回顾路径。

```js
new Path2D();     // 空的Path对象
new Path2D(path); // 克隆Path对象
new Path2D(d);    // 从SVG建立Path对象
```

```js
const ctx = canvasDom.getContext('2d');
const rectangle = new Path2D();
rectangle.rect(10, 10, 50, 50);

const circle = new Path2D();
circle.moveTo(125, 35);
circle.arc(100, 35, 25, 0, 2 * Math.PI);

ctx.stroke(rectangle);
ctx.fill(circle);
```

6.html
