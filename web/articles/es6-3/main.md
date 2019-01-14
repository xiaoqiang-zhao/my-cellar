# ES6 学习笔记 - Part 3

## Generator 函数

### 概述

Generator函数是ES6提供的一种异步编程解决方案。Generator函数有多种理解角度。从语法上，首先可以把它理解成，Generator函数是一个状态机，封装了多个内部状态。先来段示例代码：

    function* gen() {
      yield 'hello';
      console.log('somthing');
      yield 'world';
      return 'ending';
    }
    var g = gen();
    
    g.next() // { value: 'hello', done: false }
    g.next() // somthing   { value: 'world', done: false }
    g.next() // { value: 'ending', done: true }
    g.next() // { value: undefined, done: true }

其中 function 后面加星号是 Generator 函数的声明方式，yield 是状态的标识，Generator 函数的返回值是一个遍历器。每次使用 next 方法执行到下一个状态位停止(遇到 yield 就停止执行后面的语句)。yield 不能被用在普通函数中，包括 Generator 函数内部的回调函数和子函数。

### next方法的参数

yield 语句本身没有返回值，或者说总是返回 undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。

    function* f() {
      for(var i = 0; true; i++) {
        var reset = yield i;
        if(reset) { i = -1; }
      }
    }
    
    var g = f();
    
    g.next() // { value: 0, done: false }
    g.next() // { value: 1, done: false }
    g.next(true) // { value: 0, done: false }

这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。

注意，由于next方法的参数表示上一个yield语句的返回值，所以第一次使用next方法时，不能带有参数。V8引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。变通的方法最方便的是在生成函数中传入参数，最彻底的方式是在 Generator 函数外面包一层函数。

### for...of循环

    function *foo() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
      return 6;
    }
    var f = foo()
    for (let v of f) {
      console.log(v);
    }
    // 1 2 3 4 5

这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。
同样的道理可以用在扩展运算符上：

    function* numbers () {
      yield 1
      yield 2
      return 3
      yield 4
    }
    
    // 扩展运算符
    [...numbers()] // [1, 2]

### Generator.prototype.throw()

Generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。

    var g = function* () {
      try {
        yield;
      } catch (e) {
        console.log('内部捕获', e);
      }
    };
    
    var i = g();
    i.next();
    
    try {
      i.throw('a');
      i.throw('b');
    } catch (e) {
      console.log('外部捕获', e);
    }
    // 内部捕获 a
    // 外部捕获 b

错误捕获只执行一次，注意 throw 的参数。另外如果Generator函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。

### Generator.prototype.return()

Generator 函数返回的遍历器对象，还有一个 return 方法，可以返回给定的值，并且终结遍历 Generator 函数，并且改变的只是遍历器的状态，不会执行 Generator 内部的代码。

    function* gen() {
      yield 1;
      console.log('after yield 1');
      yield 2;
      console.log('after yield 2');
      yield 3;
      console.log('after yield 3');
    }
    
    var g = gen();
    
    g.next()        // { value: 1, done: false }
    g.return('foo') // { value: "foo", done: true }
    
### yield* 语句

使 Generator 函数可嵌套：

    function *foo() {
      yield 2;
      yield 3;
      return "foo";
    }
    
    function *bar() {
      yield 1;
      var v = yield *foo();
      console.log( "v: " + v );
      yield 4;
    }
    
    var it = bar();
    
    it.next()
    // {value: 1, done: false}
    it.next()
    // {value: 2, done: false}

## Promise 对象

### 概述

Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

两个特点一个不同：

- 对象的状态不受外界影响。
- 只能从Pending变为Resolved和从Pending变为Rejected。
- 就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。

简单示例：

    function timeout(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
      });
    }
    
    var promise = timeout(100);
    promise.then(value => {
      console.log(value);
    });
    // 控制台输出：done

上面代码执行后，单独执行下面代码也输出同样的结果：

    promise.then(value => {
      console.log(value);
    });
    // 控制台输出：done

### .then(resolve, reject)

定义在 Promise 原型链上，它的作用是为Promise实例添加状态改变时的回调函数。可以链式调用，内部可以返回其他 Promise 实例，代码示例：

```js
    function p1() {
        return new Promise(function (resolve, reject) {
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
    // 第一个promise向第二个promise传入参数: p1
    // p2
```

### .catch(callback)

用于指定发生错误时的回调函数，与 then 方法第二个参数 -- reject 回调函数调用逻辑相同。在写 Promise 实例生成器时应该捕获生成器本身的错误，resolve 应该交给 resolve 来处理，否则会造成错误难以跟踪的问题。接着上面的代码 catch 方法可以这样使用：

