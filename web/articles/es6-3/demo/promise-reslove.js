/**
 * Created by zhaoxiaoqiang on 2017/1/28.
 */

var thenable = {
    then: function (resolve, reject) {
        setTimeout(function () {
            resolve('p1');
        }, 2000);
    }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value);
});

// 控制台输出结果: p1