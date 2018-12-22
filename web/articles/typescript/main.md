# TypeScript

> Angular 和 Vue 都拥抱了 TypeScript，可见在大型项目中需要这样一种更强的语言。为了便于阅读源码和编写大型应用，系统的学习一下 TypeScript，这篇是跟着官网学的的学习笔记，副可运行 Demo 加深理解。

## 写在前面

注：以下 TypeScript 简写为 ts。

2018 年 Vue 3.0 用 ts 重写，你多少能嗅到一些行业的变化，变化的本质是对工程上成本和收益的思考。2.0 选用 Flow 进行静态代码检查，3.0 直接使用 ts 重写，Flow 的投入显然能 cover 其本身带来成本。ts 相对于 Flow 在成本方面是较高的，毕竟 ts 是一门语言而 Flow 只是个工具，在收益方面 ts 带来的是整个编程体验的提升，搭配 VSCode 可以做更多的智能提示和校验。

Angular 也从 2.0 开始采用 TS 编写，三大 MVVM 框架有两个用 ts 编写，是时候入坑了。

我们大体的学习路径是这样：
 - 1、先用 webpack 配置一个简单的工程，这个工程能实时编译 ts 到 js；
 - 2、从官网上学习语法，在上面工程中编写 Demo 加深理解；
 - 3、结合框架和场景学习 ts 应用。

## 纯 ts 工程构建

本来打算直接从 webpack 官网考几段配置就把工程搭建起来，但是遇到了各种奇奇怪怪的问题折腾了一下午没搞定，后来转变思路从 vue-cli 脚手架入手，采用减法的形式得到了一个极简脚手架。

为了纪念这段折腾，我 release 了一个版本，有兴趣的可以去看看：https://github.com/xiaoqiang-zhao/typescript-study/releases/tag/0.1

然后从 webpack 官网找到 [webpack-typescript](https://webpack.js.org/guides/typescript/) 配置，添加了 loader 等一些配置，升级了 webpack 版本(需要 4.0 以上)，到此为止环境终于跑起来了：https://github.com/xiaoqiang-zhao/typescript-study/releases/tag/0.2

后面的学习 Demo 都在开源项目 [typescript-study](https://github.com/xiaoqiang-zhao/typescript-study) 中编写。文件目录结构也简单明了：

    ${typescript-study}
    ├── build 构建和启动开发环境
    └── src   源码
        ├── main.js   入口文件
        └── ts-demo   ts demo 源码

demo 源码和 ts 官方文档一一对应。

## 参考

[官网](http://www.typescriptlang.org/)

[Vue 2.0 为什么选用 Flow 进行静态代码检查而不是直接使用 TypeScript？](https://www.zhihu.com/question/46397274)

[webpack - typescript/](https://webpack.js.org/guides/typescript/)
