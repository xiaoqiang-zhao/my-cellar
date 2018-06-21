# 素材备忘

在做 Vue SSR 项目时参考了此项目，有很重要的一点不同，对于前SSR 的 NodeJs 项目是需要定义页面路由的：

````js
// web_router.js 中
var topic = require('./controllers/topic');
// 新建文章界面
router.get('/topic/create', topic.create);

// controllers/topic.js 中
exports.create = function (req, res, next) {
  res.render('topic/edit', {
    tabs: config.tabs
  });
};
````

但是在 SSR 项目中页面路由是框架直接生成的，只需要定义 API 路由，所以就放弃了 contraller 这一层。
