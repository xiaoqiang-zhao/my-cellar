/**
 * promise all 方法使用示例
 */

 function p1() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(['p1', new Date().getSeconds()]);
        }, 2000);
    });
}

function p2() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(['p2', new Date().getSeconds()]);
        }, 1000);
    });
}

console.log(new Date().getSeconds());
Promise.all([p1(), p2()]).then(values => {
    console.log(values[0] + ',' + values[1]);
});
