# 前端面试题收集

## 数组去重

[参考](http://www.w3cplus.com/javascript/remove-duplicates-from-javascript-array.html)

提供一个我的方法：

    function unique2(arr) {
        if (!Array.isArray(arr)) {
            return arr;
        }

        arr.forEach((value, index) => {
            while (index !== -1) {
                index = arr.indexOf(value, index + 1);
                if (index !== -1) {
                    arr.splice(index--, 1);
                }
            }
        });

        return arr;
    }

这种算法的时间复杂度是 n 方。具体的计算法：

第一个数需要 n - 1 次比较，第二个数需要 n - 2 次，...，最后一个数不需要比较，于是有下面的累加式

 O(n) = (n - 1) + (n - 2) + ... + [n - (n - 1)] = n(n - 1)/2

## 素质类

### 你能将一件我不知道的事情用两三分钟跟我讲明白吗？

重点不在讲的事情本身，而在于面试者怎么讲述。要将一件事情或概念用简短的话语表述清楚，需要对事情本生做抽象和整理，抓重点忽略细节还要将零散的重点串成一个通顺的逻辑，对于抽象的概念还要找到合适的比喻，这是一种在工作中非常有用的综合能力，可以大大提高沟通的效率。

