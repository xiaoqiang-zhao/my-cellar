# san

> 百度的 MVVM 开源框架。

## 双向绑定

```js
var MyApp = san.defineComponent({
    template: ''
        + '<div>'
        +   '<input value="{= name =}" placeholder="please input">'
        +   'Hello {{name}}!'
        + '</div>'
});

var myApp = new MyApp();
myApp.attach(document.body);
```

## dispatch

派发一个消息。消息将沿着组件树向上传递，直到遇到第一个处理该消息的组件。上层组件通过 messages 声明组件要处理的消息。消息主要用于组件与非 owner 的上层组件进行通信。

## 更新单个数组元素用 splice 方法

```js
this.data.splice('arrayName', [index, 1, item]);
```

https://baidu.github.io/san/doc/main-members/#Data

## 参考资料

官网: 
https://baidu.github.io/san

文档:
https://baidu.github.io/san/doc/api/