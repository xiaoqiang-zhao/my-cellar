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

### 体(ConeGeometry)

批量加入圆锥体:

![coneGeometry](/articles/threeJs-next-step/img/coneGeometry.gif)

核心代码:

```js
// 半径，高度，分段数
const geometry = new THREE.ConeGeometry(1, 2, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0x4169E1
});
const arr = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, -1]
];
arr.forEach(item => {
    const mesh = new THREE.Mesh(geometry, material);
    let [x, y, z] = item;
    const space = 3;
    x *= space;
    y *= space;
    z *= space;
    mesh.position.set(x, y, z);
    scene.add(mesh);
});
```

上面所有圆锥体都是尖向上的，也就是和 Y 轴正方向同向，下面我们把他们旋转一下，让他们全部底面相对。旋转需要用到 Mesh 实体的 rotateX、rotateY、rotateZ 方法，他们的含义是绕对应的轴方向顺时针旋转，旋转角度采用的是弧度值，360°角=2π弧度，比如我们想让 X 轴上的圆锥底面正对坐标原点，就需要在 Z 轴方向上旋转 -90 度，对应 -0.5π 弧度，调用方法是这样 mesh.rotateZ(Math.PI)。我们向上面的 arr 二维数组中添加旋转信息:

```js
const arr = [
    // X 轴正方向上的圆锥体，绕 Z 轴方向旋转 -90度，也就是 -0.5 弧度
    [1, 0, 0, 'Z', -0.5],
    // Y 轴正方向上的圆锥体，不需要旋转
    [0, 1, 0, 'Y', 0],
    // Z 轴正方向上的圆锥体，绕 X 轴方向旋转 90度，也就是 0.5 弧度
    [0, 0, 1, 'X', 0.5],
    // X 轴负方向上的圆锥体，绕 Z 轴方向旋转 90度， 0.5 弧度
    [-1, 0, 0, 'Z', 0.5],
    // Y 轴负方向上的圆锥体，绕 X 轴方向旋转 180度，也就是 1 弧度
    [0, -1, 0, 'X', 1],
    // Z 轴负方向上的圆锥体，绕 X 轴方向旋转 -90度，也就是 -0.5 弧度
    [0, 0, -1, 'X', -0.5]
];
```

![coneGeometryRotate](/articles/threeJs-next-step/img/coneGeometryRotate.gif)

旋转相关代码:

```js
arr.forEach(item => {
    const mesh = new THREE.Mesh(geometry, material);
    let [x, y, z, axis, roateValue] = item;
    const space = 3;
    x *= space;
    y *= space;
    z *= space;
    mesh.position.set(x, y, z);

    // 光照阴影
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // 旋转
    mesh[`rotate${axis}`](Math.PI * roateValue);

    scene.add(mesh);
});
```

最后附上全量代码: https://github.com/xiaoqiang-zhao/threejs-webpack/blob/master/src/pages/demo-05.vue

### 文字(Text)

three js 中可以用文字做一些标识和引导，不适合用来做大段文字的内容展示。

![text](/articles/threeJs-next-step/img/text.gif)

