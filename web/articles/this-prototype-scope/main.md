# this、prototype、scope

> 学习如何在 js 里正确使用 this 就好比一场成年礼；原型是 js 实现继承等关系的重要基础；scope 则是闭包基础。

## this

## prototype

```js
function A() {
    this.aa = 11;
}
A.prototype = {
    a: 1
};

const a = new A();

for (let key of Object.keys(a)) {
    console.log(key);
}
```

## scope

## 参考

https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/

http://www.henanbuct.com/
