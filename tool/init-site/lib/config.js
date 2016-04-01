/**
 * 配置文件
 *
 * Created by zhaoxiaoqiang on 15/10/13.
 */

var config = {
    encoding: 'utf-8',

    // 网站的配置
    siteData: {
        title: '龙则的个人站点',
        mainHead: '龙则的个人站点',
        // 戒躁，沉心研究业务与技术 2016.01.11
        // 2016.02.26
        subhead: '精进自己，服务他人'
    },
    templates: [
        {
            // 相对于当前文件夹
            from: 'index-template.html',
            // 相对于 cellar
            to: 'web/index-template.html'
        },
        {
            from: 'article-detail-template.html',
            to: 'web/article-detail-template.html'
        },
        {
            from: 'header.tpl',
            to: 'web/src/components/header/header.tpl',
            // 在文件前面添加一些东西，比如下面的注释
            before: '<!-- 博客头部，如果需要修改此文件，请修改对应的模板文件 tool/init-site/lib/header.tpl  -->\n'
        }
    ]
};

module.exports = config;