```js
    p1().then(function (value) {
        console.log(value);
        return p2(value);
    }).catch(function (e) {
        // 捕获错误后的处理逻辑...
    });
```

另外 catch 中还可以抛出错误，catch 后面还可以连续使用 catch：

```js
    p1().then(function (value) {
        console.log(value);
        return p2(value);
    }).catch(function (e) {
        // 捕获错误后的处理逻辑...
        throw new Error();
    }).catch(function () {
        // 继续处理上一个 catch 抛出的错误...
    });
```

### .all([p1, p2, ...])

用于将多个Promise实例，包装成一个新的Promise实例。Promise对象的实例，如果不是，就会先调用 resolve 方法，将参数转为Promise实例，再进一步处理。

```js
    function p1() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve('p1');
            }, 2000);
        });
    }
    
    function p2() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve('p2');
            }, 1000);
        });
    }
    
    Promise.all([p1(), p2()]).then(function (values) {
       console.log(values[0] + ',' + values[1]);
    });
    
    // 控制台输出结果: p1,p2
```

注意，只有作为参数的 Promise 实例全部转变为 Resolved 状态，返回值才会转变为 Resolved，如果其中一个状态装变为 Rejected ，那么后面的 promise 不会执行，并且直接调用 reject 或 catch。

### .race()

同样是将多个Promise实例，包装成一个新的Promise实例。

    var p = Promise.race([p1, p2, p3]);

只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

### .resolve()

将现有对象转为Promise对象，resolve 方法的参数分成四种情况：

1、参数是一个Promise实例，则原封不动的返回

2、如果参数具有 then 方法，转化成 Promise 实例，并立即执行 then 方法。

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

3、不是具有then方法的对象，或根本就不是对象，则返回一个新的Promise对象，状态为Resolved。

    var p = Promise.resolve('Hello');
    
    p.then(function (s){
      console.log(s)
    });
    // Hello

4、不带有任何参数，则直接返回一个 Resolved 状态的 Promise 对象。

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

需要注意的是，立即resolve的Promise对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

### .reject()

返回一个新的 Promise 实例，该实例的状态为rejected。

```js
    var p = Promise.reject('出错了');
    // 等同于
    var p = new Promise((resolve, reject) => reject('出错了'))
    
    p.then(null, function (s) {
      console.log(s)
    });
    // 出错了
```

### .finally()

指定不管Promise对象最后状态如何，都会执行的操作。

## 异步操作和 Async 函数

Generator 和 Promise 处理异步还是不够直观，借助一些辅助函数可以方便一点，这里略去这些辅助函数的原理和用法，直接进入 ES2017 标准提供的 Async 函数的使用方法。

```js
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
```

使用 async 和 await 处理多个异步请求避免回调地狱要自然的多，另外返回的是一个 Promise 实例。

## Class

需要补充 ES5 中的相关知识

## Module

JS需要一个模块管理器来支持大型复杂的项目，于是有了模块规范，当前浏览器还不支持，但是我们可以通过一些辅助库来管理模块。

注意：ES6 的模块自动采用严格模式。

一个思想先说明：ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

### 经典用法

经典用法一：模块功能单一，只输出一个函数或一个常量，使用 default 关键字

一个常量：

    // 声明一个模块 a.js，并提供对外引用
    var str = 'string';
    export default str;
    
    // 可以向下面这样引用
    import a from './a';  // a 的值就是 "string"
    
一个函数：
    
    // 声明一个模块 a.js，并提供对外引用
    function fun () {
        // do something
        console.log('function fun in module a');
    }
    
    // 可以向下面这样引用
    import a from './a';  // a 的值就是 fun 函数
    a();  // 控制台输出 "function fun in module a"

个人推荐定义和对外引用分离书写，这样显得逻辑更清晰，像上面示例代码那样，但是在语法上还可以何在一起书写，代码更简洁，像下面这样(引用方式不变，这里代码略去):

    // 对外引用字符串
    export default 'string';
    // 对外引用对象
    export default {
        attr: 'Attribution'
    };
    // 对外引用函数
    export default function () {
        console.log('function fun in module a');
    };
    
经典用法二：一个模块对外输出多个引用

分离写法：

    // 声明一个模块 a.js，并提供对外引用
    var str = 'string';
    function fun () {
        console.log('function fun in module a');
    }
    export {str, fun};
    
    // 可以向下面这样引用
    import {str, fun} from './a';
    console.log(str);   // "string"
    fun();              // "function fun in module a"

