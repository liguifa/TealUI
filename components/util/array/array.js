define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 创建一个等差数列组成的数组。
     * @param start 开始的数值。
     * @param end 结束的数值（不包含此数值）。
     * @param step 相邻数值的增幅。
     * @return 返回一个新数组。
     * @example range(0, 6) // [0, 1, 2, 3, 4, 5]
     * @example range(2, 11, 3) // [2, 5, 8]
     */
    function range(start, end, step = 1) {
        const result = [];
        for (; start < end; start += step) {
            result.push(start);
        }
        return result;
    }
    exports.range = range;
    /**
     * 如果数组中不存在项则添加到数组末尾。
     * @param arr 相关的数组。
     * @param item 要添加的项。
     * @return 如果已添加到数组则返回 true，否则返回 false。
     * @example pushIf(1, 9, 0], 1) // 数组变成 [1, 9, 0]
     * @example pushIf([1, 9, 0], 2) // 数组变成 [1, 9, 0, 2]
     */
    function pushIf(arr, item) {
        return arr.indexOf(item) < 0 && arr.push(item) > 0;
    }
    exports.pushIf = pushIf;
    /**
     * 在数组的指定索引插入项。
     * @param arr 相关的数组。
     * @param index 要插入的索引（从 0 开始）。如果 *index* 大于数组的长度，则插入到末尾。
     * @param item 要插入的项。
     * @example insert(["I", "you"], 1, "love"); // 数组变成 ["I", "love", "you"]
     */
    function insert(arr, index, item) {
        arr.splice(index, 0, item);
    }
    exports.insert = insert;
    /**
     * 删除数组中指定的项。如果有多个匹配则只删除第一项。
     * @param arr 相关的数组。
     * @param item 要删除的项。
     * @param startIndex 开始搜索 *value* 的索引。
     * @return 返回被删除的项在原数组中的索引。如果数组中找不到指定的项则返回 -1。
     * @example remove([1, 9, 9, 0], 9) // 1, 数组变成 [1, 9, 0]
     * @example while(remove(arr, "wow") >= 0); // 删除所有 "wow"。
     */
    function remove(arr, item, startIndex) {
        startIndex = arr.indexOf(item, startIndex);
        ~startIndex && arr.splice(startIndex, 1);
        return startIndex;
    }
    exports.remove = remove;
    /**
     * 删除数组中指定的项。如果有多个匹配则全部删除。
     * @param arr 相关的数组。
     * @param item 要删除的项。
     * @param startIndex 开始搜索 *value* 的索引。
     * @example removeAll([1, 9, 9, 0], 9) // 数组变成 [1, 0]
     */
    function removeAll(arr, item, startIndex) {
        let index = startIndex;
        while ((index = remove(arr, item, index)) >= 0)
            ;
    }
    exports.removeAll = removeAll;
    /**
     * 删除数组中值等价于 false 的项。
     * @param arr 相关的数组。
     * @example clean(["", false, 0, undefined, null, {}]) // 数组变成 [{}]
     */
    function clean(arr) {
        for (let i = arr.length; --i >= 0;) {
            if (!arr[i]) {
                arr.splice(i, 1);
            }
        }
    }
    exports.clean = clean;
    /**
     * 清空数组的所有项。
     * @param arr 相关的数组。
     * @example clear([1, 2]) // 数组变成 []
     */
    function clear(arr) {
        arr.length = 0;
    }
    exports.clear = clear;
    /**
     * 交换数组中的两个项。
     * @param arr 相关的数组。
     * @param x 要交换的第一个索引。
     * @param y 要交换的第二个索引。
     * @example swap([1, 2, 3], 1, 2)
     */
    function swap(arr, x, y) {
        const t = arr[x];
        arr[x] = arr[y];
        arr[y] = t;
    }
    exports.swap = swap;
    /**
     * 根据指定的规则排序。
     * @param arr 相关的数组。
     * @param keys 排序的规则参数。可以是键名或自定义取值的函数。
     * @example sortBy([{ "user": "fred" }, { "user": "bred" }], o => o.user) // [{ "user": "bred" }, { "user": "fred" }]
     * @example sortBy([{ "user": "fred" }, { "user": "bred" }], "user") // [{ "user": "bred" }, { "user": "fred" }]
     */
    function sortBy(arr, ...keys) {
        arr.sort((x, y) => {
            for (const key of keys) {
                const valueX = typeof key === "function" ? key(x) : x[key];
                const valueY = typeof key === "function" ? key(y) : y[key];
                if (valueX > valueY) {
                    return 1;
                }
                if (valueX < valueY) {
                    return -1;
                }
            }
            return 0;
        });
    }
    exports.sortBy = sortBy;
    /**
     * 根据指定的规则倒排。
     * @param arr 相关的数组。
     * @param keys 排序的规则参数。可以是键名或自定义取值的函数。
     * @example sortByDesc([{ "user": "bred" }, { "user": "fred" }], o => o.user) // [{ "user": "fred" }, { "user": "bred" }]
     * @example sortByDesc([{ "user": "bred" }, { "user": "fred" }], "user") // [{ "user": "fred" }, { "user": "bred" }]
     */
    function sortByDesc(arr, ...keys) {
        return arr.sort((x, y) => {
            for (const item of keys) {
                const valueX = typeof item === "function" ? item(x) : x[item];
                const valueY = typeof item === "function" ? item(y) : y[item];
                if (valueX > valueY) {
                    return -1;
                }
                if (valueX < valueY) {
                    return 1;
                }
            }
            return 0;
        });
    }
    exports.sortByDesc = sortByDesc;
    /**
     * 将数组中的项随机打乱。
     * @param arr 相关的数组。
     * @example shuffle([1, 2, 3])
     */
    function shuffle(arr) {
        let index = arr.length;
        while (index > 0) {
            const target = Math.floor(Math.random() * index);
            const value = arr[--index];
            arr[index] = arr[target];
            arr[target] = value;
        }
    }
    exports.shuffle = shuffle;
    /**
     * 获取数组中指定索引的项。
     * @param arr 相关的数组。
     * @param index 要获取的索引（从 0 开始）。如果值为负数，则获取倒数的项。
     * @return 返回指定索引的项。
     * @example item(["a", "b"], -1) // "b"
     */
    function item(arr, index) {
        return arr[index < 0 ? arr.length + index : index];
    }
    exports.item = item;
    /**
     * 获取数组中第一个不为空的项。
     * @param arr 相关的数组。
     * @return 返回第一个不为空的项，如果所有项都为空则返回 undefined。
     * @example pick([undefined, null, 1, 2]) // 1
     */
    function pick(arr) {
        for (const value of arr) {
            if (value != undefined) {
                return value;
            }
        }
    }
    exports.pick = pick;
    /**
     * 随机获取数组中的任一项。
     * @param arr 相关的数组。
     * @return 返回某一项。如果数组为空则返回 undefined。
     * @example random([1, 2, 3])
     */
    function random(arr) {
        return arr[Math.floor(arr.length * Math.random())];
    }
    exports.random = random;
    /**
     * 计算指定项在数组中出现的次数。
     * @param arr 相关的数组。
     * @param item 要搜索的项。
     * @param startIndex 开始搜索的索引（从 0 开始）。
     * @param endIndex 结束搜索的索引（从 0 开始，不含）。
     * @return 返回项出现的次数。
     * @example count(["a", "b"], "a") // 1
     */
    function count(arr, item, startIndex = 0, endIndex = arr.length) {
        let result = 0;
        for (; startIndex < endIndex; startIndex++) {
            if (arr[startIndex] === item) {
                result++;
            }
        }
        return result;
    }
    exports.count = count;
    /**
     * 判断数组中是否存在重复项。
     * @param arr 相关的数组。
     * @return 若数组中存在重复项则返回 true，否则返回 false。
     * @example isUnique([1, 9, 0]) // true
     * @example isUnique([1, 9, 9, 0]) // false
     */
    function isUnique(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            if (~arr.indexOf(arr[i - 1], i)) {
                return false;
            }
        }
        return true;
    }
    exports.isUnique = isUnique;
    /**
     * 删除当前数组中的重复项并返回新数组。
     * @param arr 相关的数组。
     * @return 返回过滤后的新数组。
     * @example [1, 9, 9, 0].unique() // [1, 9, 0]
     */
    function unique(arr) {
        const result = [];
        for (const value of arr) {
            result.indexOf(value) < 0 && result.push(value);
        }
        return result;
    }
    exports.unique = unique;
    /**
     * 将多维数组合并为一维数组。
     * @param arr 相关的数组。
     * @return 返回新数组。
     * @example flatten([[1, 2], [[[3]]]]) // [1, 2, 3]
     */
    function flatten(arr) {
        const result = [];
        for (const value of arr) {
            value && value instanceof Array ? result.push(...flatten(value)) : result.push(value);
        }
        return result;
    }
    exports.flatten = flatten;
    /**
     * 从数组中删除另一个数组的所有项，返回剩下的项组成的新数组。
     * @param arr 相关的数组。
     * @param other 需要被删除的项数组。
     * @return 返回新数组。
     * @example sub([1, 2], [1]) // [2]
     */
    function sub(arr, other) {
        const result = [];
        for (let i = arr.length; --i >= 0;) {
            ~other.indexOf(arr[i]) || result.push(arr[i]);
        }
        return result;
    }
    exports.sub = sub;
    /**
     * 计算数组的全排列结果。
     * @param arr 相关的数组。
     * @return 返回一个新数组，其每一项都是一种排列结果。
     * @example permute([1, 2, 3]) // [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
     */
    function permute(arr) {
        const result = [];
        const usedItems = [];
        const next = (input) => {
            for (let i = 0; i < input.length; i++) {
                const item = input.splice(i, 1)[0];
                usedItems.push(item);
                if (input.length == 0) {
                    result.push(usedItems.slice(0));
                }
                next(input);
                input.splice(i, 0, item);
                usedItems.pop();
            }
        };
        next(arr);
        return result;
    }
    exports.permute = permute;
    /**
     * 将数组中的项分别和指定的键组合为对象。
     * @param arr 相关的数组。
     * @param keys 相关的键列表。
     * @return 返回数组和指定键组成的键值对。
     * @example associate([1, 2], ["a", "b"]) // { a: 1, b: 2 }
     */
    function associate(arr, keys) {
        const result = {};
        const length = Math.min(arr.length, keys.length);
        for (let i = 0; i < length; i++) {
            result[keys[i]] = arr[i];
        }
        return result;
    }
    exports.associate = associate;
    /**
     * 调用数组每一项的成员函数。
     * @param arr 相关的数组。
     * @param funcName 要调用的成员函数名。
     * @param args 调用的参数列表。
     * @return 返回所有调用结果组成的新数组。
     * @example invoke(["Teal", "UI"], "length"); // [4, 2]
     */
    function invoke(arr, funcName, ...args) {
        const result = [];
        for (const value of arr) {
            let item = value[funcName];
            if (typeof item === "function") {
                item = item.apply(value, args);
            }
            result.push(item);
        }
        return result;
    }
    exports.invoke = invoke;
    /**
     * 根据指定的规则选择项。
     * @param arr 相关的数组。
     * @param key 选择的规则参数。可以是键名或自定义取值的函数。
     * @return 返回选择的结果组成的新数组。
     * @example select([{ "user": "fred" },{ "banch": "bred" }], o => o.user) // ["fred"]
     * @example select([{ "user": "fred" },{ "banch": "bred" }], "user") // ["fred"]
     */
    function select(arr, key) {
        const result = [];
        for (const item of arr) {
            result.push(typeof key === "function" ? key(item) : item[key]);
        }
        return result;
    }
    exports.select = select;
    /**
     * 计算数组中所有项的最小值。
     * @param arr 相关的数组。
     * @return 返回数组中所有项的最小值。如果数组为空则返回 Infinity。
     * @example min([1, 2]) // 1
     */
    function min(arr) {
        return Math.min(...arr);
    }
    exports.min = min;
    /**
     * 计算数组中所有项的最大值。
     * @param arr 相关的数组。
     * @return 返回数组中所有项的最大值。如果数组为空则返回 -Infinity。
     * @example max([1, 2]) // 2
     */
    function max(arr) {
        return Math.max(...arr);
    }
    exports.max = max;
    /**
     * 计算数组中所有项的和。
     * @param arr 相关的数组。
     * @return 返回数组中所有数值的和。计算时将忽略非数字的项。如果数组为空则返回 0。
     * @example sum([1, 2]) // 3
     */
    function sum(arr) {
        let result = 0;
        let i = arr.length;
        while (--i >= 0) {
            result += +arr[i] || 0;
        }
        return result;
    }
    exports.sum = sum;
    /**
     * 计算数组中所有项的算术平均值。
     * @param arr 相关的数组。
     * @return 返回数组中所有数值的算术平均值。计算时将忽略非数字的项。如果数组为空则返回 0。
     * @example avg([1, 2]) // 1.5
     */
    function avg(arr) {
        let sum = 0;
        let c = 0;
        let i = arr.length;
        while (--i >= 0) {
            if (arr[i] === 0 || +arr[i]) {
                sum += +arr[i];
                c++;
            }
        }
        return c ? sum / c : 0;
    }
    exports.avg = avg;
});
//# sourceMappingURL=array.js.map