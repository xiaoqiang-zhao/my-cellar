# NodeJs 异步流程控制

> NodeJs 的核心就是异步流程控制，也是学习和使用 NodeJs 绕不开的坎儿，本文只要介绍异步的三种方法: Callback、Promise、Async/Await

## 概述

NodeJs 的异步控制由 C++ 编写的 libuv 模块提供，libuv 提供两大功能: 事件循环(Event Loop) 和 线程池(Thread Pool)，这俩哥们儿把复杂的事做了(高并发，低延时)，交给用户的只是有点难用的 Callback 写法，好在随着社区的发展我们有了 Promise 和 Async/Await 方案，Callback 也不再那么难写了。也正是坦诚的将异步回调暴露出来，才有更好的流程控制方面的演进。

广义上说 Callback、Promise、Async/Await 这三种方法都是 Callback 的实现形式，为了表述方便本文中的 Callback 指狭义的 Callback，不包含 Promise 和 Async/Await。

这 3 中方法的区别和要点：

- Callback: 在不涉及多个异步操作控制时简单好用，可以和 EventEmitter 配合使用；
- Promise: 众多开源库的接口使用，中流砥柱，必须会；
- Async/Await: 终极解决方案，但 NodeJs 版本需 >=7。

## Callback & EventEmitter

Callback 是用的最多的，是绝大部分的 API 遵守的约定，而 EventEmitter 是辅助机制，通过继承EventEmitter 来解耦业务逻辑。

NodeJs 社区中对 Callback 参数广泛约定为 error-first -- 错误优先的回调机制。但是你需要知道 Callback 不等同于异步，看下面的例子：

```js
// 同步
function fn(cb) {
    // ...
    cb();
    // ...
}

// 异步
function fn(cb) {
    // ...
    setTimeout(() => {
        cb();
    });
    // ...
}

// 在调用时对同步还是异步是无差别的
fn(() => {
    // ...
});
```

error-first 是调用回调函数时，第一个参数是错误信息，后面是其他参数，若无错误通常以 null 作为第一个参数，代码示例：

```js
function fn(cb) {
    try {
        // ...
        cb(null, otherParams);
    }
    catch (err) {
        cb(err);
    }
}
```

在项目中判断文件是否存在是很常见的需求：

```js
const fs = require('fs');
fs.access(__dirname + '/../main.md', err => {
    if (err) {
        // 文件不存在
    }
    else {
        // 文件存在
    }
});
```

从上面示例中可以看出，fs 模块并没有使用 Promise 或 Async/Await，所以用 Callback 形式作为 API 依然是一种使用广泛的形式，直接使用可能会出现回调地狱的问题，虽然还没听说官方在什么时间会升级成为 Promise 或 Async/Await，但我们可以找个马夹，比如 `fs-extra` 这个 npm 包就是极好的，将 fs 的 API 包装成了 Promise。

Callback 函数的作用域和 this 指向是面试中常见的题目，回调函数的作用域是函数定义时的作用域，this 指向调用时的函数挂载点，若无挂载点指向全局。


