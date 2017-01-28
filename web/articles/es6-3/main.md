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

简单实例：

    function timeout(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
      });
    }
    
    var promise = timeout(100);
    promise.then((value) => {
      console.log(value);
    });
    // 控制台输出：done

上面代码执行后，单独执行下面代码也输出同样的结果：

    promise.then((value) => {
      console.log(value);
    });
    // 控制台输出：done

### .then(resolve, reject)

定义在 Promise 原型链上，它的作用是为Promise实例添加状态改变时的回调函数。可以链式调用，内部可以返回其他 Promise 实例，代码示例：

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

### .catch(callback)

用于指定发生错误时的回调函数，与 then 方法第二个参数 -- reject 回调函数调用逻辑相同。在写 Promise 实例生成器时应该捕获生成器本身的错误，resolve 应该交给 resolve 来处理，否则会造成错误难以跟踪的问题。接着上面的代码 catch 方法可以这样使用：

    p1().then(function (value) {
        console.log(value);
        return p2(value);
    }).catch(function (e) {
        // 捕获错误后的处理逻辑...
    });

另外 catch 中还可以抛出错误，catch 后面还可以连续使用 catch：

    p1().then(function (value) {
        console.log(value);
        return p2(value);
    }).catch(function (e) {
        // 捕获错误后的处理逻辑...
        throw new Error();
    }).catch(function () {
        // 继续处理上一个 catch 抛出的错误...
    });

### .all([p1, p2, ...])

用于将多个Promise实例，包装成一个新的Promise实例。Promise对象的实例，如果不是，就会先调用 resolve 方法，将参数转为Promise实例，再进一步处理。

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

    var p = Promise.reject('出错了');
    // 等同于
    var p = new Promise((resolve, reject) => reject('出错了'))
    
    p.then(null, function (s) {
      console.log(s)
    });
    // 出错了

### .finally()

指定不管Promise对象最后状态如何，都会执行的操作。



