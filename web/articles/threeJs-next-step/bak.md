另一个 3D 引擎 unity: https://store.unity.com/download?ref=personal



## 点

点，一种没有大小和具体形状的几何体，也就没有了面光和背光以及阴影等特性。为此 three js 给了一个概念与之对应 -- 精灵粒子。

先说[精灵](https://threejs.org/docs/#api/zh/objects/Sprite)，一个总是面朝着摄像机的无投影平面。为什么是平面？这是因为如果真的放一个大小为零的东西上去我们也看不到，这里用一块正方体平面来代替点。

与精灵对应的是[精灵材质(SpriteMaterial)](https://threejs.org/docs/#api/zh/materials/SpriteMaterial)

可以实现星光点点，也可以借助贴图实现雪花飞舞。

