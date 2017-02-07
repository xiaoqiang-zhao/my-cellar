# ES6 学习笔记 - Part 1

## ECMAScript 6简介

ECMAScript的起源：1996年11月，JavaScript的创造者Netscape公司，决定将JavaScript提交给国际标准化组织ECMA，希望这种语言能够成为国际标准。次年，ECMA发布262号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为ECMAScript，这个版本就是1.0版。
                                                                             
之后经理的浏览器大战，IE胜出成为事实的标准，ECMAScript 名存实亡，类似于三国时期的汉帝。随着Chrome的强势崛起，IE市场份额的萎缩，厂商之间出现了一种平衡关系，谁不准守规范就有出局的风险，再加上开发者对浏览器兼容性的抱怨，浏览器标准化终于迎来了一个好机会。其实 ECMAScript 一直在前进，一直在出新的版本，只是标准没有被厂商严格执行，2015年的 ECMAScript 6.0 这一版本遇上了这样一个好机会，标准被各大厂商争相实现。

我们将这样一个历史性的版本标记为 ES6，之后 ECMAScript 的版本不会采用之前的方式来发布，而是每年6月发布一次，2015年发布的 ECMAScript 6.0 又被称为 ECMAScript 2015。ES6 成为了一个历史名词，泛指5.1版以后的JavaScript的下一代标准，涵盖了ES2015、ES2016、ES2017等等。

注：ES6从开始制定到最后发布，整整用了15年，中间故事很多。

工具的支持略过，学习时可以用这个[在线工具](https://babeljs.io/repl)。

## let 和 const 命令

let，代码块作用域变量；const，代码块作用域常量。

不存在变量提成，但是目前的降级工具还是将他们翻译成 var。

temporal dead zone，暂时性死区：

    var tmp = 123;
    
    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }

`typeof something` 不再是一个绝对安全的操作(之前 `typeof something.something` 也不是绝对安全操作)。
  
不允许重复声明。
 
块级作用域，块级作用域可以替代立即执行函数。

ES5规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明，但是浏览器没有遵守这个规定。不过，“严格模式”下还是会报错。

    // ES5严格模式
    'use strict';
    if (true) {
      function f() {}
    }
    // 报错

const 只对值类型数据有用，数组和对象的元素和属性依然可以被修改，如果想锁数组和对象，需要借助 freeze 方法。

注：数组的 freeze 待查证。

ES5只有两种声明变量的方法：var 命令和 function 命令。ES6除了添加 let 和 const 命令，后面章节还会提到，另外两种声明变量的方法：import 命令和 class 命令。所以，ES6一共有6种声明变量的方法。

## 变量的解构赋值

一行语句为多个变量赋值：

    // 数组形式
    var [x, y = 'b'] = ['a', undefined];
    // x='a', y='b'
    
    // 对象形式
    var {x, y = 'b'} = {x: 'a', y: undefined};

对于表达式，用到的时候才执行：

    let [x = f()] = [1];
    // 函数 f 不会被执行

别名策略，将后面对象的 foo 属性赋值给 baz 变量

    var { foo: baz } = { foo: "aaa", bar: "bbb" };

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量

    let { log, sin, cos } = Math;
    
函数的参数解构，主要的作用大概是局部参数的打平，默认值等与数组和对象的用法相同
    
    function add([x, y = 0]){
      return x + y;
    }
    
    add([1, 2]); // 3
    add([1]);    // 1

## 字符串的扩展

遍历字符串

    for (let codePoint of 'foo') {
      console.log(codePoint)
    }
    // "f"
    // "o"
    // "o"

新加了方法 includes, startsWith, endsWith 用来补充 indexOf 的不足，使操作更方便。这三个方法都支持第二个参数，表示开始搜索的位置。

    var s = 'Hello world!';
    
    s.startsWith('world', 6); // true
    s.includes('Hello', 1);   // false

endsWith 的行为与其他两个方法有所不同，它针对前n个字符

    s.endsWith('Hello', 5);   // true

