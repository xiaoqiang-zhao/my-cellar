# 04 绘制文本

## 绘制

两种方法来渲染文本:

- fillText(text, x, y [, maxWidth])，在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
- strokeText(text, x, y [, maxWidth])，在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.

```js
ctx.font = "48px serif";
ctx.fillText("Hello world", 10, 50);
ctx.strokeText("Hello world", 10, 120);
```

## 文字样式

font = value，当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法. 默认的字体是 10px sans-serif。

textAlign = value，文本对齐选项. 可选的值包括：start, end, left, right or center. 默认值是 start。

textBaseline = value，基线对齐选项. 可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。

direction = value，文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。
如果你之前使用过CSS，那么这些选项你会很熟悉。

```js
ctx.font = "48px serif";
ctx.textBaseline = 'middle';

// 创建渐变
var lingrad = ctx.createLinearGradient(0, 0, 300, 0);
// 定义渐变颜色
lingrad.addColorStop(0, '#00ABEB');
lingrad.addColorStop(0.5, '#fff');
lingrad.addColorStop(1, '#26C000');

ctx.fillStyle = lingrad;
ctx.strokeStyle = lingrad;

ctx.fillText("Hello world", 10, 50);
ctx.strokeText("Hello world", 10, 120);
```

## 预测量文本宽度

measureText()，将返回一个 TextMetrics 对象的宽度、所在像素，这些体现文本特性的属性。

```js
const textContent = 'Hello world';

ctx.font = '48px serif';
var text = ctx.measureText(textContent);
const textWidth = text.width;

// 并没有 text.height，高度同 font

// 放到中间
const start = (300 - textWidth) / 2;
ctx.fillText("Hello world", start, 60);
```
