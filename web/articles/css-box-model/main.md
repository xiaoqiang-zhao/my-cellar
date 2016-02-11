# CSS 盒模型

> 盒模型是 CSS 中最基础和最重要的概念之一，用了很久没有系统的总结过，本文将总结一下和模型的基本原理，组要注意的点，还有 CSS3 中的 box-sizing 和 弹性盒模型。

## 基本概念

页面中的每一个元素在成像上都是一个长方形，而这个长方形的宽和高又受到位置相关属性的影响(如一个块元素被浮动那么可能其在宽度上不会填充满父元素)，所以我更倾向于将定位浮动等影响位置的相关属性也算在盒模型中。在 W3C 标准浏览器下：

	元素的实际宽度 = width + padding + contentWidth + borderWidth 

高度同理。

## 需要注意的两点

### 部分 form 元素

元素的实际宽度计算方式大多数遵循标准，但是 `input:submit,reset,button` 和 `select` 的计算方式不遵循标准，对其设置 `border` 和 `padding` 时他们只会向内延伸。而且高度设置在 chrome 上无效，所以一般会通过对 `button` 来重新定义样式结合 js 实现 `input:submit,reset,button`；`select` 通过样式修饰很难做浏览器兼容，所以项目中如果需要自定义 `select` 的样式，一般自己写一个组件来替换。
 
### 最外层的盒子

最外层的盒子是 window，iframe 和 app 的网页容器，这个盒子在一些渲染行为上会不同于普通元素。

[Demo Footer](/articles/css-box-model/demo/footer.html)



http://www.w3.org/Style/CSS/current-work.en.html上的截图。还可以到地址http://meiert.com/en/indices/cssproperties/（CSS各属性查询表）查看各个CSS属性属于哪个CSS版本，以及各个属性对应的默认值，以便更清楚地知道哪些属性是在CSS基础上添加的。

https://segmentfault.com/a/1190000000707526

