# 网页水印

> 涉及到隐私和敏感信息的系统都要加水印，这些水印可能人眼看不到，一旦遭到曝光借助技术手段可以追查曝光源头，从哪个系统，甚至能追查到个人。

## 加水印

水印的代码比较简单:

```js
/**
 * 添加水印
 *
 * @param {string} str 水印文本
 * @param {Object} dom 要加在的 dom，默认 body
 */
setWatermark(str, dom = document.body) {
    // 创建一个画布
    let can = document.createElement('canvas');

    // 设置画布的长宽
    can.width = 300;
    can.height = 180;
    let cans = can.getContext('2d');

    // 旋转角度
    cans.rotate(-15 * Math.PI / 180);
    cans.font = '18px Vedana';

    // 设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = 'rgba(255, 2, 2, 0.01)';

    // 设置文本内容的当前对齐方式
    cans.textAlign = 'left';

    // 设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'Middle';

    // 在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    cans.fillText(str, can.width / 8, can.height / 2);
    dom.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
}
```

## 还原水印

水印设置的特别淡，只有 0.01 的透明度(不透明是 1)，借助 ps 的色阶和曲线可以把水印展示出来。
