# 移动端调试

> 移动开发需要的基础技能。

## 模拟器调试

使用 PC 浏览器的手机模式可以运行调试移动页面，方案简单调试流畅，缺点是无法定位真机上的 bug。

## 真机调试

### Safari(Mac) + iOS

手机设置: 设置/Safari/高级/Web检查器。

Mac设置: Safari/偏好设置(Preferences...)/高级选项(Advanced)/在工具栏显示开发者工具(Show Develop menu in menu bar)。

调试过程: 不需要手机和电脑在同一局域网，通过数据线链接电脑和手机，在手机上用 Safari 打开需要调试的页面，在电脑上同样打开 Safari，打开后可以在 Safari 的工具条上看到 Develop 项，找到子项中的手机名，然后就可以看到手机上打开网页的地址，点击进入就可以打开调试器。

如果 Mac 上的 Safari 上找不到手机和页面地址，可以尝试刷新一下手机上的页面。

### Chrome + Android

暂无 Android 手机，稍后补充内容...

### Charles

套壳后尝试调试 App 中内嵌的 H5 页面...

## 参考

[真机调试的各种姿势](https://juejin.im/entry/58e62a5e44d904006d33c73d)

[移动端调试痛点？送你五款前端开发利器！](https://feedly.com/i/entry/6aE8zP/78ajEFAGWFq9KV9CiFzoMZ/eVNPrGuKQm5Sg=_1654b818b70:7928e74:4db7ac35)

