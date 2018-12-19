# TypeScript

> Angular 和 Vue 都拥抱了 TypeScript，可见在大型项目中需要这样一种更强的语言。为了便于阅读源码和编写大型应用，系统的学习一下 TypeScript，这篇是跟着官网学的的学习笔记，副可运行 Demo 加深理解。

## 写在前面

注：以下 TypeScript 简写为 TS。

2018 年 Vue 3.0 用 TS 重写，你多少能嗅到一些行业的变化，变化的本质是对工程上成本和收益的思考。2.0 选用 Flow 进行静态代码检查，3.0 直接使用 TS 重写，Flow 的投入显然能 cover 其本身带来成本。TS 相对于 Flow 在成本方面是较高的，毕竟 TS 是一门语言而 Flow 只是个工具，在收益方面 TS 带来的是整个编程体验的提升，搭配 VSCode 可以做更多的智能提示和校验。

Angular 也从 2.0 开始采用 TS 编写，三大 MVVM 框架有两个用 TS 编写，是时候入坑了。

## 参考

[官网](http://www.typescriptlang.org/)

[Vue 2.0 为什么选用 Flow 进行静态代码检查而不是直接使用 TypeScript？](https://www.zhihu.com/question/46397274)
