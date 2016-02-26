# CSS 动画(一)

> 目前我对于 CSS 动画还是一个菜鸟，从不会到熟练总需要一个过程，本篇从语法开始，记录我的学习，算是一份技术点备忘录吧。

## 过渡

> CSS 动画有两种实现方式，其中较为简单的就是过渡 -- `transition`，在一定的时间区间内平滑地过渡。当通过 `hover` 等伪类、直接改 class 或样式值引起样式变化，`transition`可使样式平滑地过渡。

### 语法

语法：

	transition: [transition-property] transition-duration [transition-timing-function] [transition-delay]
	// 多组设置用逗号间隔

**transition-property** 定义过渡样式

- all 默认值，全部样式都过渡


浏览器支持情况：IE0+，Firefox，Chrome，Safari。

[示例](/articles/css-animate/demo/start.html)

## 关键帧

## 参考网站

[CSS 实现的加载动画](http://vadimsva.github.io/waitMe/)