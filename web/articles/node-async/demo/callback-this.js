/**
 * 回调函数 this 指向示例
 */

const value = 'a';

function fn(option) {
    // this 指向调用时的函数挂载点
    option.fn();
    // a
    option.ob.fn();
    // b

    // 若无挂载点指向定义函数时的 this
    const fn = option.ob.fn;
    fn();
}

fn({
    attr: 'a',
    fn() {
        console.log(this.attr);
    },
    ob: {
        attr: 'b',
        fn() {
            console.log(this.attr);
        }
    }
});

function f(cb) {
    cb();
}
const obj = {
    attr: 'c',
    fn() {
        f(function () {
            console.log(this.attr);
            // undefined
        });

        f(() => {
            console.log(this.attr);
            // c
            // 由于闭包
        });

        // 相当于这样
        const _this = this;
        f(function () {
            return function () {
                console.log(_this.attr);
            }
        }());
    }
}

obj.fn();