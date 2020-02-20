# Three.js 学习笔记

> 一款开源 3D 绘图 JS 引擎。

## 概述与准备

### 概述

创建一个原生 WebGL 程序，你基本上需要 4 个步骤:

- 初始化WebGL绘图上下文;
- 初始化着色器程序;
- 建立模型和数据缓存;
- 完成绘制和动画.

这基本是一种过程式编程，Three.js 使用面向对象的方式来构建程序。包含 3 个基本对象: 场景(scene)，相机(camera)，以及一个渲染器(renderer)。

拿电影来类比的话，场景对应于整个布景空间，相机是拍摄镜头，渲染器用来把拍摄好的场景转换成胶卷(对于网页来讲，是电脑屏幕)。 场景和相机代表了 3D 观察空间和数据模型，渲染器则包含了 WebGL 绘图上下文和着色器。

### 工程准备

新建一个 demo 目录，然后执行 `npm init` 初始化一个叫"threejs-demo"的项目，安装 three.js 到项目中 `npm install three --save`。

新建一个 demo-01.html 内容如下:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset=utf-8>
		<title>My first Three.js app</title>
		<style>
			body { margin: 0; }
			canvas { width: 100%; height: 100% }
		</style>
	</head>
	<body>
        My first Three.js app
		<script src="/node_modules/three/three.min.js"></script>
		<script>
			console.log(THREE);
		</script>
	</body>
</html>
```

在浏览器中直接运行该文件，如果能在控制台看到一个 THREE 对象输出，那么工程就准备好了。




### 简单示例

## 参考


github: https://github.com/mrdoob/three.js/

官网: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

