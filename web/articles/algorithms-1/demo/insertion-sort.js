/**
 * 插入排序
 * Created by zhaoxiaoqiang on 16/6/21.
 */

var data = [5, 2, 4, 6, 1, 3];

function insertionSort(array) {
    if (Array.isArray(array) && array.length > 1) {
        // 插入排序核心代码
        for (var i = 1; i < array.length; i++) {
            var key = array[i];
            var j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
    }
    else {
        console.warn('入参并非是数组：');
        console.log(array);
    }
    return array;
}

console.log(insertionSort(data));