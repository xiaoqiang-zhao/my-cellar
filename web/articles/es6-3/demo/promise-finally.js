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

p1().then(function (value) {
    console.log(value);
}).finally(function (value) {
    console.log(value);
});
