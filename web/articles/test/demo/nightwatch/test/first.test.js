/**
 * @file 打开百度首页 test/baidu2.js
 *
 * Created by zhaoxiaoqiang on 2017/5/2.
 */
module.exports = {
    'Demo test Google' : function (client) {
        client
            .url('http://www.baidu.com')
            .waitForElementVisible('body', 1000)
            .assert.title('百度一下，你就知道 ')
            .assert.visible('input')
            .setValue('input', 'rembrandt van rijn')
            .waitForElementVisible('input[type=submit]', 1000)
            .click('input[type=submit]')
            .pause(1000)
            .assert.containsText('#content_left li:first-child',
            'Rembrandt - Wikipedia')
            .end();
    }
};