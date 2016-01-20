# js 数据类型

> js 是一种松散数据类型的语言，带来了很多便利也带来了许多麻烦，这篇谈谈分类与检测和一些需要注意的技巧。

## 分类

**传统分类**

- 值类型：string，number，boolean，undefined，null
- 引用类型：Array，Object，Regexp，Function，Date

**typeof分类**

- 可直接得到：string，number，boolean，undefined
- object：Object，Function，Array，Date，Regexp，null

注：chrome 对 Function 返回 "function"，其他浏览器返回 "object"

*其他特定数据*

NaN 和 Infinity（非数字和无穷大）

	'a' / 1                     // NaN
	typeof NaN                 // number
	
	1 / 0                        // Infinity
	typeof Infinity            // number
	typeof 1 / 0                 // NaN 注意运算符的优先级
	
	Number.POSITIVE_INFINITY   // Infinity
	Number.NEGATIVE_INFINITY   // -Infinity
    Number.POSITIVE_INFINITY + Number.NEGATIVE_INFINITY     // NaN

## 检测

`Object.prototype.toString.call` 系列：

	Object.prototype.toString.call(null);       // "[object Null]"
	Object.prototype.toString.call(/\d/);       // "[object RegExp]"
	Object.prototype.toString.call({});         // "[object Object]"
	Object.prototype.toString.call([]);         // "[object Array]"
	Object.prototype.toString.call(new Date()); // "[object Date]"

`constructor` 方法只能检测当前 window 下的数据，跨 frame 无效：

	new Date().constructor === Date    // true

ES6 还提供了一些方法，跨 frame 有效：

	Array.isArray([]);    // true

还有一些特定数据的检验：NaN 和 Infinity

	NaN == NaN             // false
	window.isNaN(NaN);     // true
	
	1 / 0                  // Infinity
	1 / 0 === Infinity     // true，可用此法检测 Infinity
	1 / 0 === Number.POSITIVE_INFINITY  // true
	1 / Infinity           // 0，IE8 以上支持

## ES6

在 ES6 中， isNaN、isFinite、parseInt、parseFloat、isInteger 成为了 Number 的方法。

isInteger，判断一个值是否为整数，需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以1和1.0被视为同一个值。

	Number.isInteger(1)    // true
    Number.isInteger(1.0)  // true

EPSILON，Number对象上面，新增一个极小的常量。引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。

	Number.EPSILON
    // 2.220446049250313e-16
    0.1+0.2 === 0.3             // false
    Math.abs(0.3 - (0.1+0.2)) < Number.EPSILON   // true
    
## 参考	

[https://developer.mozilla.org/Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)