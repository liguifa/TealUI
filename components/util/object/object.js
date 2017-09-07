define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 复制对象的所有属性到目标对象，如果目标对象已存在对应属性则跳过。
     * @param iterable 复制的目标对象。
     * @param source 复制的源对象。
     * @example assignIf({a: 1}, {a: 2, b: 2}) // {a: 1, b: 2}
     */
    function assignIf(iterable, source) {
        for (const key in source) {
            if (iterable[key] === undefined) {
                iterable[key] = source[key];
            }
        }
        return iterable;
    }
    exports.assignIf = assignIf;
    /**
     * 在对象指定键之前插入一个键值对。
     * @param obj 要插入的对象。
     * @param newKey 新插入的键。
     * @param newValue 新插入的值。
     * @param refKey 插入的位置。新键值对将插入在指定的键前。如果指定键不存在则插入到末尾。
     * @example insertBefore({ a: 1 }, "b", 2, "a") // { b:2, a: 1 }
     */
    function insertBefore(obj, newKey, newValue, refKey) {
        let tmpObj;
        for (const key in obj) {
            if (key === refKey) {
                tmpObj = {};
            }
            if (tmpObj) {
                tmpObj[key] = obj[key];
                delete obj[key];
            }
        }
        obj[newKey] = newValue;
        for (const key in tmpObj) {
            obj[key] = tmpObj[key];
        }
    }
    exports.insertBefore = insertBefore;
    function each(iterable, callback, thisArg) {
        if (iterable && typeof iterable.length === "number") {
            for (let i = 0; i < iterable.length; i++) {
                if ((i in iterable) && callback.call(thisArg, iterable[i], i, iterable) === false) {
                    return false;
                }
            }
        }
        else {
            for (const i in iterable) {
                if (callback.call(thisArg, iterable[i], i, iterable) === false) {
                    return false;
                }
            }
        }
        return true;
    }
    exports.each = each;
    function forEach(iterable, callback, thisArg) {
        if (iterable && typeof iterable.length === "number") {
            for (let i = 0; i < iterable.length; i++) {
                if (i in iterable) {
                    callback.call(thisArg, iterable[i], i, iterable);
                }
            }
        }
        else {
            for (const i in iterable) {
                callback.call(thisArg, iterable[i], i, iterable);
            }
        }
    }
    exports.forEach = forEach;
    function filter(iterable, callback, thisArg) {
        let result;
        if (iterable && typeof iterable.length === "number") {
            result = [];
            for (let i = 0; i < iterable.length; i++) {
                if ((i in iterable) && callback.call(thisArg, iterable[i], i, iterable)) {
                    result.push(iterable[i]);
                }
            }
        }
        else {
            result = {};
            for (const i in iterable) {
                if (callback.call(thisArg, iterable[i], i, iterable)) {
                    result[i] = iterable[i];
                }
            }
        }
        return result;
    }
    exports.filter = filter;
    function map(iterable, callback, thisArg) {
        let result;
        if (iterable && typeof iterable.length === "number") {
            result = [];
            for (let i = 0; i < iterable.length; i++) {
                if (i in iterable) {
                    result[i] = callback.call(thisArg, iterable[i], i, iterable);
                }
            }
        }
        else {
            result = {};
            for (const i in iterable) {
                result[i] = callback.call(thisArg, iterable[i], i, iterable);
            }
        }
        return result;
    }
    exports.map = map;
    function every(iterable, callback, thisArg) {
        if (iterable && typeof iterable.length === "number") {
            for (let i = 0; i < iterable.length; i++) {
                if ((i in iterable) && !callback.call(thisArg, iterable[i], i, iterable)) {
                    return false;
                }
            }
        }
        else {
            for (const i in iterable) {
                if (!callback.call(thisArg, iterable[i], i, iterable)) {
                    return false;
                }
            }
        }
        return true;
    }
    exports.every = every;
    function some(iterable, callback, thisArg) {
        if (iterable && typeof iterable.length === "number") {
            for (let i = 0; i < iterable.length; i++) {
                if ((i in iterable) && callback.call(thisArg, iterable[i], i, iterable)) {
                    return true;
                }
            }
        }
        else {
            for (const i in iterable) {
                if (callback.call(thisArg, iterable[i], i, iterable)) {
                    return true;
                }
            }
        }
        return false;
    }
    exports.some = some;
    function find(iterable, callback, thisArg) {
        if (iterable && typeof iterable.length === "number") {
            for (let i = 0; i < iterable.length; i++) {
                if ((i in iterable) && callback.call(thisArg, iterable[i], i, iterable)) {
                    return iterable[i];
                }
            }
        }
        else {
            for (const i in iterable) {
                if (callback.call(thisArg, iterable[i], i, iterable)) {
                    return iterable[i];
                }
            }
        }
    }
    exports.find = find;
    function findIndex(iterable, callback, thisArg) {
        if (iterable && typeof iterable.length === "number") {
            for (let i = 0; i < iterable.length; i++) {
                if ((i in iterable) && callback.call(thisArg, iterable[i], i, iterable)) {
                    return i;
                }
            }
            return -1;
        }
        else {
            for (const i in iterable) {
                if (callback.call(thisArg, iterable[i], i, iterable)) {
                    return i;
                }
            }
        }
    }
    exports.findIndex = findIndex;
    function reduce(iterable, callback, initialValue, thisArg) {
        let result;
        let first = true;
        if (iterable && typeof iterable.length === "number") {
            for (let i = 0; i < iterable.length; i++) {
                if (i in iterable) {
                    if (first) {
                        first = false;
                        result = initialValue === undefined ? iterable[i] : callback.call(thisArg, initialValue, iterable[i], i, iterable);
                    }
                    else {
                        result = callback.call(thisArg, result, iterable[i], i, iterable);
                    }
                }
            }
        }
        else {
            for (const i in iterable) {
                if (first) {
                    first = false;
                    result = initialValue === undefined ? iterable[i] : callback.call(thisArg, initialValue, iterable[i], i, iterable);
                }
                else {
                    result = callback.call(thisArg, result, iterable[i], i, iterable);
                }
            }
        }
        return result;
    }
    exports.reduce = reduce;
    function reduceRight(iterable, callback, initialValue, thisArg) {
        let result;
        let first = true;
        if (iterable && typeof iterable.length === "number") {
            for (let i = iterable.length; --i >= 0;) {
                if (i in iterable) {
                    if (first) {
                        first = false;
                        result = initialValue === undefined ? iterable[i] : callback.call(thisArg, initialValue, iterable[i], i, iterable);
                    }
                    else {
                        result = callback.call(thisArg, result, iterable[i], i, iterable);
                    }
                }
            }
        }
        else {
            const key = [];
            for (const i in iterable) {
                key.push(i);
            }
            for (let i = key.length; --i >= 0;) {
                if (first) {
                    first = false;
                    result = initialValue === undefined ? iterable[key[i]] : callback.call(thisArg, initialValue, iterable[key[i]], key[i], iterable);
                }
                else {
                    result = callback.call(thisArg, result, iterable[key[i]], key[i], iterable);
                }
            }
        }
        return result;
    }
    exports.reduceRight = reduceRight;
    /**
     * 获取对象指定键列表的子集。
     * @param obj 要处理的对象。
     * @param keys 要获取的键列表。
     * @return 返回新对象。
     * @example subset({a: 1, b: 2}, ['a']) // {a: 1}
     */
    function subset(obj, keys) {
        const result = {};
        for (const key of keys) {
            if (key in obj) {
                result[key] = obj[key];
            }
        }
        return result;
    }
    exports.subset = subset;
    /**
     * 判断一个对象是否是引用对象。
     * @param obj 要判断的对象。
     * @return 如果 *obj* 是引用变量，则返回 true，否则返回 false。
     * @desc 此函数等效于 `obj !== null && typeof obj === "object"`
     * @example isObject({}) // true
     * @example isObject(null) // false
     */
    function isObject(obj) {
        return obj !== null && typeof obj === "object";
    }
    exports.isObject = isObject;
    /**
     * 缓存所有类型转为字符串的值。
     */
    let types;
    /**
     * 获取指定对象的类型。
     * @param obj 要判断的对象。
     * @return 返回类型字符串。
     * @example type(null) // "null"
     * @example type(undefined) // "undefined"
     * @example type(new Function) // "function"
     * @example type(+'a') // "number"
     * @example type(/a/) // "regexp"
     * @example type([]) // "array"
     */
    function type(obj) {
        if (!types) {
            types = { __proto__: null };
            "Boolean Number String Function Array Date RegExp Object Error".replace(/\w+/g, typeName => types["[object " + typeName + "]"] = typeName.toLowerCase());
        }
        return obj == null ? String(obj) : types[Object.prototype.toString.call(obj)] || "object";
    }
    exports.type = type;
    /**
     * 计算对象的属性数。
     * @param obj 要处理的对象。
     * @return 返回对象自身的属性数，不包含原型属性。
     * @example size({a: 1, b: 2}) // 2
     * @example size([0, 1]) // 2
     */
    function size(obj) {
        let result = 0;
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result++;
            }
        }
        return result;
    }
    exports.size = size;
    /**
     * 判断一个对象是否为空。
     * @param obj 要判断的对象。
     * @return 如果 *obj* 是 null、undefined、false、空字符串、空数组或空对象，则返回 true，否则返回 false。
     * @example isEmpty(null) // true
     * @example isEmpty(undefined) // true
     * @example isEmpty("") // true
     * @example isEmpty(" ") // false
     * @example isEmpty([]) // true
     * @example isEmpty({}) // true
     */
    function isEmpty(obj) {
        if (!obj || obj.length === 0) {
            return true;
        }
        for (const key in obj) {
            return false;
        }
        return true;
    }
    exports.isEmpty = isEmpty;
    /**
     * 浅拷贝一个对象并返回和原对象无引用关系的副本。
     * @param obj 要复制的对象。
     * @return 返回拷贝的新对象，更新新对象不会影响原对象。
     * @desc 出于性能考虑，本函数不会拷贝函数和正则表达式。
     * @example clone({a: 3, b: [5]}) // {a: 3, b: [5]}
     */
    function clone(obj) {
        if (obj && typeof obj === "object") {
            return Object.assign({}, obj);
        }
        return obj;
    }
    exports.clone = clone;
    /**
     * 深拷贝一个对象并返回和原对象无引用关系的副本。
     * @param obj 要复制的对象。
     * @param depth 最多拷贝的深度。
     * @return 返回拷贝的新对象，更新新对象不会影响原对象。
     * @desc 出于性能考虑，本函数不会深拷贝函数和正则表达式。
     * @example deepClone({a: 3, b: [5]}) // {a: 3, b: [5]}
     */
    function deepClone(obj, depth = Infinity) {
        if (obj && typeof obj === "object" && depth-- === 0) {
            if (obj instanceof Array) {
                const newObj = [];
                for (let i = 0; i < obj.length; i++) {
                    newObj[i] = deepClone(obj[i]);
                }
                obj = newObj;
            }
            else if (obj instanceof Date) {
                obj = new Date(+obj);
            }
            else if (!(obj instanceof RegExp)) {
                const newObj = { __proto__: obj.__proto__ };
                for (const i in obj) {
                    newObj[i] = deepClone(obj[i]);
                }
                obj = newObj;
            }
        }
        return obj;
    }
    exports.deepClone = deepClone;
    /**
     * 深拷贝一个对象并返回和原对象无引用关系的副本。此函数可以处理循环引用。
     * @param obj 要复制的对象。
     * @param depth 最多拷贝的深度。
     * @return 返回拷贝的新对象，更新新对象不会影响原对象。
     * @desc 出于性能考虑，本函数不会深拷贝函数和正则表达式。
     * @example deepCloneSafe({a: 3, b: [5]}) // {a: 3, b: [5]}
     */
    function deepCloneSafe(obj, cloned = [], clonedResult = []) {
        if (obj && typeof obj === "object") {
            const index = cloned.indexOf(obj);
            if (index >= 0) {
                return clonedResult[index];
            }
            if (obj instanceof Array) {
                const newObj = [];
                cloned.push(obj);
                clonedResult.push(newObj);
                for (let i = 0; i < obj.length; i++) {
                    newObj[i] = deepCloneSafe(obj[i], cloned, clonedResult);
                }
                obj = newObj;
            }
            else if (obj instanceof Date) {
                obj = new Date(+obj);
            }
            else if (!(obj instanceof RegExp)) {
                const newObj = { __proto__: obj.__proto__ };
                cloned.push(obj);
                clonedResult.push(newObj);
                for (const i in obj) {
                    newObj[i] = deepCloneSafe(obj[i], cloned, clonedResult);
                }
                obj = newObj;
            }
        }
        return obj;
    }
    exports.deepCloneSafe = deepCloneSafe;
    /**
     * 比较两个引用对象的内容是否相同。
     * @param x 要比较的第一个对象。
     * @param y 要比较的第二个对象。
     * @return 如果比较的对象相同则返回 true，否则返回 false。
     * @example deepEqual([], []) // true
     */
    function deepEqual(x, y) {
        if (x && y && typeof x === "object" && typeof y === "object") {
            if (Array.isArray(x) !== Array.isArray(y)) {
                return false;
            }
            for (const key in x) {
                if (!deepEqual(x[key], y[key])) {
                    return false;
                }
            }
            for (const key in y) {
                if (!deepEqual(x[key], y[key])) {
                    return false;
                }
            }
            return true;
        }
        return x === y;
    }
    exports.deepEqual = deepEqual;
    /**
     * 深度比较两个对象的差异。
     * @param x 要比较的第一个对象。
     * @param y 要比较的第二个对象。
     * @return 返回一个新对象。
     * @example diff({ a:1, c: 1 }, { b: 1, c: 2 }) // { left: ["a"], right: ["b"], both: ["c"] }
     */
    function diff(x, y) {
        const result = {
            /**
             * 获取仅在左值存在的字段。
             */
            left: [],
            /**
             * 获取仅在右值存在的字段。
             */
            right: [],
            /**
             * 获取在左右同时存在但其值不同的字段。
             */
            both: [],
        };
        for (const key in x) {
            if (!(key in y)) {
                result.left.push(key);
            }
            else if (x[key] !== y[key]) {
                result.both.push(key);
            }
        }
        for (const key in y) {
            if (!(key in x)) {
                result.right.push(key);
            }
        }
        return result;
    }
    exports.diff = diff;
    /**
     * 深度比较两个对象的差异。
     * @param objX 要比较的第一个对象。
     * @param objY 要比较的第二个对象。
     * @param depth 最多比较的深度。
     * @return 返回一个新对象。
     * @example deepDiff({ a:1, c: 1 }, { b: 1, c: 2 }) // {left: ["a"], right: ["b"], both: ["c"]}
     */
    function deepDiff(x, y, depth = Infinity) {
        const result = {
            /**
             * 获取仅在左值存在的字段。
             */
            left: [],
            /**
             * 获取仅在右值存在的字段。
             */
            right: [],
            /**
             * 获取在左右同时存在但其值不同的字段。
             */
            both: [],
        };
        diff(x, y, "", depth);
        return result;
        function diff(x, y, prefix, depth) {
            if (depth-- === 0) {
                return;
            }
            for (const key in x) {
                if (!(key in y)) {
                    result.left.push(prefix + key);
                }
                else if (x[key] !== y[key]) {
                    if (typeof x[key] !== "object" || typeof y[key] !== "object") {
                        result.both.push(prefix + key);
                    }
                    else {
                        diff(x[key], y[key], prefix + key + ".", depth);
                    }
                }
            }
            for (const key in y) {
                if (!(key in x)) {
                    result.right.push(prefix + key);
                }
            }
        }
    }
    exports.deepDiff = deepDiff;
    /**
     * 返回第一个不为空的值。
     * @param values 要检测的对象。
     * @return 返回第一个不为空的值。如果都为空则返回 undefined。
     * @example pick(undefined, null, 1) // 1
     */
    function pick(...values) {
        for (const value of values) {
            if (value != undefined) {
                return value;
            }
        }
    }
    exports.pick = pick;
    /**
     * 返回对象中指定值对应的第一个键。
     * @param obj 要搜索的对象。
     * @param value 要查找的值。
     * @return 返回匹配的第一个键，如果不存在匹配的值则返回 null。
     * @example keyOf({a:1, b:1}, 1) // "a"
     */
    function keyOf(obj, value) {
        for (const key in obj) {
            if (obj[key] === value) {
                return key;
            }
        }
        return null;
    }
    exports.keyOf = keyOf;
    /**
     * 获取对象指定属性的值。
     * @param obj 要获取的对象。
     * @param prop 要获取的属性表达式。如 `a.b[0]`。
     * @return 返回属性值。如果属性不存在则返回 undefined。
     * @example get({a: {b: 1}}, "a.b") // 1
     */
    function get(obj, prop) {
        prop.replace(/\.?\s*([^\.\[]+)|\[\s*([^\]]*)\s*\]/g, ((_, propName, indexer) => {
            if (obj) {
                obj = obj[propName || indexer];
            }
        }));
        return obj;
    }
    exports.get = get;
    /**
     * 设置对象指定属性的值。
     * @param obj 要设置的对象。
     * @param prop 要设置的属性表达式。如 `a.b[0]`。
     * @param value 要设置的值。
     * @example set({}, "a[1].b", 2) // { a: [undefined, { b: 2 }]}
     */
    function set(obj, prop, value) {
        let prevObject;
        let prevKey;
        prop.replace(/\.?\s*([^\.\[]+)|\[\s*([^\]]*)\s*\]/g, ((source, propName, indexer, index) => {
            let currentObject = prevKey ? prevObject[prevKey] : obj;
            if (currentObject == null) {
                currentObject = indexer ? [] : {};
                if (prevKey) {
                    prevObject[prevKey] = currentObject;
                }
                else {
                    prevObject = obj = currentObject;
                }
            }
            prevObject = currentObject;
            prevKey = propName || indexer;
            if (index + source.length === prop.length) {
                currentObject[prevKey] = value;
            }
        }));
        return obj;
    }
    exports.set = set;
    /**
     * 设置一个对象的属性值。
     * @param obj 要修改的对象。
     * @param key 要设置的属性名。
     * @param value 要设置的属性值。
     * @return 返回已修改的对象。
     * @example setProperty({myKey: "oldValue"}, "myKey", "newValue")
     */
    function setProperty(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            writable: true,
            enumerable: true,
            configurable: true
        });
    }
    exports.setProperty = setProperty;
    /**
     * 添加调用指定成员函数后的回调函数。
     * @param obj 相关的对象。
     * @param key 相关的属性名。
     * @param callback 要添加的函数。
     * @example
     * var obj = { func: function() { console.log(1); } };
     * addCallback(obj, "func", function() { console.log(2); } )
     * obj.func(); // 输出 1, 2
     */
    function addCallback(obj, key, callback) {
        const oldFunc = obj[key];
        obj[key] = oldFunc ? function () {
            const oldResult = oldFunc.apply(this, arguments);
            const newResult = callback.apply(this, arguments);
            return oldResult !== undefined ? oldResult : newResult;
        } : callback;
    }
    exports.addCallback = addCallback;
    /**
     * 添加设置指定属性后的回调函数。
     * @param obj 相关的对象。
     * @param key 相关的属性名。
     * @param callback 要添加的函数。
     */
    function addSetter(obj, key, callback) {
        let originalData;
        Object.defineProperty(obj, key, {
            get() {
                return originalData;
            },
            set(value) {
                originalData = value;
                callback();
            }
        });
    }
    exports.addSetter = addSetter;
});
//# sourceMappingURL=object.js.map