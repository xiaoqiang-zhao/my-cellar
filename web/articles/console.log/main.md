# console.log

今天发现一个奇怪的现象，vue 组件中 console.log 打不出任何东西。

```js
const div = document.createElement('div');
div.innerHTML = '123';
div.style.position = 'fixed';
div.style.zIndex = 10000;
div.style.width = '150px';
div.style.top = '50px';
div.style.right = '10px';
div.style.padding = '10px';
div.style.background = '#fff';
document.body.appendChild(div);

window.log = function(value) {
    const log = document.createElement('div');
    log.innerHTML = value;
    div.appendChild(log);

    if (div.childNodes.length > 20) {
        div.removeChild(div.childNodes[0]);
        div.removeChild(div.childNodes[1]);
    }
}

function clear() {
    div.innerHTML = '';
    setTimeout(() => {
        clear();
    }, 10000);
}
clear();
```

原来是文件安全水印的 jssdk 搞的鬼。
