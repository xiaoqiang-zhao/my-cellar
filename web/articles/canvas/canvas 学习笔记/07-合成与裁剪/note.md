# 07-合成与裁剪

> 我们不仅可以在已有图形后面再画新图形，还可以用来遮盖指定区域，清除画布中的某些部分以及更多其他操作。

## globalCompositeOperation

globalCompositeOperation = type，这个属性设定了在画新图形时采用的遮盖策略，其值是一个标识 12 种遮盖方式的字符串。


## 裁切路径

默认情况下，canvas 有一个与它自身一样大的裁切路径，图型不会绘制到画布之外。

demo/2.html
```js
// 画一个正方形
ctx.fillRect(150, 50, 150, 50);

const path = new Path2D();
// 圆 路径
path.arc(150, 75, 75, 0, 2 * Math.PI);
// x坐标，y坐标，半径，弧度起始，弧度终点

ctx.clip(path);

// 画一个正方形
ctx.fillRect(0, 0, 150, 150);
```

clip 只限制后面绘制图形的范围，对 clip 之前的图形不会切割。

把剪切放在前面可以提升性能，这可能是这么设计的原因。

## 参考

https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing

https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clip
