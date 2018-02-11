/**
 * Async/Await 示例
 */

function p(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var date = new Date();
            // resolve(value + ':' + date);
            reject(value + ':' + date);
        }, 2000);
    });
}

var asyncSetTimeout = async function (){
    var f1 = await p('p1');
    var f2 = await p('p2');
    console.log(f1);
    console.log(f2);
};

asyncSetTimeout().catch((err) => {
    console.log('reject', err);
});
