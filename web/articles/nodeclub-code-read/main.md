# 读 Nodeclub 源码

> 一直想找一个全栈的项目学习一下，最好是已经上线还有好多人在用，而不是某些人写的作业或培训班的 Demo。经过几番挣扎终于找到了一个这样的项目 -- https://github.com/cnodejs/nodeclub。它是 [Node.js 中文论坛](https://cnodejs.org/)的源码，论坛每天都有人更新内容，代码基本稳定但还有小的更新，start 6k+，fork 2k+，1.9k+ 的 commits 从 2012.2.15 到今天历时 5 年多，用的技术也比较全面：EJS、Express、PM2、MongoDB、Redis，除了前端部分比较落后之外这个项目堪称全栈模范开源项目，所以我决定解读这个开源项目的源码，提升自己的编码水平。

## 概述

项目线上地址：https://cnodejs.org/

开源代码 Github 地址：https://github.com/cnodejs/nodeclub

## 启动

首先需要把 config.default.js 文件复制一份出来，并更名为 config.js，里面的东西很好懂，什么都不改也没关系。然后就是把 MongoDB 和 Redis 数据库启动起来，只要启动起来就好了其他的不需要做。然后把 npm 依赖装好，最后项目就可以启动了：

    node app.js

先注册个用户，然后随便点点，发布个话题看看内容。需要注意的是注册用户后需要激活才能登录，为用户发送邮件需要在 config.js 中修改邮箱服务器的配置，也可以跳过这一步注册用户后直接修改数据库中 users collection 的 active 字段

## 看代码

然后从入口开始抓主干往下看，第一个关键点：

    require('./models');

MongoDB 的连接和 Schema 定义都在这个模块下，具体内容不展开，接着往下看，第二一个关键点：

    var webRouter = require('./web_router');

页面的路由和接口路由的定义都在这里，有些入口作为普通用户是看不到的，比如这个：

    // 把某用户设为达人
    router.post('/user/set_star', auth.adminRequired, user.toggleStar);

那么问题来了怎么成为管理员呢，接着看源码发现用 config.js 里面配置的 admin 用户名注册用户就成为了管理员，管理员可以是多个。然后在 `/user/:username` 页中就能看到 “设为达人” 的按钮了。

大概的流程就这么多，剩下的就是技术点了，下面挑几个说说。

## 数据存储和获取的流程是什么？

这是一个入门级的问题，下面我们看看这个项目是怎么处理的。

第一步是入口，上面说了是 app.js，然后数据库的连接和 Schema 定义都在 models 文件夹中，models 文件夹中的 index.js 负责连接数据库，引入项目需要的 5 个 collection，每个文件定义一个 collection，包括 Schema、索引和自定义函数。

然后是在 web_router.js 文件中定义接口，比如“更新话题内容”这个接口的实现就放在 `topic.update` 方法下面。

    router.post('/topic/:tid/edit', auth.userRequired, topic.update);

然后不难发现 `topic.update` 方法的实现在 controllers/topic.js 文件中，然后一层层追进去，大概的代码逻辑是这样(下面是伪代码，只展现逻辑，省略参数等)：

```javascript
var models = require('../models');
var Topic = models.Topic;
exports.update = function (req, res, next) {
    Topic.findOne(function (topic) {
        topic.title = req.body.title;
        topic.save();
    });
}
```

这其中会涉及到很多个文件，我把代码抽象到一起方便理解。下面拆解开看看怎么分层的：

