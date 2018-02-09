/**
 * 回调函数作用域示例
 */

const value = 'a';

function fn(cb) {
    const value = 'b';
    cb();
}

fn(() => {
    console.log(value);
});