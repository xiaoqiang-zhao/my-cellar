/**
 * Created by zhaoxiaoqiang on 2017/1/28.
 */

function p1() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            try {
                resolve('p1');
            }
            catch (e) {
                reject('p1 抛出错误');
            }
        }, 2000);
    });
}

function p2(value) {
    console.log('第一个promise向第二个promise传入参数: ' + value);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('p2');
        }, 1000);
    });
}

p1().then(function (value) {
    console.log(value);
    throw new Error();
    return p2(value);
}).then(function (value) {
    console.log(value);
}).catch((e) => {
    console.log('抛出错误:');
    console.log(e);
});
