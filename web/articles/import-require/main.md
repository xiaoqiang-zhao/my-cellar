# import 与 require

> ES6 已经逐渐普及了，Node 9.0 开始原生支持 import，浏览器端在 webpack 的帮助下也可以无障碍使用 import 了。在这个过渡的时期你可能需要了解一些他们的不同，ES6 是 2015 年发布，到现在的 2019 年已经 4 年过去了 require 的一些坑已经不需要了解了，重点可以放在 import 的特性上。

## import 经典用法

经典用法一：模块功能单一，只输出一个函数或一个常量，使用 default 关键字

一个常量：

```js
// 声明一个模块 a.js，并提供对外引用
var str = 'string';
export default str;

// 可以向下面这样引用
import a from './a';  // a 的值就是 "string"
```

经典用法二：一个模块对外输出多个引用

```js
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
```

经典用法三：一个模块对外输出一个功能集合


```js
// 声明一个模块 a.js，并提供对外引用
var str = 'string';
function fun () {
    console.log('function fun in module a');
}
export default {str, fun};

// 可以向下面这样引用
import a from './a';
console.log(a.str);   // "string"
a.fun();              // "function fun in module a"
```

## ES6模块加载的实质

ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。

先看一个例子，index.js 中引用两个模块 a.js 和 b.js，并且分别调用两个模块的 log 方法：

```js
// index.js
import a from './a';
import b from './b';

a.log();
b.log();
```

a.js，该模块与 b.js 都引用了 x.js 模块，在该模块中先输出 x.js 模块的 str 属性，然后调用 x.js 模块下的 object.changeStr 方法改变 x.js 模块中的内部变量并输出：

```js
import {object, str} from './x';

function log () {
    console.log('1、' + str);
    console.log('2、change str in module a:' + object.changeStr());
};

export default {log};
```

b.js，同样引用 x.js 模块，但是模块中只有一个 log 方法对外调用，log 方法的作用就是输出 x.js 模块的 str 属性：

```js
import {object, str} from './x'

function log () {
    console.log('3、' + str);
};

export default {log};
```

x.js，该模块中 object.changeStr 方法改变内部变量 str，具体的说就是添加字符串 "++"： 

```js
var str = 'String';
var object = {
    attr: 'Attribution',
    changeStr: function () {
                A                   a           Z           AFG+= '++';
        return str;
    }
};

export {object, str};
```

最后控制台输出的结果是：

```js
1、String
2、change str in module a:String++
3、String++
```

可以看到当 a.js 模块通过调用 x.js 的方法改变了 x.js 模块的内部变量会引起 b.js 中 x.js 模块的字符串属性的改变，这就是 ES6 模块管理的值引用。

## Node 的加载处理

Node 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。
 
在静态分析阶段，一个模块脚本只要有一行 import 或 export 语句，Node 就会认为该脚本为 ES6 模块，否则就为 CommonJS 模块。如果不输出任何接口，但是希望被 Node 认为是 ES6 模块，可以在脚本中加一行语句。

如何不指定绝对路径，Node 加载 ES6 模块会依次寻找以下脚本：

```js
import './foo';
// 依次寻找
//   ./foo.js
//   ./foo/package.json
//   ./foo/index.js
```
## import 命令加载 CommonJS 模块

Node 采用 CommonJS 模块格式，模块的输出都定义在 module.exports 这个属性上面。在 Node 环境中，使用import命令加载 CommonJS 模块，Node 会自动将module.exports 属性，当作模块的默认输出，即等同于 export default。示例：

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
setTimeout(() => module.exports = null);
```

上面代码中，module.exports 将一直是 123，而不会变成 null。

## require 命令加载 ES6 模块

采用 require 命令加载 ES6 模块时，ES6 模块的所有输出接口，会成为输入对象的属性。

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

## 按需加载 PK 预加载

按须加载就是在用户触发引入某模块的时候加载此模块的资源(包括代码和图片等)，预加载就是在不影响当前模块渲染的同时提前加载其他模块，当打开其他模块的时候就可以直接使用预加载的资源。

当页面非常多的时候，预加载可能需要很长时间，给浏览器带来的计算量也会增加。个人觉得按需加载有更广阔的适应场景，预加载属于剑走偏锋，在特定场景下比预加载效果好(比如年终的支付宝账单统计H5页，网易云音乐听歌统计H5页)。三大 MVVM 的纯前端 SPA 脚手架默认提供的都是按需加载方案，Vue 的 SSR 方案 Nuxt 加载策略默认是预加载，从中可以看出预加载预加载正式成为一种需要被思考的方案。

在底层上，按需加载用的是 webpack 的 thunk 特性：

```js
console.log("this is a.js");
const btn = document.querySelector("#btn");
btn.onclick = ()=>{
    import('./b').then(function(module){
        const b = module.default;
        b();
    });
}
```

预加载是这样：

```js
console.log("this is a.js");
const btn = document.querySelector("#btn");
const b = import('./b');
btn.onclick = ()=>{
    b.then(function(module){
        const b = module.default;
        b();
    });
}
```
