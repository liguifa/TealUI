define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 对类数组进行冒泡排序。
     * @param iteratable 要排序的类数组。
     * @param comparer 用于排序时确定优先级的函数。函数的参数为：
     * - x：比较的第一个参数。
     * - y：比较的第二个参数。
     * - 如果返回 true，则说明 *x* 应该排在 *y* 之前。否则 *x* 应该排在 *y* 之后。
     * @param start 开始排序的索引。
     * @param end 结束排序的索引。
     * @desc 冒泡排序是稳定排序算法。
     * @example bubbleSort([1, 3, 5, 4, 3]) // [1, 3, 3, 4, 5]
    */
    function bubbleSort(iteratable, comparer = (x, y) => x < y, start = 0, end = iteratable.length) {
        for (; start < end; start++) {
            for (let i = start + 1; i < end; i++) {
                if (comparer(iteratable[i], iteratable[start])) {
                    const t = iteratable[start];
                    iteratable[start] = iteratable[i];
                    iteratable[i] = t;
                }
            }
        }
        return iteratable;
    }
    exports.bubbleSort = bubbleSort;
    /**
     * 对类数组进行快速排序。
     * @param iteratable 要排序的类数组。
     * @param comparer 用于排序时确定优先级的函数。函数的参数为：
     * - x：比较的第一个参数。
     * - y：比较的第二个参数。
     * - 如果返回 true，则说明 *x* 应该排在 *y* 之前。否则 *x* 应该排在 *y* 之后。
     * @param start 开始排序的索引。
     * @param end 结束排序的索引。
     * @desc 快速排序不是稳定排序算法。
     * @example quickSort([1, 3, 5, 4, 3]) // [1, 3, 3, 4, 5]
    */
    function quickSort(iteratable, comparer = (x, y) => x < y, start = 0, end = iteratable.length) {
        if (start < end) {
            const t = iteratable[start];
            let low = start;
            let high = end;
            do {
                while (high > low && !comparer(iteratable[high], t)) {
                    high--;
                }
                if (low < high) {
                    iteratable[low++] = iteratable[high];
                }
                while (low < high && comparer(iteratable[low], t)) {
                    low++;
                }
                if (low < high) {
                    iteratable[high--] = iteratable[low];
                }
            } while (low < high);
            iteratable[low] = t;
            quickSort(iteratable, comparer, start, high - 1);
            quickSort(iteratable, comparer, high + 1, end);
        }
        return iteratable;
    }
    exports.quickSort = quickSort;
    /**
     * 对类数组进行希尔排序。
     * @param iteratable 要排序的类数组。
     * @param comparer 用于排序时确定优先级的函数。函数的参数为：
     * - x：比较的第一个参数。
     * - y：比较的第二个参数。
     * - 如果返回 true，则说明 *x* 应该排在 *y* 之前。否则 *x* 应该排在 *y* 之后。
     * @param start 开始排序的索引。
     * @param end 结束排序的索引。
     * @desc 希尔排序不是稳定排序算法。
     * @example shellSort([1, 3, 5, 4, 3]) // [1, 3, 3, 4, 5]
     */
    function shellSort(iteratable, comparer = (x, y) => x < y, start = 0, end = iteratable.length) {
        for (let gap = (end - start) >> 1; gap > 0; gap = gap >> 1) {
            for (let i = gap + start; i < end; i++) {
                const t = iteratable[i];
                let j = i;
                for (; (j - gap >= start) && comparer(t, iteratable[j - gap]); j -= gap) {
                    iteratable[j] = iteratable[j - gap];
                }
                iteratable[j] = t;
            }
        }
        return iteratable;
    }
    exports.shellSort = shellSort;
});
//# sourceMappingURL=sort.js.map