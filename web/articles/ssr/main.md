# 服务器端渲染的几点说明和注意

> 服务器端渲染简称 SSR(server side render)，就是在服务器端将数据和 HTML 融合后返回给浏览器，多年前的 JSP 不就是这么做的吗，我们当初为什么抛弃这种模式，现在为什么又重提这种模式，是换个轮胎开倒车吗，还是爱情买卖？当初是你要分开，分开就分开，现在又要用真爱，把我哄回来...

## 概述

技术方案的存在都是为了解决问题，JSP 方案因为一些问题被 SPA 方案代替，SPA 又因为一些问题可能要被 SSR 代替。

从 Java Web 大行其道到 Java Server + SPA 取而代之，经历了一个漫长的过程，伴随的话题有“前后端要不要分离”、“前端的模块化和组件化”等，关于这些话题这里不展开，只引用一句从业互联网开发10年的老兵一句话 -- “JSP 方案前后端耦合太重的问题，不利于前端的组件复用和通信”。SPA 在 RequireJs 、MVVM 框架、前端路由的支撑下顺势登场。下面篇章重点谈谈 SPA 有什么问题，SSR 又是怎么解决的。

如果你想亲手试试，下面是三个模板供选择，任选其一可以用脚手架创建项目：

```shell
vue init nuxt-community/starter-template <project-name>

vue init nuxt-community/koa-template <project-name>
 
vue init nuxt-community/express-template <project-name>
```

## SEO 的问题和方案

“搜索引擎优化” 简称 “SEO（Search Engine Optimization）”，互联网中信息比较分散，让潜在客户快速找到自己是每个公司必然要面对的问题，通过搜索引擎导流是一个非常有效的手段。但是 SPA 站点对搜索引擎非常不友好，因为数据是异步加载的所以搜索引擎抓不到页面数据，在一些不关注搜索引擎的场景下 SPA 方案使用较为广泛，比如企业的后台系统。在尝过了前后端分离的 SPA 方案后，从管理到一线开发被其开发效率的提升和清晰的结构所吸引，那有没有什么方案能够享受前后端分离的优点又兼顾SEO呢？

### SSR 前传

经过一段时间的探索 SSR 方案脱颖而出，这里说的 SSR 是狭义上的 SSR，特只前后台同构无需其他辅助手段的实时渲染，SSR 之前的方案这里简单的提几个：

分离开发发布合并，在淘宝用的比较多，将商品详情页生成为静态文件，这种方案能满足需求，但缺点是需要做一些其他工作，比如价格更新库存更新以及购买人数的更新都需要另外一套代码逻辑来处理。

为搜索引擎和真实用户准备两套呈现逻辑，通过 HTML5 History 实现资源的统一，通过 noscript 分流机器和人，缺点是页面不能有复杂的交互，因为缺少数据和页面事件的处理机制。

### SSR 同构

SSR 采用同构的方法解决了上面问题。我们先说一下 SSR 的具体表现，比如我们现在有一个列表页和详情页，点击列表页中每一行到详情页，那么如果直接用浏览器访问列表页时，服务器返回数据和 html 融合后的页面，浏览器拿到页面直接渲染，这就省去了先请求 js 再由 js 发起数据请求的过程，页面渲染的同时请求js，js加载完成后绑定事件；从列表页中点击某一条到详情页的时候，和 SPA 一样，先请求 js 再由 js 发起数据请求，然后填充数据渲染页面。如果将详情页的链接复制出来，直接在新浏览中访问，那么详情页会直接返回数据和 html 融合后的页面，渲染的同时请求详情页 js，最后再绑定事件。这个“服务器端拼接 html 和 html 是由同样的页面和组件完成的，这种前后端采用同样的结构在不同的环境中产出同样的 html 的方案称之为“同构”。 

Vue 有官方框架 Nuxt 和很多模板来初始化 SSR 项目，React 的 SSR 官方给了接口需要自己来搭建。下面以 Nuxt 为例从两个角度说说同构:

第一个是路由层面，那么路由配置在前端还是后端呢？Nuxt 使用了 page 下的资源路径作为路由，比如下面这样的路径：

```js
└── pages
    ├── users
       ├── index.vue
       └── _id.vue
```

会转换成下面这样的前端路由：

```js
routes: [
    {
      name: 'users',
      path: '/',
      component: 'pages/users/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id',
      component: 'pages/users/_id.vue'
    }
]
```

同时会生成相应的后端路由文件 -- `build/main.js`：

```js
router.get('/users', function (req, res, next) {
    //...
});
router.get('/users/:id', function (req, res, next) {
    //...
});
```

所以需要注意后端的数据接口和页面接口一定不能相同，比较好的办法是给数据接口加统一的前缀(比如 /api 是官方示例给的方案)。

第二个是拼 html 层面，`nuxt.config.js` 代替了原来的 `index.html`，同时 webpack 中的一些配置也移到了这个文件中，然后 layouts 下放全局的导航和版权之类的信息，`<nuxt/>` 作为同构的标识点，nuxt 内部是这样处理的：

