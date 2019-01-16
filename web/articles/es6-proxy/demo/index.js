/**
 * @file proxy this 示例
 */

// 我们知道 Date 的 getMonth 返回月份 (0 ~ 11)
const target = new Date('2019-01-01');
target.getMonth(); // 输出 0

// 不知道语言当初为何要这样设计，如果我们想修正，让 getMonth 方法返回的月份是 1 ~ 12
const handler = {
    get(target, prop) {
        if (prop === 'getMonth') {
            // 重点在下面
            return target.getMonth() + 1;
        }
        return Reflect.get(target, prop);
    }
};
const proxy = new Proxy(target, handler);

proxy.getMonth();

// 你会发现上面的实现是有问题的，会报一个错误：proxy.getMonth is not a function

// 升级 this 指向
const handler2 = {
    get(target, prop) {
        if (prop === 'getMonth') {
            // 重点在下面
            return target.getMonth.bind(target);
        }
        return Reflect.get(target, prop);
    }
};
const proxy2 = new Proxy(target, handler2);

proxy2.getMonth();

const handler3 = {
    get(target, prop) {
        if (prop === 'getMonth') {
            // 重点在下面
            return function() {
                return target.getMonth() + 1;
            };
        }
        return Reflect.get(target, prop);
    }
};
const proxy3 = new Proxy(target, handler3);

proxy3.getMonth();