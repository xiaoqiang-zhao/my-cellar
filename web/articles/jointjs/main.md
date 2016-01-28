# 译 JointJS API

> 可视化是软件开发中的一种思路，我们渴望不写代码拖拖拽拽，点击配置就可以生成可运行的项目，这是一个非常好的愿景，但是到目前为止方案很多但效果却并没有得到预期。我觉得这样的现状和这类系统的定位有关，这种交互行形式只适合做组合型的系统，可被操作的元素较少，关系种类较少，配置项较少，元素的关系的组合较多，并且希望用图形的方式来展示这些关系或节点状态。jointJs提供了基本支持，是二次开发的一个很不错的选择，本文翻译一些官方资料，期间会夹杂一些我的理解和实现方案。

## 概述

**原文**

This is the API reference to the open source JointJS core library. If you're looking for a documentation to the Rappid diagramming toolkit, the extension to JointJS, go [here](http://www.jointjs.com/rappid/docs).

JointJS library exports three global variables: **joint**, **V** and **g**.

The joint namespace contains all the objects that you use to build up your diagrams. Additionally, joint.version property tells you which version of JointJS you're using.

The V variable is a global exported by a lightweight SVG library that we call a Vectorizer. This tiny library makes manipulation with SVG documents much easier. JointJS uses this library internally. Normally, you don't have to get in touch with this library at all but for advanced uses, it can be handy.

The g namespace is another lighweight library used internally by JointJS that provides many useful geometry operations. Again, you might not get in touch with this library but when you do have the need to perform geometric operations in your applications, you'll certainly find it helpful.

**译文**

