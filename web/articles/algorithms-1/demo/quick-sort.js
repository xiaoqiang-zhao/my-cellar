/**
 * 快速排序
 *
 * Created by zhaoxiaoqiang on 16/6/21.
 */

/**
 * 对数组快速排序
 *
 * @param {Array} array 待排序的数组
 * @param {number} from [可选]起始位置，在递归的时候才会用到此参数
 * @param {number} to [可选]终止位置，，在递归的时候才会用到此参数
 *
 * @returns {Array} array 排序后的数组(是传入数组的址引用)
 */
function quickSort(array, from, to) {
    // 参数容错，可使初始化不用做特殊处理
    from = from || 0;
    to = to === undefined ? (array.length - 1) : to;
    // to || (array.length - 1); 此种写法对 to=0 的情况会出问题

    if (from < to) {

        var markIndex = from - 1;  // 标记位
        var spaceItem = array[to]; // 默认最后一个

        // 找出分水岭的位置，并把大小数分列两侧
        for (var i = from; i <= to; i++) {
            if (array[i] <= spaceItem) {
                markIndex++;
                var temp = array[markIndex];
                array[markIndex] = array[i];
                array[i] = temp;
            }
        }

        arguments.callee(array, from, markIndex - 1);
        arguments.callee(array, markIndex + 1, to);
    }
    return array;
}

console.log(quickSort([5, 2, 4, 6, 1, 3]));
console.log(quickSort([5, 2, 4, 6, 1, 1]));
console.log(quickSort([6, 1, 3, 5, 2, 4, 7]));
