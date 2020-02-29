# Three.js 基础学习笔记

> 一款开源 3D 绘图 JS 引擎。

## 概述与准备

### 概述

threejs 是一个让用户通过 javascript 入手进入搭建 webgl 项目的类库。众所周知学习 webgl 需要图形学知识，而 webgl 需要通过 js 和 glsl 两种语言。如果我们不通过 threejs 使用 webgl 势必逃不过底层知识: 你必须全面了解着色器语法和自己编写顶点着色片元着色；但你使用了 threejs 显然可以便捷的逃过这些难懂的底层，对于传统 js 从业人员挑战的 shader 确实是有难度的。

所以我推荐你跳过底层基础，先从 threejs 开始。随着水平越来越高在需要的时候再去补底层基础，整理思路是先大框架再技术细节。下面的学习也是这样一个思路，先从一个示例开始学习整体，再深入和展开示例中的每一个技术细节。

有几个概念是需要提前了解的:

- 场景(Scene)，你可以理解为一个超大的摄影棚；
- 摄影机(Camera)，将摄影棚内发生的事情，用一个视角去记录，最后展示在二维屏幕上；
- 物体(Object)，有了摄影棚和摄像机总要拍点什么吧，与现实世界不同的是这里的物体都是通过数学模型来呈现的，最主要的两个点是形状(Geometry)和材质(Material)；
- 光(Light)，在黑暗的屋子里是什么也看不到的；
- 渲染器(Renderer)，将三维世界以摄影机的视角渲染到二维屏幕上；
- 动画(Animation)，让物体和相机动起来。

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

![动画图像](/articles/threeJs/img/demo-01.gif)

```js
// 场景
var scene = new THREE.Scene();
// 摄像机
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 添加渲染器生成的 canvas 到页面的 body 中
document.body.appendChild(renderer.domElement);

// 几何图形
var geometry = new THREE.BoxGeometry(1, 1, 1);
// 材质
var material = new THREE.MeshBasicMaterial({
	color: 0x4169E1
});
// 立方体
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 动画渲染
var render = function () {
	requestAnimationFrame(render);

	// 角度旋转
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
};

render();
```

以上是主要代码，全量代码在 demo-01.html 中。

## 场景(Scene)

与场景相关的代码片段:
```js
var scene = new THREE.Scene();
// ...
scene.add(cube);
// ...
renderer.render(scene, camera);
```

场景中最重要的一个概念就是三维坐标系。Three 中使用采用常见的右手坐标系定位。

![坐标系](/articles/threeJs/img/coordinate.png)

通过 `new THREE.Scene()` 实例化一个场景实例，通过实例函数 `add` 将物体添加到场景中，最后用 `renderer.render` 函数将相机视角下的场景渲染到二维平面。

为了更好的理解场景坐标系，我写了包含坐标系的 Demo:

![带坐标系的动画](/articles/threeJs/img/demo-02.gif)

正方体在坐标系原点，摄影机在 (5, 5, 5)，向原点方向拍摄，红色: x，绿色: y，蓝色: z。你可以在 demo-02.html 中找到全部代码。试着改变摄像机的位置和方向可以更好的理解坐标系概念，为下一章相机打好基础。

## 摄影机(Camera)

threejs 中的相机有两种，分别是正投影相机 THREE.OrthographicCamera 和透视投影相机 THREE.PerspectiveCamera。

正交镜头的特点是，物品的渲染尺寸与它距离镜头的远近无关。也就是说在场景中移动一个物体，其大小不会变化。正交镜头适合2D游戏。 

透视镜头则是模拟人眼的视觉特点，距离远的物体显得更小。透视镜头通常更适合3D渲染。示例中用的就是这种镜头，关键代码如下:

```js
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;
```

第一个参数 75 是视角(fov)，摄像机视锥体垂直视野角度，从视图的底部到顶部，以角度来表示。默认值是50。

第二个参数是摄像机视锥体长宽比(aspect)，通常是使用画布的宽/画布的高。默认值是1（正方形画布）。

第三个参数是摄像机视锥体近端面(near)，默认值 0.1。

最后一个参数是摄像机视锥体远端面(far)，默认值 2000。

near 和 far 都是用来优化渲染性能的，太近和太远的物体不参与渲染。配合下图更容易理解:

![透视镜头图](/articles/threeJs/img/camera.jpg)

最后附上摄像机示例 demo-03。

## 物体(Object)

### 网格模型(Mesh)

计算机的世界里，一条弧线是由**有限条线段**连接得到的。线段很多时，看起来就是一条平滑的弧线了。计算机中的三维模型也是类似的，普遍的做法是用三角形组成的网格来描述，我们把这种模型称之为 Mesh 模型。

![Mesh](/articles/threeJs/img/mesh.jpg)

看这只兔子，随着三角形数量的增加，它的表面越来越平滑/准确。

```js
Mesh(geometry, material)
```

Mesh 有两个重要组成，形状和材质，下面分别介绍。

### 形状(Geometry)

Geometry，形状，相当直观。Geometry通过存储模型用到的点集和点间关系(哪些点构成一个三角形)来达到描述物体形状的目的。

threejs 提供了长方体、圆柱体、四面体等三维模型。对于比较复杂的形状，还可以从外部导入(以文件的形式)。

