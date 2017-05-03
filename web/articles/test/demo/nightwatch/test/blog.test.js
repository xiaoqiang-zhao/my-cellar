/**
 * @file 打开百度首页 test/baidu2.js
 *
 * Created by zhaoxiaoqiang on 2017/5/2.
 */
module.exports = {
    'Blog test': function (client) {
        client
            .url('https://longze.github.io/#!/')
            .assert.containsText('.main-title', '龙则的个人站点')
            .end();
    }
};