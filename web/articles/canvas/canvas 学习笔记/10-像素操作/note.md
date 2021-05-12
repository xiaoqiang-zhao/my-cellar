# 10-像素操作

> 可以直接通过ImageData对象操纵像素数据，直接读取或将数据数组写入该对象中。稍后我们也将深入了解如何控制图像使其平滑（反锯齿）以及如何从Canvas画布中保存图像。

## ImageData 对象

ImageData 对象中存储着 canvas 对象真实的像素数据，它包含以下几个只读属性：

- width，图片宽度，单位是像素；
- height，图片高度，单位是像素；
- data，Uint8ClampedArray 类型的一维数组，包含着 RGBA 格式的整型数据，范围在 0 至 255 之间（包括 255）。

Uint8ClampedArray 的数据形式是下面这样:

```js
// 绘制一个正方形
ctx.fillStyle = 'red';
ctx.fillRect(10, 20, 30, 40);
var imageData = ctx.getImageData(9, 20, 2, 1);
{
  "data": {
    // 第一个点的数据
    "0":0,
    "1":0,
    "2":0,
    "3":0,
    // 第二个点的数据
    "4":255,
    "5":0,
    "6":0,
    "7":255
  }
}
```

## 创建 ImageData 对象

创建一个新的，空白的ImageData对象。

```js
var myImageData = ctx.createImageData(width, height);
```

上面代码创建了一个新的具体特定尺寸的ImageData对象。所有像素被预设为透明黑。

你也可以创建一个被anotherImageData对象指定的相同像素的ImageData对象。这个新的对象像素全部被预设为透明黑。这个并非复制了图片数据。


```js
var myImageData = ctx.createImageData(anotherImageData);
```

为了获得一个包含画布场景像素数据的ImageData对像，你可以用getImageData()方法：

```js
var myImageData = ctx.getImageData(left, top, width, height);
```

注：任何在画布以外的元素都会被返回成一个透明黑的ImageData对像。

## 写入数据

```js
ctx.putImageData(myImageData, dx, dy);
```

## 保存图片

canvas.toDataURL('image/png')，默认设定。创建一个PNG图片。

将 canvas 中的图像展示到图片标签中。
```js
function toImage() {
  const imageContainer = document.getElementById('image-container');
  const img = new Image();
  img.src = canvasDom.toDataURL('image/png');
  imageContainer.appendChild(img);
}
```

将 canvas 中的图像以图片的形式下载。
```js
function download() {
  const link = document.createElement('a');
  link.href = canvasDom.toDataURL('image/png');
  link.download = '下载图片的名称可自定义';
  link.click();
  window.URL.revokeObjectURL(link.href);
}
```

如果展示和下载的内容只是 canvas 的局部，那么可以将局部放到一个新 canvas 中处理。

```js
var myImageData = ctx.getImageData(left, top, width, height);
ctx.putImageData(myImageData, dx, dy);
```
