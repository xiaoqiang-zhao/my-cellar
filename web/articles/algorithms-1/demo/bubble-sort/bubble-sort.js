/**
 * 冒泡排序
 * Created by zhaoxiaoqiang on 16/8/12.
 */

var data = [5, 2, 4, 6, 1, 3];

function bubbleSort(array) {
    if (Array.isArray(array)) {
        // 插入排序核心代码
        var i = array.length, j;
        var temp;
        while (i > 0) {
            for (j = 0; j < i - 1; j++) {
                if (array[j] > array[j + 1]) {      // 这是一个平均概率和最坏情况概率相同的算法,不管情况怎么样计算量相同
                                                    //  n-1 + n-2 + ... + 0
                                                    //  = (n^2 - n)/2
                    temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
            i--;
        }
    }
    else {
        console.warn('入参并非是数组：');
        console.log(array);
    }
    return array;
}

console.log(bubbleSort(data));