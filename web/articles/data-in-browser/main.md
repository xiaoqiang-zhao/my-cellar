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

sessionStorage 是 web 存储机制的另一大对象，与 locaStorage 不同的是如果用户关闭当前会话页或浏览器存储在其中的数据就会被清除。

基本用法和优缺点和 locaStorage 大同小异，这里不再赘述。

## IndexedDB

### 概述

用于存储更大量的结构化数据，并提供索引功能以实现高性能查找。它一般用于保存大量用户数据并要求数据之间有搜索需要的场景，当网络断开时，用户就可以做一些离线的操作。它较之 SQL 更为方便，不需要写一些特定的语法对数据进行操作，数据格式是 JSON。

### 代码

使用IndexedDB在浏览器端存储数据会比上述的其他方法更为复杂。首先，我们需要创建数据库，并指定这个数据库的版本号：

```js
// 注意数据库的版本号只能是整数
const request = IndexedDB.open(databasename, version);
```

然后我们需要生成处理函数，需要注意的是 onupgradeneeded 是我们唯一可以修改数据库结构的地方。在这里面，我们可以创建和删除对象存储空间以及构建和删除索引。 

```js
request.onerror = function() {
	// 创建数据库失败时的回调函数
}
request.onsuccess = function() {
	// 创建数据库成功时的回调函数
}
request.onupgradeneededd = function(e) {
	// 当数据库改变时的回调函数
}
```

然后我们就可以建立对象存储空间了，对象存储空间仅调用 `createObjectStore()` 就可以创建。这个方法使用存储空间的名称，和一个对象参数。即便这个参数对象是可选的，它还是非常重要的，因为它可以让我们定义重要的可选属性和完善你希望创建的对象存储空间的类型。

```js
request.onupgradeneeded = function(event) {
	const db = event.target.result
	const objectStore = db.createObjectStore('name', { keyPath:'id' })
}
```

对象的存储空间我们已经建立好了，接下来我们就可以进行一系列操作了，比如添加数据：

```js
addData: function(db, storename, data) {
	const store = db.transaction(storename, 'readwrite').objectStore(storename);
	for(let i = 0; i < data.length; i++) {
		const request = store.add(data[i])
		request.onerror = function() {
			console.error('添加数据失败');
		}
		request.onsuccess = function() {
			console.log('添加数据成功');
		}
	}
}
```

如果我们想要修改数据，语法与添加数据差不多，因为重复添加已存在的数据会更新原本的数据，但还是有细小的差别：

```js
putData: function(db, storename, data) {
	const store = store = db.transaction(storename, 'readwrite').objectStore(storename)
	for(let i = 0; i < data.length; i++) {
		const request = store.put(data[i])
		request.onerror = function() {
			console.error('修改数据失败')
		}
		request.onsuccess = function() {
			console.log('修改数据成功')
		}
	}
}
```

获取数据：

```js
getDataByKey: function(db, storename, key) {
	const store = store = db.transaction(storename, 'readwrite').objectStore(storename)
	const request = store.get(key)
	request.onerror = function() {
		console.error('获取数据失败')
	}
	request.onsuccess = function(e) {
		const result = e.target.result
		console.log(result)
	}
}
```

删除数据：

```js
deleteDate: function(db, storename, key) {
	const store = store = db.transaction(storename, 'readwrite').objectStore(storename)
	store.delete(key)
	console.log('已删除存储空间' + storename + '中的' + key + '纪录')
}
```

关闭数据库：

```js
db.close();
```

## 参考

[掘金](https://juejin.im/post/5aeaf545518825673b61ddc8)
