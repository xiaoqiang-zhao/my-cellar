# this、prototype、scope

> 学习如何在 js 里正确使用 this 就好比一场成年礼；原型是 js 实现继承等关系的重要基础；scope 则是闭包基础。

## this

对象中的方法：

```js
const obj = {
    a: {
        fn(){
            // this
        }
    },
    fn() {
        // this
    }
}

obj.a.fn(); // this 指向 a
obj.fn();   // this 指向 obj

const f = obj.a.fn;
f() // this 指向 window, 严格模式下为 undefined
```

构造函数中的 this: 

```js
function Obj(name) {
    this.name = name;
}
```

箭头函数中的 this，两个 this 都指向定义 obj 环境中的 this:

```js
const obj = {
    a: {
        fn: () => {
            // this
        }
    },
    fn: () => {
        // this
    }
}
```

改变 this 指向可以用 call/apply/bind。

call 和 apple 都是在调用的时候改变 this 指向，区别在于参数的传入形似不同。
```js
const obj = {
    fn(param) {
        // this
        console.log(this.name, param);
    }
}
obj.fn.call({
    name: 'xiaoqiang-zhao'
}, '111');
obj.fn.apply({
    name: 'xiaoqiang-zhao'
}, ['111']);
```

bind 的不同是可以永久改变 this 指向:

```js
const obj = {
    fn(param) {
        // this
        console.log(this.name, param);
    }
}

obj.fn.bind({
    name: 'xiaoqiang-zhao'
})('333');
// 输出: xiaoqiang-zhao 333

obj.fn('444');
// 输出 undefined 444

const f = obj.fn.bind({
    name: 'xiaoqiang-zhao'
});
f('555');
// 输出 xiaoqiang-zhao 555
```

## prototype

原型上的方法在 for of 中不会被遍历出来:

```js
function A() {
    this.aa = 11;
}
A.prototype = {
    a: 1
};

const a = new A();

for (let key of Object.keys(a)) {
    console.log(key);
}
// 输出: aa

// for in 会遍历出更多
for (let key in a) {
    console.log(key);
}
// 输出: aa a
```

## scope

## 参考

https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/

http://www.henanbuct.com/
