# 浏览器中的数据存储

> 整理备忘。

## cookie

### 概述

从底层来看，它作为 HTTP 协议的一种扩展实现，cookie 数据会自动在浏览器和 web 服务器之间传输，因此在服务器端脚本就可以读写存储的 cookie 的值，因此 cookie 通常用于存储一些通用的数据，比如用户的登陆状态，首选项等。

### 优点

相比于其他的数据存储方式，cookie 的兼容性非常的好。每次数据请求会自动携带，方便做权限判断。

### 缺点

说到 cookie 的缺点，那就有点多了，不然也不会在 cookie 后面出现 web 存储等新的数据存储的方案了。总结起来 cookie 的缺点主要是以下几点：

 - 1、存储量小。虽不同浏览器的存储量不同，但基本上都是在 4kb 左右；
 - 2、影响性能。由于 cookie 会由浏览器作为请求头发送，因此当 cookie 存储信息过多时，会影响特定域的资源获取的效率，增加文档传输的负载；
 - 3、只能储存字符串；
 - 4、安全问题。存储在 cookie 的任何数据可以被他人访问，因此不能在 cookie 中储存重要的信息。

### 代码

cookie 本质就是一个字符串并不强制采用 key-value 的形式存储，但是在工程中为了存储多个值都采用 key-value 的形式来存储。推荐一个在浏览器端读写 cookie 的库：https://www.npmjs.com/package/browser-cookies

安装：`npm install browser-cookies`。

使用：
```js
var cookies = require('browser-cookies');
 
cookies.set('firstName', 'Lisa');
cookies.set('firstName', 'Lisa', {expires: 365}); // Expires after 1 year
cookies.set('firstName', 'Lisa', {secure: true, domain: 'www.example.org'});
 
cookies.get('firstName'); // Returns cookie value (or null)
 
cookies.erase('firstName'); // Removes cookie
```

## locaStorage

### 概述

通过 locaStorage 在浏览器端存储键值对数据，相比于 cookie 而言，提供了更为直观的 API，而且虽然 locaStorage 只能存储字符串，但它也可以存储字符串化的 JSON 数据，因此相比于 cookie 它能存储更复杂的数据。

### 优点

 - 1、提供了简单明了的API来进行操作；
 - 2、可储存的数据量更大，默认每个站点 5M。

### 缺点

兼容性没有 cookie 好。

### 代码

```js
// 使用方法存储数据
locaStorage.setItem("name", "Srtian")
// 使用属性存储数据
locaStorage.say = "Hello world"
// 使用方法读取数据
const name = locaStorage.getItem("name")
// 使用属性读取数据
const say = locaStorage.say
// 删除数据
locaStorage.removeItem("name")
```

我们上面的示例全是存储字符串格式的数据，当我们需要传输其他格式的数据时，我们就需要将这些数据全部转换为字符串格式，然后再进行存储：
```js
const user = {name:"Srtian", age: 22}
localStorage.setItem("user", JSON.stringify(user))
```

当然，我们在获取值的时候也别忘了将其转化回来：
```js
var age = JSON.parse(locaStorage.user)
```

通过 locaStorage 存储的数据是永久性的，除非我们使用 removeItem 来删除或者用户通过设置浏览器配置来删除，否则数据会一直保留在用户的电脑上，永不过期。

locaStorage 的作用域限定在文档源级别的（意思就是同源的才能共享），同源的文档间会共享locaStorage 数据，他们可以互相读取对方的数据，甚至有时会覆盖对方的数据。当然，locaStorage的作用域同样也受浏览器的限制。

## sessionStorage