从官方文档中看到需要一个字体的 json 文件，官方示例中的字体 json 文件只支持英文，我们去找一个中文的。首先需要去下载一个 ttf 的字体文件，比如微软雅黑，微软雅黑不是免费字体，但是作为个人研究是没问题的，我们去站长下载它: [微软雅黑字体下载](http://font.chinaz.com/940144340.htm)。

然后到 http://gero3.github.io/facetype.js/ 这个网站，把刚才下载的文件传上去，就可以得到一个字体的 json 文件了，一共有 27.6 M，千万别因为好奇这个 json 是什么样的而用 IDE 打开，用 cat 简单看看就好了。将字体文件放入项目根目录 `/static/font` 下供下面加载调用。如果你只是想简单试试，那么你可以用本地的英文字体文件，比如 Mac 下用 /System/Library/Font/NewYork.ttf，大小只有 0.3M。

加载字体文件像下面这样，需要注意这里的加载走的是 http 请求，不是文件相对路径:

```js
const loader = new THREE.FontLoader();
loader.load('/static/NewYork.json', font => {
    const geometry = new THREE.TextGeometry('Hello three.js!', {
        font: font,
        size: 1,
        height: 0.1, // 文字厚度
        curveSegments: 12, // 弧线分段数，使得文字的曲线更加光滑
        bevelEnabled: true,
        bevelThickness: 0.1, // 倒角厚度
        bevelSize: 0.1, // 倒角宽度
        bevelSegments: 5 // 弧线分段数，使得文字的曲线更加光滑
    });
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();

    const material = [
        // 内部字体
        new THREE.MeshStandardMaterial({
            color: 0x4169E1
        }),
        // 外部描边
        new THREE.MeshStandardMaterial({
            color: 0xffffff
        })
    ];

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
});
```

## 光与影(Light and Shadow)

上面的例子中很多其实地方已经用到了光与影，这里单独拿出来重点介绍一下。

首先要有光才能有影，添加平行光光源，并且指定该光源会产生投影，这一点很重要，和现实世界的默认设置不同，不指定投影的光源不会产生投影:

```js
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// 指定此光源会产生投影
directionalLight.castShadow = true;
```

有了光源的投影设置，还需要物体的设置配合，物体设置分两个方面:

1. 一个物体产生投影；
2. 另一个物体接受投影。

这两个条件缺一不可:

```js
// 圆柱体
var cylinderGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3, 100);
var cylinder = new THREE.Mesh(cylinderGeometry, material);
// 设置产生投影
cylinder.castShadow = true;

// 创建平面接受阴影投射
var planeGeometry = new THREE.PlaneGeometry(20, 10);
var planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xc4c4c4
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
```

## 用户交互(UserInteraction)

可以随意拖动切换角度的坐标系。实际上不是坐标系在动，而是摄像机在动。

![UserInteraction](/articles/threeJs-next-step/img/UserInteraction.gif)

核心代码:
```js
const Controls = OrbitControls(THREE);
const controls = new Controls(camera, renderer.domElement);

controls.update();
renderer.render(scene, camera);

controls.addEventListener('change', (eve) => {
    renderer.render(scene, camera);
});
```

鼠标移动到图形上高亮显示，响应点击事件。

![hoverAndClick](/articles/threeJs-next-step/img/hoverAndClick.gif)
核心代码:

```js
this.group = new THREE.Group();
scene.add(this.group);

// mesh 为参与识别的网格实体
this.group.add(mesh);

window.addEventListener('mousemove', this.onDocumentMouseMove, false);
onDocumentMouseMove(event) {
    event.preventDefault();
    // 重置为未选中
    if (this.selectedObject) {
        this.selectedObject.material.color.set('#69f');
        this.selectedObject = null;
    }
    
    // 计算当前鼠标点是否落在某个几何体上
    var intersects = this.getIntersects(event.layerX, event.layerY);
    if (intersects.length > 0) {
        var res = intersects.filter(res => {
            return res && res.object;
        })[0];

        // 设置选中的几何体
        if (res && res.object) {
            this.selectedObject = res.object;
            this.selectedObject.material.color.set(0x00FF00);
        }
    }
    this.demoBrenderer.render(this.demoBscene, this.demoBcamera);
},

getIntersects(x, y, camera) {
    x = (x / this.width) * 2 - 1;
    y = -(y / this.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector3();
    mouseVector.set(x, y, 0.5);
    raycaster.setFromCamera(mouseVector, this.demoBcamera);

    return raycaster.intersectObject(this.group, true);
}
```

## 纹理贴图(Texture)

![Texture](/articles/threeJs-next-step/img/Texture.gif)

核心代码:

```js
const geometry = new THREE.CubeGeometry(10, 14, 1);
//添加贴图
const img = new THREE.TextureLoader().load('/static/img/Maria-Montessori.jpg');
const phongMaterial = new THREE.MeshPhongMaterial({
    color: 0x4169E1,
    map: img
});
const materials = [];
const material = new THREE.MeshStandardMaterial({
    color: 0x4169E1
});

for (var i = 1; i < 7; ++i) {
    materials.push(material);
}
// 朝向光源的一面设置照片
materials[4] = phongMaterial;
const box = new THREE.Mesh(geometry, materials);
scene.add(box);
```

贴图加文字渲染特别慢，需要找优化性能的方法。

## 新能优化

## 参考

github: https://github.com/mrdoob/three.js/

官方文档: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

郭隆邦技术博客: http://www.yanhuangxueyuan.com/Three.js/

Three.js相关简易文档: https://www.showdoc.cc/143548108162542?page_id=817458605783439

模拟微信跳一跳游戏: https://juejin.im/post/5d9d66e5f265da5b681fe4f5

十分钟打造 3D 物理世界: https://aotu.io/notes/2018/10/18/cannonjs/index.html