```js
// 定义一个 vue 组件
const app = new Vue({
  // 读取数据
  async asyncData () {
    let { data } = await axios.get('/api/users')
    return { users: data }
  },
  // ...
  data: {
    url: req.url
  },
  template: `<div>Hello world.</div>`
});
const renderer = require('vue-server-renderer').createRenderer();
renderer.renderToString(app, (err, html) => {
  // 其中的 html 就是我们页面需要的 html 片段
  // 其中不包含公共部分，将上面的 html 片段放在页面中是由 nuxt 来做的
});
```

在服务端 nuxt 会先执行 asyncData 函数，然后将拿到的数据放入 data 中，最后调用 renderToString 函数输出 html 片段。

## 提速

页面的首屏时间中有 80% 消耗在网络上，也就是如果一个网页的白屏时间是一秒，那么大概 800ms 在网络上，150 毫秒左右在后端读取数据，50 毫秒左右浏览器渲染，要优化后面两项比较困难，优化网络时间是效果最明显的手段，传统的 Ajax 是先请求 js 再由 js 发起数据请求，两项时间加起来再加上渲染时间才是首屏时间，这样的流程首屏时间降到一秒一下是比较困难的，但是如果将两个请求合并为一个那么就有可能办到了，这也是 SSR 受欢迎的重要原因，毕竟首屏时间意味着高到达率，高到达率影响转化量进而和企业收益相关。

上面提到只有首屏用了服务器端渲染，后面的页面还是异步数据渲染逻辑，而异步渲染比同步渲染要慢，那么这是为什么呢，为什么不全部采用服务器端同步渲染？

先分析一下官方给出的示例，直接访问页面采用服务器端渲染白屏时间大约是 500ms，采用异步数据的方式是 244 + 206 = 460 (js加载时间 + 数据加载时间)，异步比同步还要快一点，主要的原因是同步加载是整个页面重新加载，而异步加载是局部刷新。非首屏异步加载还有一个另外的好处，就是主 js 常驻浏览器内存可以实现页面之间的跳转动画，而直接跳页面不可以。

再进一步思考，非首屏页面可不可以更快，能不能从 244 + 206 变为 244？从原理上来说是可以的，切换路由的时候先请求一段 html，还要带上 css，前端将拿到的片段放到页面中。当前 nuxt 还没有实现，这将是一个很复杂的功能，这段逻辑在前后端都要提供公共的支持，还要多级路由的动态响应，页面上有交互的元素需要业务开发人员来做处理，防止看到了不能点的情况出现，这无疑会加大系统开发的复杂度。

## 待改进的点

js 做了分片，但是没有实现按需加载，一个页面出来之后所有页面的 js 都被下载了，看了几个模板都有这个问题，不知道是为什么。这个问题找到了官方给指的一条路，但是没有尝试成功：https://github.com/vuejs/vue-router/issues/326。

## 适用不适用

最后总结一下哪些场景适用哪些场景需要变通。对于首屏而言，如果对 SEO 有强需求，SSR 引入的复杂度对比其他方案是最小的。对于非首屏 SEO 的需求是能满足的，但是如果两个页面没有公共部分或公共部分很少的情况下速度要比多页慢一点，大概 40%，SSR 的一个附带优点是可以做专场动画，所以这一点需要根据业务场景做权衡。

SSR 需要部署 Node 服务器支持，初始化和运维需要这方面的人力投入。

## 你可能遇到的坑

### 启动 ip

在正式部署的时候遇到一个坑，明明部署成功了却访问失败，用 `telnet ip port` 是不通的，但用 `telnet 127.0.0.1 port` 是通的，一番排查过后原因是 express 启动的时候指定ip 有问题，关键代码如下：

```js
// server/index.js
import express from 'express';

const host = process.env.HOST || '127.0.0.1';
const app = express();
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port);
```

那么就有两种方案了，一种是启动的时候带上 HOST 参数，一种是自动获取 HOST，我们采取第二种，引入库 `get-ip`，然后代码改为如下：

```js
// server/index.js
import express from 'express';
import getIp from 'get-ip';

const host = getIp() || '127.0.0.1';
const app = express();
app.listen(port);
console.log('Server listening on ' + host + ':' + port);
```

还有一处需要修改，在 `client/plugin/axios.js`，此文件配置全局数据请求接口的调用和预处理，其中如果在服务端调用需要写全 ip 和端口，所以会有下面这段代码：

```js
// The server-side needs a full url to works
if (process.server) {
    options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 4000}`;
}
```

和上面一样，我们替换 HOST 的获取方式就可以，具体如下：

```js
// The server-side needs a full url to works
if (process.server) {
    const host = getIp() || '127.0.0.1';
    options.baseURL = `http://${host}:${process.env.PORT || 8099}`;
}
```

## 参考

[Nuxt官网](https://zh.nuxtjs.org/guide/async-data)

[nuxt express template](https://github.com/nuxt-community/express-template)

[nuxt koa template](https://github.com/nuxt-community/koa-template)

[美团点评点餐 Nuxt.js 实战](https://juejin.im/post/598aabe96fb9a03c335a8dde)

[React服务器端渲染（SSR）实例](https://blog.csdn.net/shuzipai/article/details/78258936)
