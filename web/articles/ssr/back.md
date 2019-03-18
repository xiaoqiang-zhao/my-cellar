## 传播文案

本周六(2018.5.5)晚8点直播，预计1小时

直播平台：虎牙

主播：赵晓强

直播内容：服务器端渲染

简介：
服务器端渲染简称 SSR(server side render)，就是在服务器端将数据和 HTML 融合后返回给浏览器，多年前的 JSP 不就是这么做的吗，我们当初为什么抛弃这种模式，现在为什么又重提这种模式，是换个轮胎开倒车吗，还是爱情买卖？当初是你要分开，分开就分开，现在又要用真爱，把我哄回来...

课程大纲

```file-tree
    ┌── 概述
    ├── SSR 前世 之 方案变迁
    ├── SSR 今生 之 同构提效
    ├── SSR 今生 之 首屏提速
    ├── SSR 今生 之 适用范围
    └── SSR 来世 之 未来走向
```

## axios 的集成方式

使用方式有两种，一种是作为 Vue 的插件来使用，另一种是直接作为包来使用。直接使用更加低耦合。

是有一个点需要注意，服务端获取接口时路径需要写全才能 work：

````js
// The server-side needs a full url to works
if (process.server) {
    options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 4000}`;
}
````
