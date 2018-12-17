# 原生 Ajax 写法

> 纯收集

## 代码

```js

//XHR = new XMLHttpRequest();   // 非IE内核
//XHR = new ActiveXObject("Microsoft.XMLHTTP"); ie7及以上版本

var XHR = window.XMLHttpRequest ? (new XMLHttpRequest()) : (new ActiveXObject("Microsoft.XMLHTTP")) ;

    if(XHR){  
        XHR.open("get",url);   
        XHR.onreadystatechange = function () {  
            // readyState值说明  
            // 0,初始化,XHR对象已经创建,还未执行open  
            // 1,载入,已经调用open方法,但是还没发送请求  
            // 2,载入完成,请求已经发送完成  
            // 3,交互,可以接收到部分数据  
    
            // status值说明  
            // 200:成功  
            // 404:路径错误  
            // 500:服务器内部错误  
            if (XHR.readyState == 4 && XHR.status == 200) {  
                //XHR.responseText 返回的数据
                // 主动释放,JS本身也会回收的  
                XHR = null;  
            }  
        };  
        XHR.send();  
    }
```
