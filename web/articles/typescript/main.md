# TypeScript

> Angular 和 Vue 都拥抱了 TypeScript，可见在大型项目中需要这样一种更强的语言。为了便于阅读源码和编写大型应用，系统的学习一下 TypeScript，这篇是跟着官网学的的学习笔记，附可运行 Demo 加深理解。

## 写在前面

注：以下 TypeScript 简写为 ts。

2018 年 Vue 3.0 用 ts 重写，你多少能嗅到一些行业的变化，变化的本质是对工程上成本和收益的思考。2.0 选用 Flow 进行静态代码检查，3.0 直接使用 ts 重写，Flow 的投入显然能 cover 其本身带来成本。ts 相对于 Flow 在成本方面是较高的，毕竟 ts 是语言级而 Flow 只是工具级，在收益方面 ts 带来的是整个编程体验的提升，搭配 VSCode 可以做更多的智能提示和校验。

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

## 类

类的声明和使用：

```js
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

类的继承：

```js
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

公共私有与受保护的修饰符，在 ts 里成员都默认为公共(public)，与公共相对的就是私有(private)，当成员被标记成 private 时，它就不能在声明它的类的外部访问。

```js
class Animal {
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    };
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```

受保护属性(protected)，protected 修饰符与 private 修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。

```js
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
```

你可以使用 readonly 关键字将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。

```js
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
```

存取器，存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 

```js
class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        this._fullName = newName;
    }
}
```

静态属性，存在于类本身上面而不是类的实例上。

```js
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}
```

抽象类，做为其它派生类的基类使用，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 

```js
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```

## 函数

为函数定义类型，指定入参的类型和返回值类型：

```js
function add(x: number, y: number): number {
    return x + y;
}
```

可选参数和默认参数：

```js
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
```

剩余参数，某些场景下你需要同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 arguments来访问所有传入的参数。在TypeScript里，你可以把所有参数收集到一个变量里：

```js
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

重载，JavaScript本身是个动态语言。 JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的。

```js
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
```

## 泛型

一种约束，一种方法使返回值的类型与传入参数的类型是相同的。

```js
function identity<T>(arg: T): T {
    return arg;
}
```

使用时可以指定参数类型(当然这就同时指定了返回值类型)：

```js
let output = identity<string>("myString");
```

还可以不指定参数类型：

```js
let output = identity("myString");
```

引伸用法是使用泛型变量，返回数组并且数组元素的类型与入参类型一致：

```js
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
    return arg;
}
```

## 枚举

使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript支持数字的和基于字符串的枚举。

```js
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
```

Up使用初始化为 1。 其余的成员会从 1开始自动增长。 换句话说， Direction.Up的值为 1， Down为 2， Left为 3， Right为 4。

不使用初始化器:

```js
enum Direction {
    Up,
    Down,
    Left,
    Right,
}
```

Up的值为 0， Down的值为 1等等。 当我们不在乎成员的值的时候，这种自增长的行为是很有用处的，但是要注意每个枚举成员的值都是不同的。

枚举的使用：

```js
enum Response {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: Response): void {
    // ...
}

respond("Princess Caroline", Response.Yes)
```

字符串枚举:

```js
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了反向映射，从枚举值到枚举名字。 例如，在下面的例子中：

```js
enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

## 类型推论

除了主动声明变量类型，变量初始化赋值时会根据值得类型确定变量类型：

```js
let num = 3;
num = 'a'; // 有语法问题
```

## 类型兼容

在基于名义类型的类型系统中，数据类型的兼容性或等价性是通过明确的声明和/或类型的名称来决定的。这与结构性类型系统不同，它是基于类型的组成结构，且不要求明确地声明。

```js
interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();
```

在使用基于名义类型的语言，比如 C# 或 Java 中，这段代码会报错，因为 Person 类没有明确说明其实现了 Named 接口。

TypeScript 的结构性子类型是根据 JavaScript 代码的典型写法来设计的。 因为 JavaScript 里广泛地使用匿名对象，例如函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更好。

函数的兼容：

```js
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

## 高级类型

交叉类型：可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 

```js
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

联合类型：指定参数的可选类型，原生类型声明如下：

```js
function padLeft(value: string, padding: string | number) {
    // ...
}
```

如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员：

```js
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors
```

null和 undefined，默认情况下，类型检查器认为 null 与 undefined 可以赋值给任何类型，这也意味着，你阻止不了将它们赋值给其它类型，就算是你想要阻止这种情况也不行。 null 的发明者 Tony Hoare 称它为 价值亿万美金的错误。--strictNullChecks标记可以解决此错误：当你声明一个变量时，它不会自动地包含 null或 undefined。 你可以使用联合类型明确的包含它们：

```js
let s = "foo";
s = null; // 错误, 'null'不能赋值给'string'
let sn: string | null = "bar";
sn = null; // 可以

sn = undefined; // error, 'undefined'不能赋值给'string | null'
```

注意，按照JavaScript的语义，TypeScript会把 null和 undefined区别对待。 string | null， string | undefined和 string | undefined | null是不同的类型。

使用了 --strictNullChecks，可选参数会被自动地加上 | undefined:

```js
function f(x: number, y?: number) {
    return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
f(1, null); // error, 'null' is not assignable to 'number | undefined'
```

## 总结

ts 对于 js 来说是一种强约束，在项目中使用会增加设计和编码的成本，你需要花更多的时间来思考怎样抽象以及怎么满足其他代码的约束；另一方面正因为强约束代码的可预期性会得到提高，至于维护成本直接取决于前期的约束设计是否合理，ts 的强约束是一把双刃剑，合理的约束让项目稳定健壮，不合理的约束会让人觉得处处受限。

比如让你设计一个表单验证器，用原生 js 和 ts 分别实现一下做个对比。

最后说一句话：强大的人喜欢驾驭那些一般人难以驾驭的技术以彰显自己的强大，警惕为了彰显而彰显。

## 参考

[官网](http://www.typescriptlang.org/)

[Vue 2.0 为什么选用 Flow 进行静态代码检查而不是直接使用 TypeScript？](https://www.zhihu.com/question/46397274)

[webpack - typescript/](https://webpack.js.org/guides/typescript/)

[TypeScript 入门教程](https://ts.xcatliu.com/advanced/generics.html)