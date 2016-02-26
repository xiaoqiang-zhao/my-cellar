# CSS 动画(一)

> 目前我对于 CSS 动画还是一个菜鸟，从不会到熟练总需要一个过程，本篇从语法开始，记录我的学习，算是一份技术点备忘录吧。

## 过渡

> CSS 动画有两种实现方式，其中较为简单的就是过渡 -- `transition`，在一定的时间区间内平滑地过渡。当通过 `hover` 等伪类、直接改 class 或样式值引起样式变化，`transition`可使样式平滑地过渡。
[示例](/articles/css-animate/demo/start.html)

### 语法

语法：

	transition: [transition-property] transition-duration [transition-timing-function] [transition-delay]
	// 也就是：
	transition: [过渡属性] 过渡持续时间 [动画函数] [过渡延迟时间]
	// 多组设置用逗号间隔
	

`transition-property` 定义过渡样式

- all 默认值，全部可过渡的样式，在下面会给出那些样式可过渡
- none 不对任何样式进行过渡，当过渡还没完成时突然将过渡属性设为 `none`，过渡会直接跳到结尾，
[示例](/articles/css-animate/demo/t-p-none.html)
- 单独属性，并不是所有属性都可以过渡，只有属性具有中间点值才能具备过度效果，这里就不一一列举了，
参见[这里](https://www.w3.org/TR/css3-transitions/#properties-from-css-)

这里需要提醒一点是，并不是什么属性改变都为触发transition动作效果，比如页面的自适应宽度，当浏览器改变宽度时，并不会触发transition的效果。

浏览器支持情况：IE0+，Firefox，Chrome，Safari。

`transition-duration` 定义过渡持续时间，单位为s(秒)或ms(毫秒)，默认值是0，当属性值为零时看不到过渡效果，所以过渡时间是动画事实上的不可缺属性。可以像下面这样使用此属性：

	transition: 0.5s;
	transition: .5s;
	transition: 500ms;

`transition-timing-function` 动画函数，用来指定变化速度，有如下值可供选择：

- ease 默认值，慢速开始，然后变快，然后慢速结束的过渡效果，等于 cubic-bezier(0.25, 0.1, 0.25, 1)
- linear 以相同速度开始至结束的过渡效果，等于 cubic-bezier(0,0,1,1)
- ease-in 以慢速开始的过渡效果，等于 cubic-bezier(0.42,0,1,1)
- ease-out 以慢速结束的过渡效果，等于 cubic-bezier(0,0,0.58,1)
- ease-in-out 以慢速开始和结束的过渡效果，等于 cubic-bezier(0.42,0,0.58,1)
- cubic-bezier(x1,y1,x2,y2)	在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
- steps(<integer>[, [ start | end ] ]?)：接受两个参数的步进函数。第一个参数必须为正整数，指定函数的步数。第二个参数取值可以是start或end，指定每一步的值发生变化的时间点。第二个参数是可选的，默认值为end。

需要对 `cubic-bezier` 函数的四个参数做一个简单的说明，速度变化采用三次贝塞尔曲线来描述，一条贝塞尔曲线需要四个点来描述如下图：

![image](img/bezier.png) 

为了简化，在CSS中将决定曲线位置的两点固化，也就是图中白色的两点，他们的坐标分别是(0,0)和(1,1)，留出两个点来供我们自定义曲线的弯曲状态，这两个点必须在[(0,0),(1,0),(1,1),(0,1)]这个范围内，所以定义弯曲状态的两个点的坐标的取值范围是零到一(包括零和一)，前两个值是红点的坐标，后两个值是蓝点的坐标。从图中可以看出“横轴是时间，纵轴是位置”，所以曲线越陡的部分速度越快。可以借助[cubic-bezier.com](http://cubic-bezier.com/)这一网站工具来体验曲线形状和生成坐标点。

[关于过渡的示例](/articles/css-animate/demo/t-t-f.html)

## 关键帧

## 参考网站

[CSS3中的Transition属性详解](http://www.php100.com/html/webkaifa/DIV_CSS/2012/1029/11403.html)

[CSS 实现的加载动画](http://vadimsva.github.io/waitMe/)
