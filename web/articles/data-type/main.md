# js 数据类型

> js 是一种松散数据类型的语言，带来了很多便利也带来了许多麻烦，这篇谈谈分类与检测和一些需要注意的技巧。

## 分类

**传统分类**

- 值类型：string，number，boolean，undefined，null
- 引用类型：Array，Object，Regexp，Function，Date

**typeof分类**

- 可直接得到：string，number，boolean，undefined，function
- object：null，Regexp，Object，Array，Date

*其他数据*

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
