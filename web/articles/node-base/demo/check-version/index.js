/**
 * @file Demo 入口
 */
const checkVersion = require('./check-version');

checkVersion(() => {
    console.log('版本验证通过');
});
