/**
 * 快速排序
 *
 * Created by zhaoxiaoqiang on 16/6/21.
 */

var data = [5, 2, 4, 6, 1, 3];

function quickSort(array, from, to) {
    // 快速排序核心代码
    if (from < to) {
        var spaceIndex;
        var x = array[to]; // 主元
        var index = from - 1;
        for (var i = from; i < to - 1; i++) {
            if (array[i] <= x) {
                index++;
                var temp = array[index];
                array[index] = array[i];
                array[i] = temp;
            }
        }

        spaceIndex = index + 1;
        arguments.callee(array, from, spaceIndex - 1);
        arguments.callee(array, spaceIndex + 1, to);
    }
    return array;
}

console.log(quickSort(data, 0, data.length - 1));