/**
 * @file Demo 入口
 */
import checkVersion from './check-version.mjs';

checkVersion(() => {
    console.log('版本验证通过');
});
