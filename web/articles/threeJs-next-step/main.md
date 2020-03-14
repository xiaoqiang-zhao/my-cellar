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

## 物体(Object)

平面和线。

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

官网: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

郭隆邦技术博客: http://www.yanhuangxueyuan.com/Three.js/
