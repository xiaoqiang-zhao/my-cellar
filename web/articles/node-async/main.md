# NodeJs 异步流程控制

> NodeJs 的核心就是异步流程控制，也是学习和使用 NodeJs 绕不开的坎儿，本文只要介绍异步的三种方法: Callback、Promise、Async/Await

## 概述

NodeJs 的异步控制由 C++ 编写的 libuv 模块提供，libuv 提供两大功能: 事件循环(Event Loop) 和 线程池(Thread Pool)，这俩哥们儿把复杂的事做了(高并发，低延时)，交给用户的只是有点难用的 Callback 写法，好在随着社区的发展我们有了 Promise 和 Async/Await 方案，Callback 也不再那么难写了。也正是坦诚的将异步回调暴露出来，才有更好的流程控制方面的演进。

广义上说 Callback、Promise、Async/Await 这三种方法都是 Callback 的实现形式，为了表述方便本文中的 Callback 指狭义的 Callback，不包含 Promise 和 Async/Await。

这 3 中方法的区别和要点：

- Callback: 在不涉及多个异步操作控制时简单好用，可以和 EventEmitter 配合使用；
- Promise: 众多开源库的接口使用，中流砥柱，必须会；
- Async/Await: 终极解决方案，但 NodeJs 版本需 >=7。

