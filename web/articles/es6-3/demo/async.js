/**
 * Created by zhaoxiaoqiang on 2017/1/29.
 */

// 返回 Promise 实例的函数
function p(value) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var date = new Date();
            resolve(value + ':' + date);
        }, 2000);
    });
}

var asyncSetTimeout = async function (){
    var f1 = await p('p1');
    var f2 = await p('p2');
    console.log(f1);
    console.log(f2);
};

asyncSetTimeout();

// 控制台输出结果:
// p1:Sun Jan 29 2017 21:48:16 GMT+0800 (CST)
// p2:Sun Jan 29 2017 21:48:18 GMT+0800 (CST)
