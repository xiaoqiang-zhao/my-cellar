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

### 与Iterator接口的关系



## Promise 对象

Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

两个特点一个不同：

- 对象的状态不受外界影响。
- 只能从Pending变为Resolved和从Pending变为Rejected。
- 就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。