repeat 方法返回一个新字符串，表示将原字符串重复n次。
    
    'x'.repeat(3) // "xxx"
    
padStart，padEnd 字符串补全长度功能    
    
    'abc'.padStart(10, '0123456789');  // '0123456abc'
    'abc'.endStart(10, '0123456789');  // 'abc0123456'

模板字符串，换行、变量、运算、字符串拼接，模板嵌套不易读

    var [name, a, b] = ['jack', 1, 2];
    `<div>
      ${name}
      ${a + b}
      ${name + '-' + a}
    </div>`

## 正则的扩展

初始化函数更强悍

    var regex = new RegExp(/xyz/i);
    // 等价于
    var regex = /xyz/i;

添加 u 修饰符，识别大于 `0xFFFF` 的 Unicode 字符

flags 和 sticky 属性，y 修饰符。

## 数值的扩展

二进制和八进制的新写法，字母大小写都可以：

    0b1001 === 9   // true
    0o11 === 9     // true

将全局方法 parseInt 和 parseFloat 移到 Number 下。

添加新函数 isFinite，isNaN，isInteger，isSafeInteger

isInteger 是否为整数：

    Number.isInteger(1);   // true
    Number.isInteger(1.0); // true

添加一个属性 EPSILON，表示极小值。

isSafeInteger 判断整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。

## 数组的扩展

添加方法 form 将类数组转变成数组。

添加方法 copyWithin，将指定位置的成员复制到其他位置（会覆盖原有成员），它接受三个参数。
                                        
- target（必需）：从该位置开始替换数据。
- start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

添加方法 find 和 findIndex，用于查找元素。

添加 fill 方法，填充已有数组，接受3个参数：填充值，起始位置，结束位置。

又添加3个遍历方法 entries，keys 和 values。

添加方法 includes。

注：indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相当运算符（===）进行判断，这会导致对NaN的误判。

空位，要尽量避免。

## 函数的扩展

函数参数的默认值：

    function log(x, y = 'World') {
      console.log(x, y);
    }
    
    log('Hello') // Hello World
    log('Hello', 'China') // Hello China

与解构赋值默认值结合使用

    function foo({x, y = 5}) {
      console.log(x, y);
    }
    
    foo({x: 1}) // 1, 5
    foo() // TypeError: Cannot read property 'x' of undefined

双重默认值的用法

    function fetch(url, { method = 'GET' } = {}) {
      console.log(method);
    }
    
    fetch('http://example.com');
    // "GET"
    fetch('http://example.com', {method: 'POST'});
    // "POST"

双重默认值的两种写法及区别

    // 写法一
    function m1({x = 0, y = 0} = {}) {
      return [x, y];
    }
    
    // 写法二
    function m2({x, y} = { x: 0, y: 0 }) {
      return [x, y];
    }

函数的length属性，等于函数的参数个数减去指定了默认值的参数个数，rest参数也不会计入length属性。

    (function(...args) {}).length // 0

指定参数为必填参数的技巧：

    function throwIfMissing() {
      throw new Error('Missing parameter');
    }
    
    function foo(mustBeProvided = throwIfMissing()) {
      return mustBeProvided;
    }
    
    foo()
    // Error: Missing parameter

rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。使用 of 来遍历：

    function add(...values) {
      let sum = 0;
    
      for (var val of values) {
        sum += val;
      }
    
      return sum;
    }
    
    add(2, 5, 3) // 10

扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。

    console.log(...[1, 2, 3])

扩展运算符提供了数组合并的新写法。
    
    // ES5
    [1, 2].concat(more)
    // ES6
    [1, 2, ...more]

扩展运算符还可以将字符串转为真正的数组。

    [...'hello']
    // [ "h", "e", "l", "l", "o" ]

扩展运算符还可以将类数组(Iterator) 转换成数组

    var nodeList = document.querySelectorAll('div');
    var array = [...nodeList];

Map和Set结构，Generator函数 ??? 

