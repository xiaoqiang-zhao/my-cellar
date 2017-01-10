# ES6 学习笔记

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