示例中的正方体声明:

```js
// 长宽高都为 1 的正方体
var geometry = new THREE.BoxGeometry(1, 1, 1);
```

BoxGeometry 构造器: BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)。

- width — X轴上面的宽度，默认值为1。
- height — Y轴上面的高度，默认值为1。
- depth — Z轴上面的深度，默认值为1。
- widthSegments — （可选）宽度的分段数，默认值是1。
- heightSegments — （可选）宽度的分段数，默认值是1。
- depthSegments — （可选）宽度的分段数，默认值是1。

mesh 实例的默认位置是坐标系原点，可以使用实例的 `position.set` 方法设置位置，如下面的圆柱:

```js
var cylinderGeometry = new THREE.CylinderGeometry(1, 1, 3, 100);
var cylinder = new THREE.Mesh(cylinderGeometry, material);
cylinder.position.set(0, 2, 0);
```

CylinderGeometry 构造器: CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)

- radiusTop — 圆柱的顶部半径，默认值是1。
- radiusBottom — 圆柱的底部半径，默认值是1。
- height — 圆柱的高度，默认值是1。
- radialSegments — 圆柱侧面周围的分段数，默认为8。
- heightSegments — 圆柱侧面沿着其高度的分段数，默认值为1。
- openEnded — 一个Boolean值，指明该圆锥的底面是开放的还是封顶的。默认值为false，即其底面默认是封顶的。
- thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）
- thetaLength — 圆柱底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆柱。

widthSegments 与 heightSegments 指定了球的精致程度，当值较小时你可以看到清晰的棱角，这样的好处是在旋转时你可以感受到变化，纯粹的集合球体转动时很难被感受到。

更多的图像参考官方文档的几何体部分(geometries): https://threejs.org/docs/index.html。

最后附上摄像机示例 demo-04。

### 材质(Material)

材质其实是物体表面除了形状以为所有可视属性的集合，例如色彩、纹理、光滑度、透明度、反射率、折射率、发光度。

上面的示例中，几何体的材质都是用的 MeshBasicMaterial，有一种太纯净的不真实感，最大的优势在于不受光照影响，所以常用于入门 Demo 演示中。threejs 提供了多钟材质，比如其中的 MeshStandardMaterial 是一种更接近物理规律的材质，这就意味着如果使用这种材质，需要有光源辅助才能看到物体。

![Material](/articles/threeJs/img/material.gif)

材质:

```js
var material = new THREE.MeshStandardMaterial({
	color: 0x4169E1
});
```

两个几何体:

```js
// 几何图形 - 立方体
var box = new THREE.BoxGeometry(1, 1, 1, 10);
var cube = new THREE.Mesh(box, material);
cube.position.set(-2, 0, 0);

// 几何图形 - 圆柱
var cylinderGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3, 100);
var cylinder = new THREE.Mesh(cylinderGeometry, material);
cylinder.position.set(2, 0, 0);
```

最后附上示例 demo-05。

## 光(Light)

如果没有光在黑暗的屋子里是什么也看不到的，第一个要介绍的就是环境光(AmbientLight)，从每一个方向均匀照射过来的光，不能用来投射阴影(类似手术台上的无影灯)，如果不加环境光平行光找不到的地方会全黑。构造函数: AmbientLight( color : Integer, intensity : Float )。

- color - (参数可选）颜色的rgb数值。缺省值为 0xffffff。
- intensity - (参数可选)光照的强度。缺省值为 1。

```js
// 光 - 环境光使物体整体可见
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
```

另一个必须介绍的就是平行光(DirectionalLight)，沿着特定方向发射的光，能产生阴影和明暗变化，不打平行光有棱角的几何体边角位置特别没有识别度，你可以试试把 demo 中的平行光关掉体验一下。构造函数同上。

通过 `light.position.set(x, y, z)` 函数设置光源方向。

```js
// 光 - 平行光展示阴影
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
```

## 渲染器(Renderer)

将三维世界以摄影机的视角渲染到二维屏幕上。介绍两个重要参数:

- antialias  - 是否执行抗锯齿，默认为false。
- canvas - 一个供渲染器绘制其输出的 canvas 它，和它的 domElement 属性对应。如果没有传这个参数，会创建一个新canvas。

```js
// 渲染器
var renderer = new THREE.WebGLRenderer({
	// 抗锯齿
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
// 添加渲染器生成的 canvas 到页面的 body 中
document.body.appendChild(renderer.domElement);
```

最后附上示例 demo-06。

## 动画(Animation)

threeJs 的动画原理是修改参数然后渲染输出一帧图画，如此动作一直操作看起来就动起来了。这里推荐 HTML5 为我们提供的 requestAnimFrame 框架，搭配渲染器我们可以这样使用:

```js
var render = function () {
	requestAnimationFrame(render);

	// 调整旋转角度
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
};

render();
```

## 参考

github: https://github.com/mrdoob/three.js/

官网: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

[ThreeJS快速入门](https://zhuanlan.zhihu.com/p/23272116)

[如何系统的学习three.js](https://www.zhihu.com/question/36367846)

[视频课程](https://www.udacity.com/course/interactive-3d-graphics--cs291)
