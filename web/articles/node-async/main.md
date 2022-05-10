# NodeJs 异步流程控制

> NodeJs 的核心就是异步流程控制，也是学习和使用 NodeJs 绕不开的坎儿，本文主要介绍异步的三种方法: callback、promise、async/await。

## 概述

NodeJs 的异步控制由 C++ 编写的 libuv 模块提供，libuv 提供两大功能: 事件循环(Event Loop) 和 线程池(Thread Pool)，这俩哥们儿把复杂的事做了(高并发，低延时)，交给用户的只是有点难用的 callback 写法，好在随着社区的发展我们有了 promise 和 async/await 方案，callback 也不再那么难写了。也正是坦诚的将异步回调暴露出来，才有更好的流程控制方面的演进。

![图](/articles/node-async/img/nodejs-frame-work.jpg)

广义上说 callback、promise、async/await 这三种方法都是 callback 的实现形式，为了表述方便本文中的 callback 指狭义的 callback，不包含 promise 和 async/await。

这 3 中方法的区别和要点：

- callback: 在不涉及多个异步操作控制时简单好用，可以和 EventEmitter 配合使用；
- promise: 众多开源库的接口使用，中流砥柱，必须会；
- async/await: 终极解决方案，但 NodeJs 版本需 >=7。

## callback 和 EventEmitter

### callback

callback 是用的最多的，是绝大部分的 API 遵守的约定，而 EventEmitter 是辅助机制，通过继承EventEmitter 来解耦业务逻辑。

NodeJs 社区中对 callback 参数广泛约定为 error-first -- 错误优先的回调机制。但是你需要知道 callback 不等同于异步，看下面的例子：

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

从上面示例中可以看出，fs 模块并没有使用 promise 或 async/await，所以用 callback 形式作为 API 依然是一种使用广泛的形式，直接使用可能会出现回调地狱的问题，虽然还没听说官方在什么时间会升级成为 promise 或 async/await，但我们可以先找个马夹，比如 `fs-extra` 这个 npm 包就是极好的，将 fs 的 API 包装成了 promise。曾经的回调地狱现在已经有了很好的解决方案，已经不是问题了。

![图](/articles/node-async/img/callback-hell.png)

callback 函数的作用域和 this 指向是面试中常见的题目。回调函数的作用域是函数定义时的作用域。如果直接使用函数，this 指向调用时的函数挂载点，若无挂载点时指向全局。使用箭头函数时 this 是定义函数时环境中的 this，用示例代码来说明一下：

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

## promise

### 概述

promise 是异步编程的一种解决方案。从语法上说，promise 是一个对象，从它可以获取异步操作的消息。promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

promise 其实是一个状态机：

- 对象的状态不受外界影响；
- 只能从 Pending 变为 Resolved 或 Rejected；
- 就算改变已经发生了，你再对 promise 实例添加回调函数，也会立即得到这个结果。

简单示例：

```js
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'params-value');
    });
}

var promise = timeout(100);
promise.then(value => {
    console.log(value);
});
// 控制台输出：params-value
```

上面代码执行后，单独执行下面代码也输出同样的结果：

```js
promise.then(value => {
    console.log(value);
});
// 控制台输出：params-value
```

### .then(resolve, reject)

定义在 promise 原型链上，它的作用是为 promise 实例添加状态改变时的回调函数。可以链式调用，内部可以返回其他 promise 实例，代码示例：

```js
function p1() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve('p1');
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
    return p2(value);
}).then(function (value) {
    console.log(value);
});

// 控制台结果：
// p1
// 第一个 promise 向第二个 promise 传入参数: p1
// p2
```

正是因为 promise 实例状态改变后可以返回另一个 promise，才有效避免了回调地狱，但是也造成了另一个困扰，从逻辑上讲 `resolved/rejected` 状态又回到了 `pedding`，从其他语言转过来的人如果有思维惯性这一点理解起来是比较困难的。

### .catch(callback)

用于指定发生错误时的回调函数，与 then 方法第二个参数 -- reject 回调函数调用逻辑相同。在写 promise 实例生成器时应该捕获生成器本身的错误，resolve 应该交给 resolve 来处理，否则会造成错误难以跟踪的问题。接着上面的代码 catch 方法可以这样使用：

```js
p1().then(value => {
    console.log(value);
    return p2(value);
}).catch(e => {
    // 捕获错误后的处理逻辑...
});
```