函数的name属性，返回该函数的函数名。

    function foo() {}
    foo.name // "foo"
    
    var f = function () {};
    
    // ES5
    f.name // ""
    
    // ES6
    f.name // "f"

箭头函数，使得表达更加简洁。

    // 平方
    const square = n => n * n;

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。

    var getTempItem = id => ({ id: id, name: "Temp" });

箭头函数的一个用处是简化回调函数。

    [1,2,3].map(x => x * x);

箭头函数有几个使用注意点。

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作Generator函数。

关于 this 的两个例子：

例一：

    function foo() {
      setTimeout(() => {
        console.log('id:', this.id);
      }, 100);
    }
    
    var id = 21;
    
    foo.call({ id: 42 });
    // id: 42

例二：

    function Timer() {
      this.s1 = 0;
      this.s2 = 0;
      // 箭头函数
      setInterval(() => this.s1++, 1000);
      // 普通函数
      setInterval(function () {
        this.s2++;
      }, 1000);
    }
    
    var timer = new Timer();
    
    setTimeout(() => console.log('s1: ', timer.s1), 3100);
    setTimeout(() => console.log('s2: ', timer.s2), 3100);
    // s1: 3
    // s2: 0

绑定 this

    foo::bar;
    // 等同于
    bar.bind(foo);

尾调用，尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

    function f(x){
      return g(x);
    }

用尾调用优化性能，简单地说如果对下一个函数的调用写在中间，那么就需要先"保护现场"，等下一个函数执行完毕之后继续执行当前函数剩余的语句，而把下一个函数的调用写在末尾，js 的引擎就能尽早放下对执行现场的控制从而优化性能。以下三种情况，都不属于尾调用。

    // 情况一
    function f(x){
      let y = g(x);
      return y;
    }
    
    // 情况二
    function f(x){
      return g(x) + 1;
    }
    
    // 情况三
    function f(x){
      g(x);
    }

尾递归，函数调用自身，称为递归。如果尾调用自身，就称为尾递归。下面是用尾递归优化求阶乘函数前后的代码：

    
    function factorial(n) {
      if (n === 1) return 1;
      return n * factorial(n - 1);
    }
    
    function factorial(n, total = 1) {
      if (n === 1) return total;
      return factorial(n - 1, n * total);
    }
    
尾递归节省内存的效果非常明显，如果是非尾递归的 fibonacci 递归方法

    function Fibonacci (n) {
      if ( n <= 1 ) {return 1};
    
      return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
    
    Fibonacci(10);  // 89
    Fibonacci(500); // 浏览器直接卡死

如果采用尾递归优化

    function Fibonacci (n, ac1 = 1, ac2 = 1) {
        if (n <= 1) {
            return ac2;
        }
        
        return Fibonacci(n -1, ca2, ca1 + ca2);
    }
    Fibonacci(500); // 2.2559151616193602e+104

ES6的尾调用优化只在严格模式下开启，正常模式是无效的。这是因为在正常模式下，函数内部有变量 arguments，可以跟踪函数的调用栈。

函数参数的尾逗号，ECMAScript 2017将允许函数定义和调用的最后一个参数有尾逗号（trailing comma）。

    function clownsEverywhere(
      param1,
      param2,
    ) { /* ... */ }
    
    clownsEverywhere(
      'foo',
      'bar',
    );

## 对象的扩展

属性和方法的简洁表示法:

    var foo = 'bar';
    function f () {}
    var baz = {foo, f, f2 () {}};
    
    // 等同于
    var baz = {foo: foo, f: f, f2: function () {}};

属性名表达式：

    let propKey = 'foo';
    
    let obj = {
      [propKey]: true,
      ['a' + 'bc']: 123
    };

Object.assign 方法，同名属性后面的覆盖前面的：

    var target = { a: 1 };
    
    var source1 = { b: 2 };
    var source2 = { c: 3 };
    
    Object.assign(target, source1, source2);
    target // {a:1, b:2, c:3}

注意，Object.assign 方法实行的是浅拷贝，而不是深拷贝。
