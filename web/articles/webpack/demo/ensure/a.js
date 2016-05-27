var text = 'Hello';

var a = document.getElementById('app').innerHTML;

if (a === '') {
// 异步加载
    setTimeout(function () {
        // CommonJs
        //require.ensure(['./b'], function (require) {
        //    var m = require('./b');
        //    console.log('3' + m.text);
        //});

        // AMD
        //require.ensure(['./b'], function (b) {
        //    console.log('3' + b.text);
        //});

        //require(['./b'], function (b) {
        //    console.log('3' + b.text);
        //});
        require(['./b']);
    }, 2000);
}
console.log('1');
module.exports = {
    text: text
};