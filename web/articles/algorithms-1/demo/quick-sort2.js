function quickSort(array) {

    function sort(prev, numsize) {
        var nonius = prev;
        var j = numsize - 1;
        var flag = array[prev];
        if ((numsize - prev) > 1) {
            while (nonius < j) {
                for (; nonius < j; j--) {
                    if (array[j] < flag) {
                        array[nonius++] = array[j];　//a[i] = a[j]; i += 1;
                        break;
                    }
                }
                for (; nonius < j; nonius++) {
                    if (array[nonius] > flag) {
                        array[j--] = array[nonius];
                        break;
                    }
                }
            }
            array[nonius] = flag;
            sort(0, nonius);
            sort(nonius + 1, numsize);
        }
    }

    sort(0, array.length);
    return array;
}