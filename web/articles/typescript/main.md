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

## 基础数据类型

因为 ts 是 js 的超集，所以 js 有的数据类型 ts 都有，ts 在声明变量的时候更为严格，赋值的时候也只能赋和声明时相同类型的数据，以布尔值为例：

```js
let isDone: boolean = false;
isDone = true; // 可行
isDone = 1; // 报错
```

下面是其他两种基础数据类型的声明方式：

```js
let num: number = 0;
let str: string = '';
```

数组的声明方式有两种，下面是声明元素是数字的一维数组的两种方式：

```js
// 数据类型后接 []
let arr1: number[] = [1, 2, 3];
// 泛型方式
let arr2: Array<number> = [1, 2, 3];
```

对应二维数组的声明是下面这样：

```js
let arr3: number[][] = [[1], [2]];;
let arr4: Array<Array<number>> = [[1], [2]];
```

新添了一种数组类型 Tuple，中文翻译为元组，定义一种确定长度并每个元素是确定某种数据类型的数组：

```js
let tuple: [number, string] = [0, 'name'];
tuple = ['name', 0]; // 报错
```

新添数据类型 enum，中文翻译为枚举，默认情况下，从 0 开始为元素编号。

```js
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
// c 的值是 1
```

你也可以手动的指定成员的数值。例如，我们将上面的例子改成

```js
// 从 1 开始编号
enum Color2 {Red = 1, Green, Blue};
let c2: Color2 = Color2.Green;
// c2 的值是 2

// 每一个都手动赋值
enum Color3 {Red = 1, Green = 2, Blue = 4};
```

如果仅仅是这样定义常量就可以了，枚举还有一项神奇的能力，那就是通过值反查键：

```js
enum Color4 {Red = 1, Green, Blue}
let colorName: string = Color4[2];
// colorName 的值是 Green
```

如果你还想用回 js 那种自由的感觉，或者在某些特殊的场合声明时不能确定数据类型，那么你可以用 Any 数据类型：

```js
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
```

void 空类型，一般作为无返回值函数的定义：

```js
function warnUser(): void {
    console.log("This is my warning message");
}
```

神奇的 never 类型，个人觉得没啥用。

最后补充一个用法“断言”，通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言有两种形式。

```js
// “尖括号”语法：
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

```js
// as语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

## 变量声明

这一段主要讲的 let const 以及解构和 ES6 基本相同，这里就不再歪歪一遍了。

## 接口约束

```js
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

上面代码中 printLabel 函数要求入参书一个含有 label 属性的对象(只约束必要参数，多出其他属性是可以的)，如果要把这个约束抽象出来，那就是“接口约束”:

```js
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

除了必须属性，还可以设置可选属性：

```js
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

`{color: string; area: number}` 这一段是定义函数的返回值。

只读对象，一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性:

```js
interface Point {
    readonly x: number;
    readonly y: number;
}
```

你可以通过赋值一个对象字面量来构造一个Point。 赋值后， x和y再也不能被改变了。

```js
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

只读数组，ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```js
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

readonly vs const，最简单判断该用 readonly 还是 const 的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用 readonly。

额外的属性检查：

```js
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
// error: 'colour' not expected in type 'SquareConfig'
```

注意传入 createSquare 的参数拼写为 colour 而不是 color。 在 JavaScript 里，这会默默地失败。虽然绕过去的方式有很多，但是推荐将函数入参定义完整。

函数类型，定义函数入参和出参的接口：

```js
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

我们可以这样使用，函数的参数名不需要与接口里定义的名字相匹配：

```js
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```

可索引的类型，可以定义返回数组中某一数据类型项：

```js
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

强制一个类区符合某种规则：

```js
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}
class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) {
        // ...
    }
}
const clockNow = new Cloce
```

继承接口，和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```js
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

一个接口可以继承多个接口，创建出多个接口的合成接口。

```js
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

混合类型，先前我们提过，接口能够描述 JavaScript 里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

```js
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) {
        return 'str';
    };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
console.log('c:', c);
```

接口继承类，当接口继承了类，类的属性也被接口继承，基于接口定义一个新的类时被继承的类的属性需要被重新实现：

```js
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() { }
}
```

当接口 SelectableControl 集成了 Control 时，用 SelectableControl 直接约束 Image 时需要重新定义 Control 的私有属性 state。

## 参考

[官网](http://www.typescriptlang.org/)

[Vue 2.0 为什么选用 Flow 进行静态代码检查而不是直接使用 TypeScript？](https://www.zhihu.com/question/46397274)

[webpack - typescript/](https://webpack.js.org/guides/typescript/)
