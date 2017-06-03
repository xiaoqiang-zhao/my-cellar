# iconfont 使用笔记

> 用自体做图标。

## web 端使用

通过[使用文档](http://iconfont.cn/help/detail?helptype=code)很容易上手，看了三种方式后，"unicode引用"不直观，"symbol引用"使用不方便，最终选择"font-class引用"方式。先看一下 Demo 直观感受一下：

- 远程方式比较简单：[Demo](/articles/iconfont/demo/remote.html)
- 本地方式下载资源到本地: [Demo](/articles/iconfont/demo/local.html)

技术选型和使用时有几个事项需要说明一下：

- 远程资源每次生成新资源链接后，旧有链接依然有效。
- symbol引用支持多色图标，unicode引用 和 font-class引用 不支持。
- unicode引用 和 font-class引用 支持自定义颜色，symbol引用不支持。
- symbol引用 和 其他两种引用可以在一个页面中同时使用，[Demo](/articles/iconfont/demo/remote-symbol.html)。
- 不建议 unicode引用 和 font-class引用 同时使用，因为这两个只是写法不同而已没有本质差别，代码风格统一比较好。

## 参考

[使用文档](http://iconfont.cn/help/detail?helptype=code)