### .finally()

指定不管promise对象最后状态如何，都会执行的操作。

### .resolve()

将现有对象转为 promise 对象，resolve 方法的参数分成四种情况：

1、参数是一个 promise 实例，则原封不动的返回

2、如果参数具有 then 方法，转化成 promise 实例，并立即执行 then 方法。

```js
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
```

3、不是具有then方法的对象，或根本就不是对象，则返回一个新的promise对象，状态为Resolved。

```js
    var p = Promise.resolve('Hello');
    
    p.then(function (s){
        console.log(s)
    });
    // Hello
```

4、不带有任何参数，则直接返回一个 Resolved 状态的 promise 对象。

```js
    setTimeout(function () {
        console.log('three');
    }, 0);
    
    Promise.resolve().then(function () {
        console.log('two');
    });
    
    console.log('one');
    
    // one
    // two
    // three
```

需要注意的是，立即 resolve 的 promise 实例，执行回调的时机是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

### .reject()

返回一个新的 promise 实例，该实例的状态为rejected。

```js
    var p = Promise.reject('出错了');
    // 等同于
    var p = new Promise((resolve, reject) => reject('出错了'))
    
    p.then(null, function (s) {
      console.log(s);
    });
    // 出错了
```

### .all([p1, p2, ...])

用于将多个 promise 实例转换成一个新的 promise 实例。参数如果不是 promise 实例，就会先调用 resolve 方法，将参数转为 promise 实例，再进一步处理。

```js
function p1() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve('p1');
        }, 2000);
    });
}

function p2() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve('p2');
        }, 1000);
    });
}

Promise.all([p1(), p2()]).then(values => {
    console.log(values[0] + ',' + values[1]);
});
// 控制台输出结果: p1,p2
```

注意，在执行中只有作为参数的 promise 实例全部转变为 Resolved 状态，返回值才会转变为 Resolved，如果其中一个状态装变为 Rejected ，那么后面的 promise 不会执行，并且直接调用 reject 或 catch。promise 已经对 all 方法做了优化，会同时启动两个参数所对应的状态机，而不会等其中一个有返回值后再执行另外一个。

### .race()

同样是将多个 promise 实例转换成一个新的 promise 实例。

```js
var p = Promise.race([p1, p2, p3]);
```

只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 promise 实例的返回值，就传递给p的回调函数。

## async/await

![图](/articles/node-async/img/async-await.png)

NodeJs 从7.6开始正式支持 async/await 语法，下面我们先结合前两种方案做一个对比。

### 对比三种方案

废弃 Generator 后 async/await 被业界誉为异步的终级解决方案。可以用 async/await 解决的问题都可以被 promise 和 callback 解决，只是 async/await 更加易读更符合人的直观感受。async 函数返回 promise 对象，下面先来对比一下 callback、promise、async 不同方式对同一功能的实现：

```js

const fs = require('fs');
const fsExtra = require('fs-extra');

//## 判断一个文件夹是否存在 ##//

//--- callback 方式 ---//
const path = __dirname + '/node_modules';
fs.access(path, err => {
    if (err) {
        console.log('callback:文件夹不存在');
    }
    else {
        console.log('callback:文件存在');
    }
});

//--- promise 方式 ---//
fsExtra.access(path).then(() => {
    console.log('promise:文件存在');
}, err => {
    console.log('promise:文件夹不存在');
});

//--- async/await 方式 ---//
async function exists() {
    return await fsExtra.access(path);
}
exists().then(() => {
    console.log('async:文件存在');
}, err => {
    console.log('async:文件夹不存在');
});
// 在函数中一般使用 await 关键字
const exists = await exists();
if (exists) {
    console.log('async:文件存在');
}
else {
    console.log('async:文件夹不存在');
}
```

注：nodejs 原生模块 `fs` 后续的版本对 `exists` 方法已经弃用(弃用的原因官方大概是这么个意思：我们当初没想好写了这么个没用的 api，为什么没用呢，因为 nodejs 主打的是高并发，在服务器端一个文件或文件夹可能被多个人操作，当你的代码前脚判断文件夹还存在后脚想往里放文件的时候可能这时文件夹就被别人删掉了，所以拜托你们别再用了。官方推荐用 `stat` 或 `access` 来代替。)，我们这里用 `access` 来代替。

### promise PK async