此文档针对开源框架 JointJS 的核心部分，如果你找的是 Rappid 的文档，请点击 [这里](http://www.jointjs.com/rappid/docs)，Rappid 是在 JointJS 基础上进行扩展功能更为丰富的组合套件。

JointJS 向外暴露三个全局变量：**joint**、**V** 和 **g**。

`joint` 下存放画示意图所需的全部对象，通过 `joint.version` 这个属性你可以知道当前使用的是哪一个版本 JointJS 

`v` 这一全局变量来自于一个轻量级被我们称作“Vectorizer”的 svg 框架，这个框架使操作 svg 变得更简单。JointJS 在内部使用这个框架，你一般不需要接触这个库，但是为了更好的使用 JointJS 了解一下这个库也是有益处的。

`g` 这一全局变量也来自 JointJS 内部使用的一个轻量级库，此库提供了很多好用的集合运算函数。同样你可能接触不到此库，但是如果你的项目中有几何运算，你一定会发现它的好处。

## 安装

**原文**

First you need to have the library core files (joint.js and joint.css - or their minified versions). Then you have to include the JointJS dependencies: jQuery, Backbone and Lodash libraries.

Here's how you can install JointJS into your page:

	<link rel="stylesheet" type="text/css" href="joint.css" />
    <script src="jquery.min.js"></script>
    <script src="lodash.min.js"></script>
    <script src="backbone-min.js"></script>
    <script src="joint.js"></script>

Visit the [Download page](http://www.jointjs.com/download) to download all the necessary files.

**译文**

首先你需要有库核心文件(joint.js 和 joint.css，或者对应的压缩版)。然后你还需要 JointJS 的依赖库：jQuery、Backbone、Lodash。

你可以向下面这样将资源引入到你的页面中：

	<link rel="stylesheet" type="text/css" href="joint.css" />
    <script src="jquery.min.js"></script>
    <script src="lodash.min.js"></script>
    <script src="backbone-min.js"></script>
    <script src="joint.js"></script>

访问[下载页面](http://www.jointjs.com/download)获取所需的文件。

## JOINT.DIA.ELEMENT

### 概述

**原文**

joint.dia.Element is the basic model for diagram elements. It's a Backbone model with couple of additional important properties. The first one to mention is a unique identifier for the element. Each element has a unique ID that is stored in the id property. This id has a form of pseudo-generated UUID. Other properties can be put into three groups:

Geometry

Coordinates of an element are stored in the position property that is an object with x and y keys.  position can be accessed or set directly using the regular Backbone set()/get() methods or through the translate method.

Rotation angle is stored in the angle property. This angle is in degrees and the rotation origin is always considered to be the center of the element. angle can be also accessed or set directly using the regular Backbone set()/get() methods or through the rotate method.

Size of an element is stored in the size property that is an object with width and height keys. Again, size can be accessed or set directly using the regular Backbone set()/get() methods or through the resize method.

Presentation

Another important property is attrs which is an object with keys representing selectors that match subelements and values which are SVG attributes that will be set on the subelements. One can find a list of SVG attributes and their descriptions e.g. on MDN.

It is important to note that each joint.dia.Element defines an SVG markup which is then used by joint.dia.ElementView to render the element to the paper. For instance, the joint.shapes.basic.Rect element (that inherits from joint.dia.Element) defines its markup as follows:


    <g class="rotatable"><g class="scalable"><rect/></g><text/></g>
            
Therefore, in order to set a red fill color for the rectangle subelement, the attrs object should contain:

    rect: { fill: 'red' }
            
Again, it is not recommended to change the attrs object directly. Instead, use the attr method.
The z property specifies the stack order of the element in the SVG DOM. An element with a higher z level is in front of an element with a lower z level. (This also stands for links which have the exact same property.)

Nesting

The last two properties of elements are embeds and parent. These two are related to elements that contain or are contained withing other elements forming a hierarchical structure.  embeds is a list of cell id's that are embedded inside the element. parent is an id of the parent element of the embedded one. When a parent element is translated, all its children get translated too.

**译文**

`joint.dia.Element` 是图形元素的集成模块。它是 [Backbone model](http://backbonejs.org/#Model) 模块，并添加了一些额外属性，第一个重要的属性就是每个元素都要有一个不重复的标识，这个标识被存储在 `id` 属性中。其他的属性可以被存放在下面三个组中：

Geometry(几何类属性)

元素的坐标以对象的形式被存储在 `position` 属性中，此对象包括两个属性 `x` 和 `y`，`position` 属性可以被初始化设置，也可以直接通过 Backbone 的 `get`/`set` 方法来获取/修改，还可通过下面的 `translate` 方法来修改。

旋转角度被存储在 `angle` 属性中，旋转的参照点始终是元素的中心，`angle` 属性同样可以被初始化设置，也可以直接通过 Backbone 的 `get`/`set` 方法来获取/修改，还可通过下面的 `rotate` 方法来修改。

元素的大小以对象的形式被存储在 `size` 属性中，此对象包括两个属性 `width` 和 `height`，`size` 属性同样可以被初始化设置，也可以直接通过 Backbone 的 `get`/`set` 方法来获取/修改，还可通过下面的 `resize` 方法来修改。

Presentation(外观类属性)

另外一个重要的属性是 `attrs`， `attrs` 是一个对象，其属性名是子元素的选择器，对应的值设置 svg 元素的属性从而改变元素的内容和外观，[这里](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)有 svg 元素属性列表。

需要重点注意，每一个通过 `joint.dia.Element` 定义的 svg 元素组合都要通过 `joint.dia.ElementView` 渲染到页面上。比如 `joint.shapes.basic.Rect` 元素组合(继承自`joint.dia.Element`) 在页面中表现如下：
 
    <g class="rotatable"><g class="scalable"><rect/></g><text/></g>

然而为了为一个矩形子元素填充红色，我们还需要为 `attrs` 添加如下属性：

	rect: { fill: 'red' }

在提一句不建议直接修改 `attrs` 属性对象，建议通过 `attr` 方法来修改。

`z` 是一个特殊的属性，决定了子元素的层级遮盖关系，`z` 值大的元素在 `z` 值小的元素上面。

Nesting(关系)

最后两个重要属性是 `embeds` 和 `parent`，这两个属性用来定义元素的包含于被包含关系，`embeds` 定义包含哪些元素，其值是一个数组，存放被包含实例的 id。`parent` 存放父元素的 id，当父元素翻转的时候子元素跟着一起翻转。

### translate

**原文**

`element.translate(tx, [ty], [opt])`

Translate an element by tx pixels in x axis and ty pixels in y axis.  ty is optional in which case the translation in y axis will be considered zero. The optional options object opt can be used to pass additional parameters to the event handlers listening on 'change:position' events. opt.transition can be used to initiate an animated transition rather than a sudden move of the element. See joint.dia.Element:transition for more info on transitions. If opt.restrictedArea is set, the translation of the element will be restricted to that area only. The restrictedArea is an object of the form { x: Number, y: Number, width: Number, height: Number }. This is useful, e.g. if you want to restrict the translation of an embedded element within its parent. The only thing you have to do in this case is to pass the bounding box of the parent element to the restrictedArea option:

	myElement.translate(50, 50, { restrictedArea: graph.getCell(myElement.get('parent')).getBBox() })

The code above makes sure that the element myElement never crosses the bounding box of its parent element. note that this also works if the element myElement has other embedded elements. In other words, the bounding box of the myElement that is used to calculate the restriction is the total bounding box, including all its children (in case they are sticking out).

**译文**

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

**译者注**

所有的图形都继承自 `joint.dia.Element`，但其并不能直接使用，需要将其包装成图形来使用。图形都被放在 `joint.shapes` 下，最基本的图形被放在 `joint.shapes.basic` 下。`joint.shapes.basic` 包含了矩形、圆、图片、文字等基本元素，可以像下面这样声明一个矩形：

	var rect = new joint.shapes.basic.Rect(...);

Demo [joint-dia-element.html](./demo/joint-dia-element.html) 下有完整示例。

## joint.dia.Link

## joint.dia.Graph

## joint.dia.Paper

## joint.dia.ElementView

## joint.dia.LinkView

## Special Attributes

## Utility Functions

## Vectorizer

## Geometry

## 参考页面

[官网](http://www.jointjs.com/)

[jointJs API](http://www.jointjs.com/api)

[Vectorizer API](http://www.jointjs.com/api#v)

[Geometry API](http://www.jointjs.com/api#g)

[github](https://github.com/clientIO/joint)