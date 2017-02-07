# Object

> ES2015 的新特性还没跟上 ES6 又来了，让我们一起补课，紧跟时代别拉下。

## 声明方式

声明方式有了一些简化写法：

    var human = {
        breathe() {
            console.log('breathing...');
        }
    };
    
    function sleep() {
        console.log('sleeping...');
    }
    
    var worker = {
        __proto__: human, // 设置原型，相当于继承human
        company: 'code',
        sleep, // 相当于 `sleep: sleep`
        work() {
            console.log('working...');
        }
    };

调用方式没有什么大的变化：

    human.breathe(); // breathing...
    worker.sleep();  // sleeping...
    worker.work();   // working...

    for (key in worker) {
        console.log(key);
        if (worker.hasOwnProperty(key)) {
            console.log('OwnProperty:' + key);
        }
    }
    // 控制台输出结果
    company
    OwnProperty:company
    sleep
    OwnProperty:sleep
    work
    OwnProperty:work
    breathe

## 参考

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

