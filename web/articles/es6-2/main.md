# ES6 学习笔记 - Part 2

## Symbol

ES5的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是ES6引入Symbol的原因。

    let s = Symbol();
    
    typeof s
    // "symbol"

Symbol 函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

    var s1 = Symbol('foo');
    var s2 = Symbol('bar');
    
    s1 // Symbol(foo)
    s2 // Symbol(bar)
    
    s1.toString() // "Symbol(foo)"
    s2.toString() // "Symbol(bar)"

注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。

    var s1 = Symbol('foo');
    var s2 = Symbol('foo');
    
    s1 === s2 // false

作为属性名的Symbol。

    var mySymbol = Symbol();
    var a = {
      [mySymbol]: 'Hello!'
    };

消除魔术字符串。魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，该由含义清晰的变量代替。

属性名的遍。Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。另一个新的API，Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
    
    let obj = {
      [Symbol('my_key')]: 1,
      enum: 2,
      nonEnum: 3
    };
    
    Reflect.ownKeys(obj)
    //  ["enum", "nonEnum", Symbol(my_key)]

由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

Symbol.for()，有时，我们希望重新使用同一个Symbol值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。

    var s1 = Symbol.for('foo');
    var s2 = Symbol.for('foo');
    
    s1 === s2 // true

Symbol.keyFor()，返回一个已登记的 Symbol 类型值的key。

    var s1 = Symbol.for("foo");
    Symbol.keyFor(s1) // "foo"
    
    var s2 = Symbol("foo");
    Symbol.keyFor(s2) // undefined

## Set 数据结构

ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Set本身是一个构造函数，用来生成Set数据结构。

    var s = new Set();
    [2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));
    
    for (let i of s) {
      console.log(i);
    }
    // 2 3 5 4

Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。

    var set = new Set([1, 2, 2]);
    [...set]  // [1, 2]

Set结构的实例有两个属性：

- constructor，构造函数，默认就是Set函数。
- size，返回Set实例的成员总数。

Set 实例的四个方法：

- add(value)：添加某个值，返回Set结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。

Array.from方法可以将Set结构转为数组。

    var items = new Set([1, 2, 3, 4, 5]);
    var array = Array.from(items);

这就提供了去除数组重复成员的另一种方法。

    function dedupe(array) {
      return Array.from(new Set(array));
    }
    
    dedupe([1, 1, 2, 3]) // [1, 2, 3]

Set结构的实例有四个遍历方法，可以用于遍历成员。

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

Set结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法，不明白为什么提供那么多方法。

    let set = new Set(['red', 'green', 'blue']);
    
    for (let x of set) {
      console.log(x);
    }
    // red
    // green
    // blue

因此使用Set可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);
    
    // 并集
    let union = new Set([...a, ...b]);
    // Set {1, 2, 3, 4}
    
    // 交集
    let intersect = new Set([...a].filter(x => b.has(x)));
    // set {2, 3}
    
    // 差集
    let difference = new Set([...a].filter(x => !b.has(x)));
    // Set {1}

Set 数据结构不能单独修改某一项，只能整体重置。

## WeakSet 数据结构

WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别：

- 首先，WeakSet的成员只能是对象(包括Function和Array，不包括null、undefined、NaN)，而不能是其他类型的值。
- 其次，WeakSet中的对象都是弱引用，不可遍历。

能用的方法又三个：add，delete，has。主要的应用场景是保存Dom节点和对象，如果节点移除对象销毁，那么WeakSet实例中的元素自动消失，这是弱引用的直观表现。

## Map 数据结构

Object 的键值只能是字符串，Map实例允许键值是对象(包括Object、Function、Array、Class、null、undefined、NaN)。

    var m = new Map([[null, 1]]);
    m.get(null); // 1

这里需要特别注意的是 NaN 被认为是同一个值：

    m.set(1/0, 2);
    m.get(2/0);    // 2

属性 size：返回Map结构的成员总数。

方法 set(key, value)、get(key)、has(key)、delete(key)、clear() 都很直观，遍历方法 keys()、values()、entries() 和回调方法 forEach() 在Map实例数据上有了实际的用途，作用也区分的很清楚。

    for (let item of map.entries()) {
      console.log(item[0], item[1]);
    }
    // "F" "no"
    // "T" "yes"
    
    // 或者
    for (let [key, value] of map.entries()) {
      console.log(key, value);
    }
    
    // 等同于使用map.entries()
    for (let [key, value] of map) {
      console.log(key, value);
    }

forEach方法还可以接受第二个参数，用来绑定this。

    var reporter = {
      report: function(key, value) {
        console.log("Key: %s, Value: %s", key, value);
      }
    };
    
    map.forEach(function(value, key, map) {
      this.report(key, value);
    }, reporter);



