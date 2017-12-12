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

## 看不懂备忘

很多包没见过：oneapm、colors