```javascript
// 1. controllers 层，定义方法，外露给 router 层直接调用
//    controllers/topic.js
exports.update = function (req, res, next) {
    
    // 1.1. 然后接收前端传过来的数据
    var topic_id = req.params.tid;
    var title = req.body.title;
    // 1.2. 并校验数据有效性
    var editError;
    if (title === '') {
        editError = '标题不能是空的。';
    }
    // 1.3. 还有将数据配装成对象，都在这一层完成
    
    // 1.4. 和数据库的交互由 proxy 层来定义
    var Topic = require('../proxy').Topic;

    // 3. 然后调用 proxy 返回的方法实现保存数据
    //    保存完数据完成页面的重定向和内容返回
    Topic.getTopicById(topic_id, function (err, topic, tags) {
        topic.title = title;
        topic.save(function (err) {
            res.redirect('/topic/' + topic._id);
        });
    }
}
// 2. proxy 层来定义数据交互 
//    proxy/topic.js
// 2.1 首先拿到 model 定义
var models = require('../models');
var Topic = models.Topic;
var User = require('./user');
// 2.2 然后用了一个库 -- eventproxy，来实现多个 model 的组合
//     这可能也是这一层叫 proxy 的原因
var EventProxy = require('eventproxy');
// 2.3 比如先查话题再查话题所属的用户，然后组合成
var proxy = new EventProxy();
var events = ['topic', 'author', 'last_reply'];
proxy.assign(events, function (topic, author) {
    if (!author) {
        return callback(null, null, null);
    }
    return callback(null, topic, author);
}).fail(callback);

Topic.findOne({_id: id}, proxy.done(function (topic) {
    if (!topic) {
        proxy.emit('topic', null);
        proxy.emit('author', null);
        return;
    }
    proxy.emit('topic', topic);

    User.getUserById(topic.author_id, proxy.done('author'));
}));
```

最后还有两个彩蛋，一个是 MongoDB 的自定义函数：

```js
// models/base_model.js
var tools = require('../common/tools');

module.exports = function (schema) {
  schema.methods.create_at_ago = function () {
    return tools.formatDate(this.create_at, true);
  };

  schema.methods.update_at_ago = function () {
    return tools.formatDate(this.update_at, true);
  };
};
```

另一个是日志，只有在 debug 状态才会开启日志：

```js
// app.js 是入口
require('./middlewares/mongoose_log');
// middlewares/mongoose_log.js 开启日志
var logger = require('../common/logger');
if (config.debug) {
    // ...
}
// common/logger.js 用 log4js 写入文件
// 默认日志文件地址 logs/cheese.log
var log4js = require('log4js');
```

## Session

HTTP 是无状态，但我们的很多请求是需要有状态的，比如有些操作是需要用户登录的(比如登录和发布内容操作是不同的请求)，为了解决这一问题业界广泛使用的解决方案就是 Session。简单的说就是在 cookie 中放一个唯一标识，然后每次请求的时候都带着这个标识，具体数据存储在服务器上，通过这个唯一数据来获取。一般的后台语言如 Java 和 PHP 都提供 Session 功能，数据存放在内存和文件中。但是如果要构建大型应用，一台服务器不能满足 Session 对性能的需求时就会引入其他技术，cnode 的 Session 存储用的是 Redis。Redis 作为键值存储数据库，又能低成本实现分布式，作为 Session 的存储方案是很不错的，下面看看具体的实现。

首先需要一个中间件，

```js
// app.js
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();
app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host,
    db: config.redis_db,
    pass: config.redis_password,
  }),
  resave: false,
  saveUninitialized: false,
}));
```


Redis 

## 看不懂备忘

很多包没见过：oneapm、colors

## 包积累

`eventproxy`，朴灵(田永强)开发的模块，解决回调地狱。

`log4js` 打印文件日志。

`express-session` express session 中间件，可以配合 mongoDB 或 Redis 来做。


## 扩展阅读

[node相比传统服务端技术栈差在哪里？](https://www.zhihu.com/question/263715023/answer/275984629)

其他开源项目：

[知名 node.js CMS](https://github.com/keystonejs/keystone)，2013.7.2开始，11k+ star，1.8k+ fork。

[极客公园 后台管理系统](https://github.com/ericjjj/vms)，2017.4.12开始，700+ star，100+ fork。

[Session 扩展阅读 - 百度百科](https://baike.baidu.com/item/Session/479100)

[Session 扩展阅读 - 某博客](http://blog.csdn.net/think2me/article/details/38726429)