# 浏览器 Tab 之间的交互

> 为满足一个奇葩的需求。

## 场景介绍

一个页面需要打开另一个页面，并且两个页面之间还需要通信。为了方便叙述我们将前一个页面称为父页面后一个页面称为子页面，父页面需要知道子页面是否关闭(换句话就是子页面关闭的时候需要通知父页面)，以方便父页面根据子页面的状态来做一下操作(比如是打开子页面还是和已经打开的子页面进行交互)。

## 关键代码

父页面 `p.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="jquery-1.11.1.min.js"></script>
</head>
<body>
<a >AAA</a>
<a >BBB</a>
<a >CCC</a>
<script>
    window.closeWindowCb = function () {
        window.childrenWindow = undefined;
    };
    $('a').click(function () {
        var dom = $(this);
        var text = dom.html();
        if (window.childrenWindow === undefined) {
            window.childrenWindow = window.open('./c.html');
            // 子页面加载完成后执行回调
            window.childrenWindow.onload = function () {
                window.childrenWindow.initChildrenPage(text, function (body) {
                    var a = '';
                });
            }
        }
        else {
            window.childrenWindow.changeChildrenPage(text, function (body) {
                var a = '';
            });
        }
    });
</script>
</body>
</html>
```

子页面 `c.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>child</title>
    <script src="jquery-1.11.1.min.js"></script>
    <script>
        window.initChildrenPage = function (text, cb) {
            document.body.innerHTML = text;
            cb(document.body);
        };
        window.changeChildrenPage = function (text, cb) {
            document.body.innerHTML += ' - ' + text;
            cb(document.body);
        };
        $(window).bind('beforeunload', function () {
            window.opener.closeWindowCb();
            // 可以更具业务逻辑定制，但是用户的决定无法拿到
            // return "您之前的操作尚未保存";
        });
    </script>
</head>
<body>

</body>
</html>
```

## 原理简介
    
父页面定义一个全局变量来存储子页面的打开状态，`window.open`方法执行后会将子页面的`window`返回，方便我们来记录子页面的打开情况，并且为调用子页面的方法提供便利。

```js
window.childrenWindow = window.open('./c.html');
```

然后就可以监听子元素的 `onload` 事件，事件触发时调用子页面的初始化函数，在父页面监听而不在子页面中监听的好处是可以将父页面中的信息作为参数传递给子页面。

```js
window.childrenWindow.onload = function () {
    window.childrenWindow.initChildrenPage(text, function (body) {
        var a = '';
    });
}
```

子页面通信父页面通过 `window.opener` 来拿到父页面的 `window` 对象并调用父页面的全局方法。

## 不完美的地方
    
- 全局变量满天飞，注意覆盖；
- 如果子页面想提示用户是否关闭，js 无法拿到用户的最后决定。

## Demo

[简单demo](/articles/browser-tab/demo/p.html)

[稍微复杂一点的demo - 结合了Tab](/articles/browser-tab/demo/tab-p.html)
