/**
 * Created by zhaoxiaoqiang on 16/3/28.
 */
require.config({
    baseUrl: '/articles/require-text/demo/',
    paths: {
        'template': 'dep/template-3.0.0.min',
        'text': 'dep/text'
    }
});

require(['text', 'template', 'text!src/test.tpl'], function (text, templateTool, testTemplate) {
    var fn = templateTool.compile(testTemplate);
    var html = fn({name: 'miee'});

    $('body').append(html);
});