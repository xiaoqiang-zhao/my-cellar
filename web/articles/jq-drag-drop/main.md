# jQuery UI 的 Drop 嵌套解决方案

> 拖和放是连个复合事件，由多个事件组成，所以不能用普通的事件处理来处理拖放遇到的问题，其中一个问题就是接收拖拽的元素是一组层叠嵌套的元素时，会出现多次响应 `drop` 事件的问题，这里提供一个解决此问题的方案。

## 解决思路

通过一个静态辅助对象来解决此问题。`droppable` 事件有 `over` 和 `out` 事件，事件触发时记录进入了哪些元素又从哪些元素中出来，这些记录分别保存在两个数组中，每次触发事件后调用一个函数处理这些数据，得到最后 `hover` 的元素，这个元素就可以被视为需要接收拖拽的元素。

## API

## 代码

静态类的代码如下：

    var dragDropFramework = {
        activeClass: 'active',
        clean: function () {
            this.overElements = [];
            this.outElements = [];
            // 先移除当前激活态元素的激活样式
            if (this.activeElement !== null) {
                $(this.activeElement).removeClass(this.activeClass);
            }
            this.activeElement = null;
        },
        activeElement: null,
        overElements: [],
        outElements: [],
        resetActiveElement: function () {
            // 将 out 队列中有的元素从 over 和 out 队列中移除
            var outElements = this.outElements;
            var overElements = this.overElements;
            for (var i = 0; i < outElements.length; i++) {
                var outItem = outElements[i];
                for (var j = 0; j < overElements.length; j++) {
                    var overItem = overElements[j];
                    if (outItem === overItem) {
                        outElements.splice(i, 1);
                        overElements.splice(j, 1);
                        break;
                    }
                }
            }
            // 取最后 hover 的元素
            var result;
            if (overElements.length !== 0) {
                result = overElements[overElements.length - 1];
            }
            else {
                result = null;
            }
            this.activeElement = result;
        },
        resetActiveElementClass: function () {
            var activeClass = this.activeClass;
            // 先移除当前激活态元素的激活样式
            if (this.activeElement !== null) {
                $(this.activeElement).removeClass(activeClass);
            }
            // 重新计算激活态元素
            this.resetActiveElement();
            // 添加当前激活态元素的激活样式
            if (this.activeElement !== null) {
                $(this.activeElement).addClass(activeClass);
            }
        }
    };

## 示例

[示例](/articles/jq-drag-drop/demo/index.html)模拟了三种情况：

- 三层嵌套
- 两层嵌套无空隙
- 内层元素溢出

这三种情况基本可以覆盖实际应用的全部场景，最后一个场景会有问题，

[Demo](/articles/jq-drag-drop/demo/index.html)，打开控制台可以看到各事件的 log 输出。

## 问题规避

在最后一个 Demo 中演示了内层元素溢出的情况，在这种情况下有可能先进入内层元素后进入外层元素(也可能不进入外层元素，这和用户的操作有关)，这会导致