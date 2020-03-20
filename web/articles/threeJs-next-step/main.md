# Three.js 进阶学习笔记

> 前面的 “Three.js 基础学习笔记” 是入门，搭建起了体系的主干框架，这一篇进阶讲解主干之外的一些支脉，这些支脉在特定场景下有其独特的实用价值。

## 工程

以简单单页面形式运行只适合入门，在项目中需要对包进行管理，另外有些插件不支持直接引入，需要 import 引入。

以 webpack 为基础，支持 `npm run dev` 启动 web 服务和热加载等服务。

新建了项目: https://github.com/xiaoqiang-zhao/threejs-webpack

需要下载到本地安装依赖再运行。

## 摄影机(Camera)

使用轨道控制器航拍: 在 x 轴上创建两个几何体，分别在原点两侧。摄像机在垂直 x 轴高度为 3 的圆周上绕原点拍摄。使用轨道控制器航拍，绕 y 轴进行拍摄，可以用鼠标滚轮调整摄像机位置，键盘的上下左右操纵相机在 xy 平面上的上下左右移动，鼠标的滚轮对应 z 轴上的前进和后退。相机的移动比变焦的好处就是他可以穿过物体看到前面的东西，而不是正前方的物体挡住视线。

![Camera](/articles/threeJs-next-step/img/Camera.gif)

核心代码如下:

```js
import OrbitControls from 'three-orbit-controls';
const Controls = OrbitControls(THREE);
const controls = new Controls(camera, renderer.domElement);

// 自动围绕目标旋转
controls.autoRotate = true;

function animate() {

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);

}
animate();
```

另外你会看到接收投影的平面在其背面移动到相机前方时是不可见的，这是因为无厚度平面默认是单向的背面不可见，双向可见需要配置开启: `plane.material.side = THREE.DoubleSide;`。

最后附上全量代码: https://github.com/xiaoqiang-zhao/threejs-webpack/blob/master/src/pages/demo-01.vue

## 物体(Object)

物体除了我们前面重点介绍过的正方体和圆柱，还有一些纯几何的物体，这些物体不像现实中的任何东西，比如没有厚度的面，没有粗细的线。

长方体是 BoxGeometry，圆柱体是 CylinderGeometry，下面介绍平面和线以及它们对应的材质。 

### 点

点，一种没有大小和具体形状的几何体，也就没有了面光和背光以及阴影等特性。

![point](/articles/threeJs-next-step/img/point.gif)

点没有固定的几何体，直接用 `THREE.Geometry` 做容器，然后放入坐标值，点的基础材质是 `THREE.PointsMaterial`，生成点的代码如下:

```js
// 点的几何体
const pointGeometry = new THREE.Geometry();
// 点的位置
const position = new THREE.Vector3(1, 1, 1);
const position2 = new THREE.Vector3(-1, -1, -1);
pointGeometry.vertices.push(position, position2);
// 点的材质
const pointMaterial = new THREE.PointsMaterial({
    color: 0x888888,
    size: 0.1
});
const point = new THREE.Points(pointGeometry, pointMaterial);
scene.add(point);
```

### 线

用线可以画出简单的集合图形，比如这个直角三角形:

![line](/articles/threeJs-next-step/img/line.gif)

```js
const points = [
    new THREE.Vector3(1, 2, 1),
    new THREE.Vector3(1, 0, 1),
    new THREE.Vector3(2, 0, 1),
    new THREE.Vector3(1, 2, 1)
];
const geometry = new THREE.Geometry().setFromPoints(points);

const material = new THREE.LineBasicMaterial({
    // 白色
    color: 0xfffffff
});
const line = new THREE.Line(geometry, material);
scene.add(line);
```

### 面(PlaneGeometry)

创建 4 个平面如下(小圆球为模拟光源):

![plane](/articles/threeJs-next-step/img/plane.gif)

核心代码:

```js
var planeGeometry = new THREE.PlaneGeometry(2.5, 1.5, 50);
var planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x4169E1,
    // 无厚度平面默认是单向的，背面不可见，双向可见需要配置开启
    side: THREE.DoubleSide,
    // 透明度设置
    transparent: true,
    opacity: 0.8
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(1.25, 0, 0);
plane.castShadow = true;

plane.lookAt(0, 0, 0);
scene.add(plane);
```

注意设置双面可见平面。还可以设置平面的半透明度。

有一个问题没有解决，在设置完平面的半透明度后，投影没有变淡，和完全不透明的投影相同。

最后附上全量代码: https://github.com/xiaoqiang-zhao/threejs-webpack/blob/master/src/pages/demo-04.vue

### 文字

从官方文档中看到需要一个字体的 json 文件，官方示例中的字体 json 文件只支持英文，我们去找一个中文的。首先需要去下载一个 ttf 的字体文件，比如微软雅黑，微软雅黑不是免费字体，但是作为个人研究是没问题的，我们去站长下载它: [微软雅黑字体下载](http://font.chinaz.com/940144340.htm)

然后到 http://gero3.github.io/facetype.js/ 这个网站，把刚才下载的文件传上去，就可以得到一个字体的 json 文件了，一共有 27.6 M，千万别因为好奇这个 json 是什么样的而用 IDE 打开，用 cat 简单看看就好了。

### 形状(Geometry)

从外面导入模型 - 书。

### 材质(Material)

贴图。

## 光与影(Light and Shadow)

阴影

## 渲染器(Renderer)

## 动画(Animation)

## 参考

github: https://github.com/mrdoob/three.js/

官方文档: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

郭隆邦技术博客: http://www.yanhuangxueyuan.com/Three.js/

Three.js相关简易文档: https://www.showdoc.cc/143548108162542?page_id=817458605783439

模拟微信跳一跳游戏: https://juejin.im/post/5d9d66e5f265da5b681fe4f5