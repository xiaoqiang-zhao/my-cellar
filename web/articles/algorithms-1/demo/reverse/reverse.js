function reverse(array) {

    if (Array.isArray(array)) {
        var length = array.length - 1;               // 1
        array.some(function (item, index) {          // n/2
            // 交换顺序
            if (index < length - index) {            // 1
                var t = array[index];                // 1
                array[index] = array[length - index];// 1
                array[length - index] = t;           // 1
            }
            // 结束循环
            else {
                return true;
            }
        });
    }
    return array;
}

// 整体运算量: 1 + n/2(1 + 1 + 1 + 1) = 2n + 1
// 所发复杂度为:O(n)