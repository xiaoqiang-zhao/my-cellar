# 译 JointJS API

> 可视化是软件开发中的一种思路，我们渴望不写代码拖拖拽拽，点击配置就可以生成可运行的项目，这是一个非常好的愿景，但是到目前为止方案很多但效果却并没有得到预期。我觉得这样的现状和这类系统的定位有关，这种交互行形式只适合做组合型的系统，可被操作的元素较少，关系种类较少，配置项较少，元素的关系的组合较多，并且希望用图形的方式来展示这些关系或节点状态。jointJs提供了基本支持，是二次开发的一个很不错的选择，本篇是[JointJS API](http://www.jointjs.com/api)的译文，期间会夹杂一些我的理解和实现方案。

## 概述

此文档针对开源框架 JointJS 的核心部分，如果你找的是 Rappid 的文档，请点击 [这里](http://www.jointjs.com/rappid/docs)，Rappid 是在 JointJS 基础上进行扩展功能更为丰富的组合套件。

JointJS 向外暴露三个全局变量：**joint**、**V** 和 **g**。

`joint` 下存放画示意图所需的全部对象，通过 `joint.version` 这个属性你可以知道当前使用的是哪一个版本 JointJS 

`V` 这一全局变量来自于一个轻量级被我们称作“Vectorizer”的 svg 框架，这个框架使操作 svg 变得更简单。JointJS 在内部使用这个框架，你一般不需要接触这个库，但是为了更好的使用 JointJS 了解一下这个库也是有益处的。

`g` 这一全局变量也来自 JointJS 内部使用的一个轻量级库，此库提供了很多好用的几何运算函数。同样你可能接触不到此库，但是如果你的项目中有几何运算，你一定会发现它的好处。

## 安装

首先你需要有库核心文件(joint.js 和 joint.css，或者对应的压缩版)。然后你还需要 JointJS 的依赖库：jQuery、Backbone、Lodash。

你可以向下面这样将资源引入到你的页面中：

	<link rel="stylesheet" type="text/css" href="joint.css" />
    <script src="jquery.min.js"></script>
    <script src="lodash.min.js"></script>
    <script src="backbone-min.js"></script>
    <script src="joint.js"></script>

访问[下载页面](http://www.jointjs.com/download)获取所需的文件。

## joint.dia.Element

### 概述

`joint.dia.Element` 是图形元素的基类。它是 [Backbone model](http://backbonejs.org/#Model) 模块，并添加了一些额外属性，第一个重要的属性就是每个元素都要有一个不重复的标识，这个标识被存储在 `id` 属性中。其他的属性可以被存放在下面三个组中：

Geometry(几何类属性)

元素的坐标以对象的形式被存储在 `position` 属性中，此对象包括两个属性 `x` 和 `y`，`position` 属性可以被初始化设置，也可以直接通过 Backbone 的 `get`/`set` 方法来获取/修改，还可通过下面的 `translate` 方法来修改。

旋转角度被存储在 `angle` 属性中，旋转的参照点始终是元素的中心，`angle` 属性同样可以被初始化设置，也可以直接通过 Backbone 的 `get`/`set` 方法来获取/修改，还可通过下面的 `rotate` 方法来修改。

元素的大小以对象的形式被存储在 `size` 属性中，此对象包括两个属性 `width` 和 `height`，`size` 属性同样可以被初始化设置，也可以直接通过 Backbone 的 `get`/`set` 方法来获取/修改，还可通过下面的 `resize` 方法来修改。

Presentation(外观类属性)

另外一个重要的属性是 `attrs`， `attrs` 是一个对象，其属性名是子元素的选择器，对应的值设置 svg 元素的属性从而改变元素的内容和外观，[这里](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)有 svg 元素属性列表。

需要重点注意，每一个通过 `joint.dia.Element` 定义的 svg 元素组合都要通过 `joint.dia.ElementView` 渲染到页面上。比如 `joint.shapes.basic.Rect` 元素组合(继承自`joint.dia.Element`) 在页面中表现如下：
 
    <g class="rotatable"><g class="scalable"><rect/></g><text/></g>

然而为一个矩形子元素填充红色，我们还需要为 `attrs` 添加如下属性：

	rect: { fill: 'red' }

再提一句，不建议直接修改 `attrs` 属性对象，建议通过 `attr` 方法来修改。

`z` 是一个特殊的属性，决定了子元素的层级遮盖关系，`z` 值大的元素在 `z` 值小的元素上面。

Nesting(关系)

最后两个重要属性是 `embeds` 和 `parent`，这两个属性用来定义元素的包含于被包含关系，`embeds` 定义包含哪些元素，其值是一个数组，存放被包含实例的 id。`parent` 存放父元素的 id，当父元素翻转的时候子元素跟着一起翻转。

**译者注**

所有的图形的数据对象都继承自 `joint.dia.Element`，但 `joint.dia.Element` 并不能直接使用，需要和视图关联才能在页面上渲染出图形。图形数据对象都被放在 `joint.shapes` 下，最基本的图形数据对象被放在 `joint.shapes.basic` 下。`joint.shapes.basic` 包含了矩形、圆、图片、文字等基本元素，可以像下面这样声明一个矩形：

	var rect = new joint.shapes.basic.Rect(...);

Demo [joint-dia-element.html](/articles/jointjs/demo/joint-dia-element.html) 下有完整示例。

### translate

`element.translate(tx, [ty], [opt])`

将一个元素在 x 轴方向移动 `tx` 像素，在 y 轴方向移动 `ty` 像素。`ty` 是一个可选参数，默认值为零。配置项参数 `opt` 可用来传递一些额外参数供监听事件 `'change:position'` 的回调函数来接收，`opt.transition` 可被用来设置过渡效果，而不是生硬的突然改变位置，配置详情见 ` joint.dia.Element:transition`。可以用 `opt.restrictedArea` 配置将移动限制在一个区域内，像这样:

	{
		x: 0,
		y: 0,
		width: 500,
		height: 500
	}

如果你想把它的移动方位限制在他的父元素中，只需要获取将父元素的 `BBox` 作为 `opt.restrictedArea` 的值，向下面这样：

	myElement.translate(50, 50, {
	    restrictedArea: graph.getCell(myElement.get('parent')).getBBox() 
	});

上面的代码保证在子元素不会移动到父元素外面，这种约束对其子元素同样生效。

译者注：

`translate` 是基于当前位置做位置改变，坐标左上角是原点，水平向右是 x 轴正方向，竖直向下是 y 轴正方向，`translate` 的位置变化值可正可负，分别对应于想坐标轴正向移动和负向移动。参见我写的 [示例](/articles/jointjs/demo/translate.html)

## joint.dia.Link

### 概述

**joint.dia.Link**是线的基类，在 [Backbone model](http://backbonejs.org/#Model) 的基础上添加一些重要属性，其中第一个不得不提的重要属性还是 id，其他的属性可以分为下面三类：

**Connections(连接信息)**

用 `source` 和 `target` 属性来定义线连接的起始元素，每个配置项如下面这样：

	{
        id: <id of an element>,
        selector: <CSS selector>,
        port: <id of a port>
    }

`id` 是元素模块的 ID；`selector` 是可选参数，定义连接到元素的子元素，匹配规则和 CSS 选择器一样；`port` 也是可选参数，定义连接的起始元素的位置。

**Presentation(外观类属性)**

一条线的外观取决于 `vertices`、`connector` 和 `router` 三个属性的设置。

`vertices` 定义线所经过的点。

	link.get('vertices')
    link.set('vertices', [{ x: 100, y: 120 }, { x: 150, y: 60 }])

`router` 同样是定义线所经过的点，与 `vertices` 不同的是：`vertices` 由用户定义，而 `router` 是计算而来。`router` 有三个系统预设的值分别是：`manhattan`、`metro` 和 `orthogonal`。前两个被称作智能路径，会自动避开元素使线不和元素重叠。`orthogonal` 和 `manhattan` 使线只能以水平和竖直线段链接，`metro` 这个容许以斜线的方式链接。

	link.set('router', { name: 'manhattan' });
    link.set('router', { name: 'metro' });
    link.set('router', { name: 'orthogonal' });

如果为了兼容旧版，可以设置 `manhattan` 为 `true`。

	// old approach
    link.set('manhattan', true)

`manhattan` 还有一些有用的配置项，用来配置路径的计算方式，这些配置放在 `args` 属性中，属性列表如下

- `excludeTypes` 
- `excludeEnds` 
- `startDirections`
- `endDirections`

(译者注：抱歉这个翻译结果和运行结果冲突，所以先放在这里不翻译)

示例：

	link.set('router', {
        name: 'manhattan',
        args: {
            startDirections: ['top'],
            endDirections: ['bottom'],
            excludeTypes: ['myNamespace.MyCommentElement']
        }
    });

你可以在命名空间 `joint.routers.[name of your router]` 下定义新的 `router`，或者直接将函数作为 `router` 配置项，这个函数的形式为 `function(vertices, args, linkView)` 必须返回一个点的集合，来定义线需要经过的点。

`connector` 参数定义线的路线渲染风格：normal(普通，为默认值，横平竖直), smooth(平滑，曲线) 和 rounded(圆角)。

	link.set('connector', { name: 'normal' });
    link.set('connector', { name: 'smooth' });

`rounded` 需要设置圆角。

	link.set('connector', { name: 'rounded', args: { radius: 10 }});

如果为了兼容旧版可以向下面这样设置：

	// old approach
    link.set('smooth', true)

从上面代码可以看出 `router`和`connector` 的设置是非常简单的，而且很方便自定义。可以将自定义的 `connector` 放在 `joint.connectors.[name of your connector]` 下面也可以直接将函数作为`connector`配置的值，函数的形式是 `function(sourcePoint, targetPoint, vertices, args, linkView)`，返回值必须是 [SVG path data](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d)，此值会被用来渲染线的路径。

在 `sttrs` 属性中可以设置线的样式，你可以在 `joint.dia.Element` 和 `joint.dia.Link` 中中找到更多信息。线和元素一样包含 `z` 属性来定义层级关系。

### attr

### removeAttr
	
## joint.dia.Graph

### 概述

`joint.dia.Graph` 存储包括`Link` 和 `Element`所有的图形。它是一个 [Backbone model](http://backbonejs.org/#Model)，将所有的图像存储在 `cells` 属性中。它是所有图形背后强大的数据模块，不仅直接提供图形的数据存储，还提供图形绘制的算法支持。

## joint.dia.Paper

`joint.dia.Paper` 是 `joint.dia.Graph` 的视图模块，继承自 [Backbone View](http://backbonejs.org/#View)。当视图和数据关联起来时，向数据模块添加图形数据，视图模块会立刻将其渲染到界面上。
		
	var graph = new joint.dia.Graph
	var paper = new joint.dia.Paper({
		el: $('#paper'),
		width: 600,
		height: 400,
		gridSize: 10,
		model: graph
	})
	var rect = new joint.shapes.basic.Rect({
		position: { x: 50, y: 70 },
		size: { width: 100, height: 40 }
	})
	graph.addCell(rect)

## joint.dia.ElementView

### 概述

`joint.dia.ElementView` 是 `joint.dia.Element`本身或者其集成对象的视图，继承自 [Backbone View](http://backbonejs.org/#View)。`joint.dia.ElementView` 负责将元素的设置渲染到视图中，转换的方式也在它内部定义。`joint.dia.ElementView` 还维护事件。可以通过 `paper` 的 `findViewByModel` 方法查找数据对应的视图。

## joint.dia.LinkView

### 概述

`joint.dia.LinkView` 是 `joint.dia.Link`本身或者其集成对象的视图，继承自 [Backbone View](http://backbonejs.org/#View)。`joint.dia.LinkView` 负责将数据模块的设置渲染到视图中。

## Special Attributes

### 概述

`Special Attributes` 是 JointJS 定义的，帮助用户自定义时尚的图形元素。关于如何自定义元素请参看[Creating custom elements ](http://www.jointjs.com/tutorial#custom-elements)章节。

## Utility Functions

> 在 `joint.util` 下的常用函数介绍。

### uuid

`joint.util.uuid()` 生成一个独一无二的 id。

### guid

`joint.util.guid()` 为 page 返回一个独一无二的 id

## Vectorizer

### 概述

JointJS提供了三个全局变量：`joint`、`v` 和 `g`(在Geometry中将详细介绍)。`v` 是一个辅助处理 svg 的函数，来自 我们称为 Vectorizer 的库。我们将它作为全局变量而没有放在 `joint` 命名空间下的理由是，它是一个独立的库，不依赖于 `joint`可以单独被使用。 它是一个非常有用的库，会使处理 svg 变得更简单容易，你甚至可以把它看成一个针对 svg 的轻量级 jQuery。如果你想单独使用 Vectorizer 这个库，可以到下载页面，那里有[开发版和压缩版](http://www.jointjs.com/download#vectorizer)可供下载。

### V

`V(svg)` 返回一个 Vectorizer 对象。 如果 `svg` 参数是字符串，那么会被解析成 SVG DOM 元素节点，然后包装成 Vectorizer 对象返回；如果 `svg` 参数已经是 SVG DOM 元素节点，那么直接包装返回。你可以把 V 看做是 jQuery 的对外变量 `$`，只是 `V` 不接受选择器参数。Vectorizer 对象提供了 `node` 属性来对外提供原生的 SVG DOM 元素节点。示例如下：

	var myElement = V('<g><rect/><text/></g>');
    console.log(myElement.node);  // SVGGroupElement
    myElement = V(document.querySelector('#mySVGElement'));
    
    var myCircle = V('circle', { r: 5, fill: 'red' });
    console.log(myCircle.node);  // SVGCircleElement

## Geometry

### 概述

和Vectorizer一样，Geometry是另外一个内嵌到 JointJS 中的轻量级库。此库提供了很多有用的关于几何学的计算方法，并且不依赖于任何其他库，可以被单独使用，可以到下载页面，那里有[开发版和压缩版](http://www.jointjs.com/download#geometry)可供下载。

## 译者语

这是一个整体的 [Demo](/articles/jointjs/demo/my-graph.html).

## 参考页面

[官网](http://www.jointjs.com/)

[jointJs API](http://www.jointjs.com/api)

[Vectorizer API](http://www.jointjs.com/api#v)

[Geometry API](http://www.jointjs.com/api#g)

[github](https://github.com/clientIO/joint)