/**
 * Created by zhaoxiaoqiang on 2017/1/28.
 */

function p1() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('p1');
        }, 2000);
    });
}

function p2() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('p2');
        }, 1000);
    });
}

Promise.all([p1(), p2()]).then(function (values) {
    console.log(values[0] + ',' + values[1]);
}).catch(function () {
    console.log(values[0] + ',' + values[1]);
});

// 控制台输出结果: p1,p2