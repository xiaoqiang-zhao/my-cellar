# ES6 学习笔记 - Part 3

## Promise 对象

Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

两个特点一个不同：

- 对象的状态不受外界影响。
- 只能从Pending变为Resolved和从Pending变为Rejected。
- 就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。



