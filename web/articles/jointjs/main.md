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




## 参考页面

[官网](http://www.jointjs.com/)

[jointJs API](http://www.jointjs.com/api)

[Vectorizer API](http://www.jointjs.com/api#v)

[Geometry API](http://www.jointjs.com/api#g)

[github](https://github.com/clientIO/joint)