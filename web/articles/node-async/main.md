# NodeJs 异步流程控制

> NodeJs 的核心就是异步流程控制，也是学习和使用 NodeJs 绕不开的坎儿，本文只要介绍异步的三种方法: Callback、Promise、Async/Await

## 概述

NodeJs 的异步控制由 C++ 编写的 libuv 模块提供，libuv 提供两大功能: 事件循环(Event Loop) 和 线程池(Thread Pool)，这俩哥们儿把复杂的事做了(高并发，低延时)，交给用户的只是有点难用的 Callback 写法，好在随着社区的发展我们有了 Promise 和 Async/Await 方案，Callback 也不再那么难写了。也正是坦诚的将异步回调暴露出来，才有更好的流程控制方面的演进。

![图](/articles/node-async/img/nodejs-frame-work.jpg)

广义上说 Callback、Promise、Async/Await 这三种方法都是 Callback 的实现形式，为了表述方便本文中的 Callback 指狭义的 Callback，不包含 Promise 和 Async/Await。

这 3 中方法的区别和要点：

- Callback: 在不涉及多个异步操作控制时简单好用，可以和 EventEmitter 配合使用；
- Promise: 众多开源库的接口使用，中流砥柱，必须会；
- Async/Await: 终极解决方案，但 NodeJs 版本需 >=7。

## Callback 和 EventEmitter

### Callback

Callback 是用的最多的，是绝大部分的 API 遵守的约定，而 EventEmitter 是辅助机制，通过继承EventEmitter 来解耦业务逻辑。

NodeJs 社区中对 Callback 参数广泛约定为 error-first -- 错误优先的回调机制。但是你需要知道 Callback 不等同于异步，看下面的例子：

```js
// 同步
function fn(cb) {
    cb();
}

// 异步
function fn(cb) {
    setTimeout(() => {
        cb();
    });
}

// 在调用时对同步还是异步是无差别的
fn(() => {});
```

error-first 是调用回调函数时，第一个参数是错误信息，后面是其他参数，若无错误通常以 null 作为第一个参数，代码示例：

```js
function fn(cb) {
    try {
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

从上面示例中可以看出，fs 模块并没有使用 Promise 或 Async/Await，所以用 Callback 形式作为 API 依然是一种使用广泛的形式，直接使用可能会出现回调地狱的问题，虽然还没听说官方在什么时间会升级成为 Promise 或 Async/Await，但我们可以先找个马夹，比如 `fs-extra` 这个 npm 包就是极好的，将 fs 的 API 包装成了 Promise。曾经的回调地狱现在已经有了很好的解决方案，已经不是问题了。

![图](/articles/node-async/img/callback-hell.png)

Callback 函数的作用域和 this 指向是面试中常见的题目。回调函数的作用域是函数定义时的作用域。如果直接使用函数，this 指向调用时的函数挂载点，若无挂载点时指向全局。使用箭头函数时 this 是定义函数时环境中的 this，用示例代码来说明一下：

```js
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
        });

        // 箭头函数相当于下面这样
        const _this = this;
        f(function () {
            return function () {
                console.log(_this.attr);
            }
        }());
    }
}

obj.fn();
```

### EventEmitter - 事件触发器

![图](/articles/node-async/img/event-emitter.jpeg)

如果你的业务对象需要事件管理，NodeJs 原生提供了一个实现观察者模式的包 `events`:

```js
const util = require('util');
const EventEmitter = require('events');

// 业务对象
const PersionClass = function () {};
util.inherits(PersionClass, EventEmitter);

const baby = new PersionClass();
baby.on('event-name', (a, b) => {
    console.log(a, b);
    // Prints:
    // a b
});

baby.emit('event-name', 'a', 'b');
```

下面介绍这个包的细节，首先是回调函数 this 的指向，如果回调函数是普通函数，那么 this 指向业务对象，如果回调函数是箭头函数，那么 this 指向 定义函数时环境中的 this。

如果对一个事件添加多个监听，那么事件触发式会按添加的顺序一次执行监听指定的回调函数，除此之外还提供了异步机制，如下面的代码示例：

```js
// 省略上面的代码啊...
baby.on('event-name', () => {
    console.log('a');
});
baby.on('event-name', () => {
    setImmediate(() => {
        console.log('c');
      });
});
baby.on('event-name', () => {
    console.log('b');
});

baby.emit('event-name');
// a b c
```

除了使用 `on` 来绑定事件监听还可以使用 `once`，区别在于用 `once` 绑定的监听执行一次后就销毁了。另外还有一个特殊的事件 -- “newListener”，每次通过 `on/once` 来添加时间时都会触发此事件，代码示例：

```js
// 省略上面的代码啊...
baby.on('newListener', (eventName, listener) => {
    console.log(eventName, typeof listener);
});

baby.on('event-name-on', () => {});

baby.on('event-name-once', () => {});
```

有了添加事件监听的方法，那么删除事件监听也是不可少的，那就是 “removeListener”，具体用法以及其他方法比如 “listenerCount”、“prependListener”、“removeAllListeners” 等请到查阅[官方文档](https://nodejs.org/docs/latest-v7.x/api/events.html)。


注：以上对应的 NodeJs 版本是 v7.x。

