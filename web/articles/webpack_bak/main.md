# webpack

> 

.

集成到 node     -------- done

按需加载 done   -------- done，可能出现一个模块被多次打包和被加载多次的情况。如果使用此种方式加载模块，需要划分

别名  done     -------- done

增量发布        -------- done，webpack 不支持

解释一下增量发布：
单页应用的 all in one 打包不存在增量发布问题，增量发布只能被用在按需加载、单页多入口、多页多资源的情况，也就是站点有多个打包后的资源需要按需或顺序加载，并且这些资源互不依赖可以相互独立发布，这样当只有一个资源改变时，客户端不需要更新其他资源从而节省流量和请求时间。

## 参考资料
[code-splitting](http://webpack.github.io/docs/code-splitting.html)