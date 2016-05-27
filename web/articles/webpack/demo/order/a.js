var text = 'Hello';

document.getElementsByTagName('body')[0].innerHTML = text;

setTimeout(function () {
    // 按需执行
    var b = require('./b');
    console.log(3 + b);
}, 2000);

console.log('1');
module.exports = {
    text: text
};