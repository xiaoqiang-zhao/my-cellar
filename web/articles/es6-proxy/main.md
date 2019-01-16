# ES6 Proxy

> Proxy 在日常的编码中鲜有用到，但是确实最近大热的 MVVM 原理的一部分，所以单独拿出来说说，为阅读 MVVM 源码做好基础知识准备。Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程，也是进阶大神的必备工具。

## Proxy 重载

```js
const obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});

obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```

上面代码说明，Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。Reflect 存放一些明显属于语言内部的方法。生成 Proxy 实例的标准范式是：

```js
const proxy = new Proxy(target, handler);
```

所有的不同都在 handler 的写法上，注意，要使得 Proxy 起作用，必须针对 Proxy 实例进行操作，而不是针对目标对象进行操作。另外同一个拦截器函数，可以设置拦截多个操作。

```js
const handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

const fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1,2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo // "Hello, foo"
```

下面是 Proxy 支持的13个拦截操作：

- get(target, propKey, receiver)
- set(target, propKey, value, receiver)
- has(target, propKey)，拦截 `propKey in proxy` 的操作，返回一个布尔值。
- deleteProperty(target, propKey)
- ownKeys(target)
- getOwnPropertyDescriptor(target, propKey)
- defineProperty(target, propKey, propDesc)
- preventExtensions(target)
- getPrototypeOf(target)
- isExtensible(target)
- setPrototypeOf(target, proto)
- apply(target, object, args)
- construct(target, args)

## Proxy 覆盖

上面的方式是夹带私货，就是在原有方法的前面执行一些与当前方法返回值无关的操作，如果想执行与当前函数返回值有关，甚至直接改写当前函数返回值逻辑就需要一些技巧。如果 get 代理的是方法，那么返回值应该是函数，下面看一例。

我们知道 Date 的 getMonth 返回月份 (0 ~ 11)。

```js
const target = new Date('2019-01-01');
target.getMonth(); // 输出 0
```

不知道语言当初为何要这样设计，如果我们想修正，让 getMonth 方法返回的月份是 1 ~ 12。

```js
const handler = {
  get(target, prop) {
    if (prop === 'getMonth') {
      // 重点在下面
      return function() {
        return target.getMonth() + 1;
      };
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getMonth();
```

## Proxy 的 this

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。

下面代码中，getDate 方法只能在 Date 对象实例上面拿到，如果 this 不是 Date 对象实例就会报错。

```js
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.
```

这时 this 绑定原始对象，就可以解决这个问题。

```js
const target = new Date('2019-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      // 重点在下面
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```

如果你不了解 Date 内部是怎么处理的，下面例子可以更好的理解这一点：

```js
const _name = new WeakMap();

class Person {
  constructor(name) {
    _name.set(this, name);
  }
  get name() {
    return _name.get(this);
  }
}

const jane = new Person('Jane');
jane.name // 'Jane'

const proxy = new Proxy(jane, {});
proxy.name // undefined
```

也要防止滥用 bind，普通属性是可以直接在 proxy 实例上获取的：

```js
const persion = {
    name: 'xiaoqiang-zhao',
    getName() {
        return this.name;
    }
}
const persionProxy = new Proxy(persion, {});
persionProxy.getName();
persionProxy.name;
```

## Reflect

设计意图：

- 将 Object 对象的一些明显属于语言内部的方法放到 Reflect 对象上。
- 修改某些 Object 方法的返回结果，让其变得更合理。
- 让 Object 操作都变成函数行为。
- 为 Proxy 代理提供方便。

13个静态方法与上面的 Proxy 的静态方法一一对应。
