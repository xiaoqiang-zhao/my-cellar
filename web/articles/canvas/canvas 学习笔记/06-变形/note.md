# 06 变形

> 变形是一种强大的方法，可以将原点移动到另一点、对网格进行旋转和缩放。

## 状态的保存和恢复

save()，保存画布(canvas)的所有状态。

restore()，恢复 canvas 状态的。

Canvas 状态存储在栈中，每当 save() 方法被调用后，当前的状态就被推送到栈中保存。一个绘画状态包括：

- 当前应用的变形；
- 以及这些属性：strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, lineDashOffset, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline, direction, imageSmoothingEnabled；
- 当前的裁切路径。

这是一对很容易引起误解的方法，它们的操作对象只是样式和变形，而不是全部状态。

```js
ctx.fillRect(0,0,150,150);   // 使用默认设置绘制一个矩形
ctx.save();                  // 保存默认状态

ctx.fillStyle = '#09F'       // 在原有配置基础上对颜色做改变
ctx.fillRect(15,15,120,120); // 使用新的设置绘制一个矩形

ctx.save();                  // 保存当前状态
ctx.fillStyle = '#FFF'       // 再次改变颜色配置
ctx.globalAlpha = 0.5;
ctx.fillRect(30,30,90,90);   // 使用新的配置绘制一个矩形

ctx.restore();               // 重新加载之前的颜色状态
ctx.fillRect(45,45,60,60);   // 使用上一次的配置绘制一个矩形

ctx.restore();               // 加载默认颜色配置
ctx.fillRect(60,60,30,30);   // 使用加载的配置绘制一个矩形
```

## 移动

translate(x, y) 方法，它用来移动 canvas 的原点到一个不同的位置。原来的内容不会变，会影响后面绘入的图形的位置。

在做变形之前先保存状态是一个良好的习惯。大多数情况下，调用 restore 方法比手动恢复原先的状态要简单得多。

```js
for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    ctx.save();
    ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
    ctx.translate(10 + j * 50, 10 + i * 50);
    ctx.fillRect(0, 0, 25, 25);
    ctx.restore();
  }
}
```

## 旋转

rotate(angle)，以原点为中心旋转，这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。

注意，如果使用过 translate 方法移动原点，那么 rotate 的原点为新原点。

```js
ctx.translate(75,75);

// 一共画 5 层
for (var i = 1; i < 6; i++){ // Loop through rings (from inside to out)
  ctx.save();
  ctx.fillStyle = 'rgb('+(51*i)+','+(255-51*i)+',255)';

  // 从第一层开始画
  for (var j = 0; j < i * 6; j++){ // draw individual dots
    ctx.rotate(Math.PI * 2/(i * 6));
    ctx.beginPath();
    ctx.arc(0, i*12.5, 5, 0, Math.PI*2, true);
    ctx.fill();
  }

  // 画完一层重置旋转和颜色设置
  ctx.restore();
}
```

## 缩放

scale(x, y)，对形状，位图进行缩小或者放大。

需要注意，先设置缩放，再绘制的图形才会生效，缩放设置不会对之前的操作起作用。