从上面的例子中可以看到，只有一个异步操作的时候三种方案其实没有明显的优劣，再处理多个异步的时候为了避免 callback 的回调地狱提出了 promise 方案，为了解决 promise 不够直观的问题提出了 async/await 方案。具体来说用 async 来声明一种特殊的函数，这种函数的返回值是 promise 对象，函数中用 await 来提取 promise resolve 回调函数的入参。下面来对比一下 promise 和 async 函数对多个异步的处理：

```js
const fs = require('fs-extra');

/**
 * 判断文件夹 hello 是否存在
 * 如果不存在就新建一个
 * 然后向文件夹中添加一个文件 world
 */

// --- promise 方式 --- //
const promisePath = __dirname + '/promise-hello';
fs.exists(promisePath).then(exists => {
    if (exists) {
        console.log('promise: hello文件夹存在');
    }
    else {
        console.log('promise: hello文件夹不存在，新建一个');
        return fs.mkdir(promisePath);
    }
}).then(() => {
    console.log('promise: 开始新建文件 world.md');
    return fs.createFile(promisePath + '/world.md');
}).catch(err => {
    console.log('promise: 新建文件夹失败');
}).then(() => {
    console.log('promise: 文件 world.md 添加完成');
});

// --- async/await 方式 --- //
const asyncPath = __dirname + '/async-hello';
async function task() {
    if (await fs.exists(asyncPath)) {
        console.log('async: 文件夹 hello 存在');
    }
    else {
        console.log('async: hello 文件夹不存在，新建一个');
        await fs.mkdir(asyncPath);
    }
    console.log('async: 开始新建文件 world.md');
    return await fs.createFile(asyncPath + '/world.md').then(() => {
        console.log('async: 文件 world.md 添加完成');
    });
}
task();
```

注：虽然 nodejs 原生模块 `fs` 弃用了 `exists` 方法，但是第三方 `fs-extra` 模块却做了封装，我们这里直接使用。

为了不相互影响 hello 文件夹分成 promise-hello 和 async-hello 两中情况，通过对比可以看到 promise 需要通过 then 来不断的写回调进去，而 async 函数就不需要，通过 await 关键字可以直接拿到异步执行结果，代码要简洁很多也更加易读。

### 错误处理

看上面 async 部分的代码是不是感觉少点什么，上面提到“用 await 来提取 promise resolve 回调函数的入参”，那 reject 哪里去了，丢了？嗯，是丢了(关于这一点你可以去看 [demo: async-reject.js](https://github.com/xiaoqiang-zhao/my-cellar/blob/master/web/articles/node-async/demo/async-reject.js))，reject 状态返回的是 undefined。不过有两种方式可以找回来，我们再拿上面例子说事，如果你不关心具体哪一步出了问题，可以用一个 `try catch` 来处理：

```js
async function task() {
    try {
        if (await !fs.exists(asyncPath)) {
            await fs.mkdir(asyncPath);
            return await fs.createFile(asyncPath + '/world.md');
        }
    }
    catch (e) {
        console.log('async: 任务失败');
    }
}
```

如果需要关注具体数哪一步出了问题，可以给每个 promise 加上 catch。

### 顺序 VS 并行

async/await 在处理“后面的异步需要等前面的异步返回结果后再执行”这种情况更为顺畅，分支逻辑也更好控制。如果是多个异步并行执行，可以借助 Promise.all 来实现，也可以先执行异步函数并用临时变量存储返回值，然后在每个返回值前添加 await。

```js
// 写法一: Promise.all
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二: 取巧
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

## 宏任务 VS 微任务

微任务: Promise、Process.nextTick
宏任务: setTimeout、setImmediate

先看下面一段代码：

```js
console.log('1');

setTimeout(function() {
  console.log('2');
}, 0);

Promise.resolve().then(function() {
  console.log('3');
}).then(function() {
  console.log('4');
});

console.log('5');
```

执行结果是 `1 5 3 4 2`，我们称 `3 4` 的任务为微任务，`2` 是宏任务。Promise 的引入使事件池中的任务分成了这两种，先判断微任务是否可执行，如果可执行立即执行，再判断宏任务是否可执行。

## 总结

根据场景选择 callback、promise、async/await，技术本身没有优劣，只有合适的才是最好的。

## 扩展和参考

https://zhuanlan.zhihu.com/p/55511602