简略写法：

    // 声明一个模块 a.js，并提供对外引用
    export var str = 'string';
    export function fun () {
        console.log('function fun in module a');
    }
    export let object = {
        // ...
    };

补充说明一下，对外引用 `export default` 与普通 `export` 可以同时使用：

    var str = 'string';
    function fun () {
        console.log('function fun in module a');
    }
    export {str, fun};
    export default {str, fun};

引用时可以单独只使用 default 的对外输出：

    import a from './a';
    a.fun();      // "function fun in module a"

也可以像下面这样混合使用。

    import {default as a, str, fun, object} from './a';
    console.log(a.fun === fun);   // true

你还可能遇到一种情况，如果两个模块都有 fun 方法怎么办？这里提供两个解决方案：

使用 as 关键字指定别名，可以这样写：

    import {fun as moduleAFun} from './a';
    moduleAFun();
    
将模块 a 直接整体使用，可以这样写：

    import * as a from './a';
    a.fun();

### export 与 import 的复合写法

示例：

    export { foo, bar } from 'my_module';
    
    // 等同于
    import { foo, bar } from 'my_module';
    export { foo, bar };
    
    // 整体输出
    export * from 'my_module';

整体输出可以用于模块之间的继承，如果需要改变名称可以参考下面示例：

    export { area as circleArea } from 'circle';

### ES6模块加载的实质

ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。

先看一个例子，index.js 中引用两个模块 a.js 和 b.js，并且分别调用两个模块的 log 方法：

    // index.js
    import a from './a';
    import b from './b';
    
    a.log();
    b.log();
    
a.js，该模块与 b.js 都引用了 x.js 模块，在该模块中先输出 x.js 模块的 str 属性，然后调用 x.js 模块下的 object.changeStr 方法改变 x.js 模块中的内部变量并输出：

    import {object, str} from './x';
    
    function log () {
        console.log('1、' + str);
        console.log('2、change str in module a:' + object.changeStr());
    };
    
    export default {log};
    
b.js，同样引用 x.js 模块，但是模块中只有一个 log 方法对外调用，log 方法的作用就是输出 x.js 模块的 str 属性：

    import {object, str} from './x'
    
    function log () {
        console.log('3、' + str);
    };
    
    export default {log};

x.js，该模块中 object.changeStr 方法改变内部变量 str，具体的说就是添加字符串 "++"： 

    var str = 'String';
    var object = {
        attr: 'Attribution',
        changeStr: function () {
            str += '++';
            return str;
        }
    };
    
    export {object, str};

最后控制台输出的结果是：

    1、String
    2、change str in module a:String++
    3、String++

可以看到当 a.js 模块通过调用 x.js 的方法改变了 x.js 模块的内部变量会引起 b.js 中 x.js 模块的字符串属性的改变，这就是 ES6 模块管理的值引用。

### Node 的加载处理

Node 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。
 
 在静态分析阶段，一个模块脚本只要有一行import或export语句，Node 就会认为该脚本为 ES6 模块，否则就为 CommonJS 模块。如果不输出任何接口，但是希望被 Node 认为是 ES6 模块，可以在脚本中加一行语句。

如何不指定绝对路径，Node 加载 ES6 模块会依次寻找以下脚本：

```js
import './foo';
// 依次寻找
//   ./foo.js
//   ./foo/package.json
//   ./foo/index.js
```

### import 命令加载 CommonJS 模块

Node 采用 CommonJS 模块格式，模块的输出都定义在module.exports这个属性上面。在 Node 环境中，使用import命令加载 CommonJS 模块，Node 会自动将module.exports属性，当作模块的默认输出，即等同于export default。示例：

```js
// a.js
module.exports = {
    foo: 'hello',
    bar: 'world'
};

// 等同于
export default {
    foo: 'hello',
    bar: 'world'
};
```

CommonJS 模块的输出缓存机制，在 ES6 加载方式下依然有效。

```js
module.exports = 123;
setTimeout(_ => module.exports = null);
```

上面代码中，对于加载上面脚本，module.exports 将一直是 123，而不会变成 null。

### require 命令加载 ES6 模块

采用require命令加载 ES6 模块时，ES6 模块的所有输出接口，会成为输入对象的属性。

```js
// es.js
let foo = {bar:'my-default'};
export default foo;
foo = null;

// cjs.js
const es_namespace = require('./es');
console.log(es_namespace.default);
// {bar:'my-default'}
```
