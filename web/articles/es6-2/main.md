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






