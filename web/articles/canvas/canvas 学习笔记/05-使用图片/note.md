# 05 使用图片

## 源

canvas 的 API 可以使用下面这些类型中的一种作为图片的源：

- 1. HTMLImageElement，这些图片是由Image()函数构造出来的，或者任何的 <img> 元素
- 2. HTMLVideoElement，用一个HTML的 <video> 元素作为你的图片源，可以从视频中抓取当前帧作为一个图像
- 3. HTMLCanvasElement，可以使用另一个 <canvas> 元素作为你的图片源。
- 4. ImageBitmap，这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成。

这些源统一由 CanvasImageSource 类型来引用。

## 图片使用

直接使用服务器图片:

```js
var img = new Image();   // 创建img元素
img.onload = function(){
  // 执行drawImage语句
}
img.src = 'myImage.png'; // 设置图片源地址
```

通过 data: url 方式嵌入图像

```js
img.src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
```

嵌入式的优点就是图片内容即时可用，无须再到服务器兜一圈。缺点就是图像没法缓存，图片大的话内嵌的 url 数据会相当的长。

## 绘制

drawImage(image, x, y)，其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。

```js
var img = new Image();
img.onload = function () {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
}
img.src = '../images/backdrop.png';
```

## 缩放 Scaling

drawImage(image, x, y, width, height)，这个方法多了2个参数：width 和 height，这两个参数用来控制 当向 canvas 画入时应该缩放的大小。

做一个大图和小图的对比:

```js
var img = new Image();
img.onload = function () {
    ctx.drawImage(img, 0, 0);

    // 3:1 缩放
    //                 位置坐标 x           x 轴方向缩放
    ctx.drawImage(img, img.width + 10, 0, img.width / 3, img.height / 3);
}
img.src = '../images/flower.jpeg';
```

## 裁剪 Slicing

drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

把小花花切到正中心:

```js
var img = new Image();
img.onload = function () {
    ctx.drawImage(img, 0, 0);

    // 切图             切片起始点   宽度切掉 75      高度不切     渲染位置             渲染大小
    ctx.drawImage(img, 0, 0,      img.width - 75, img.height, 0, img.height + 10, img.width - 75, img.height);
}
img.src = '../images/flower.jpeg';
```

这里看到一个很特别的 API 设计思路，缩放和裁剪应该是同等级的功能。除 img 外的参数，只有 4 个的时候是缩放，当有 8 个的时候，切片参数居然调到了前面，前 4 个参数用来定义裁剪的起点和大小，后 4 个参数才是渲染的位置和缩放尺寸。

## 优化

过度缩放图像可能会导致图像模糊或像素化。您可以通过使用绘图环境的 imageSmoothingEnabled 属性来控制是否在缩放图像时使用平滑算法。默认值为true，即启用平滑缩放。您也可以像这样禁用此功能：

```js
ctx.imageSmoothingEnabled = false;
```

## 从 canvas 中提取图片

```js
const imageSrc = canvas.toDataURL();
```
