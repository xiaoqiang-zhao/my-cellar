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

Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

两个特点一个不同：

- 对象的状态不受外界影响。
- 只能从Pending变为Resolved和从Pending变为Rejected。
- 就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。



