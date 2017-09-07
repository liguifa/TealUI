define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 空函数。
     * @example var fn = empty
     */
    function empty() { }
    exports.empty = empty;
    /**
     * 返回一个新函数，这个函数始终返回指定值。
     * @param value 新函数的返回值。
     * @return 返回一个新函数，这个函数始终返回指定值。
     * @example from(false)() // false
     */
    function from(value) {
        return () => value;
    }
    exports.from = from;
    /**
     * 判断一个对象是否是函数。
     * @param obj 要判断的对象。
     * @return 如果 *obj* 是函数则返回 true，否则返回 false。
     * @example isFunction(function () {}) // true
     * @example isFunction(null) // false
     * @example isFunction(new Function()) // true
     */
    function isFunction(obj) {
        return Object.prototype.toString.call(obj) === "[object Function]";
    }
    exports.isFunction = isFunction;
    /**
     * 串联多个函数并返回一个将依次执行串联的函数新函数。
     * @param funcs 要串联的函数。
     * @return 返回一个新函数。该函数无返回值。
     * @example concat(function (){}, function (){})()
     */
    function concat(...funcs) {
        return function () {
            for (const func of funcs) {
                func && func.apply(this, arguments);
            }
        };
    }
    exports.concat = concat;
    /**
     * 允许函数重复调用指定次数，并在最后一次真正执行。
     * @param func 要执行的函数。
     * @param count 要调用的次数。
     * @return 返回一个新函数。
     */
    function repeat(func, count) {
        return function () {
            if (--count <= 0) {
                return func.apply(this, arguments);
            }
        };
    }
    exports.repeat = repeat;
    /**
     * 运行多个函数，如果函数发生异常则继续执行下一个函数，否则返回其返回值。
     * @param funcs 要运行的函数。
     * @return 返回第一个未发生异常函数的返回值。如果所有函数都发生异常则返回 undefined。
     * @example
     * var xhr = tryThese(function(){
     *      return new ActiveXObject("Microsoft.XMLHttp");
     * }, function(){
     *      return new XMLHttpRequest();
     * })
     */
    function tryThese(...funcs) {
        for (const func of funcs) {
            try {
                return func();
            }
            catch (e) { }
        }
    }
    exports.tryThese = tryThese;
    /**
     * 每隔指定时间执行一次函数。
     * @param fn 要执行的函数。其参数为：
     * * param count 当前执行的次数。
     * * returns 如果返回 false 则强制停止执行。
     * @param times 执行的次数。如果指定为 -1 则无限次执行。
     * @param duration 每次执行之间的间隔毫秒数。
     * @example interval(function (a) { console.log(a) }, 10, 400)
     */
    function interval(fn, times = -1, duration = 0) {
        callback(0);
        function callback(count) {
            if (times-- !== 0 && fn(count++) !== false) {
                setTimeout(callback, duration, count);
            }
        }
    }
    exports.interval = interval;
    /**
     * 创建一个延时执行函数。
     * @param fn 执行的函数。
     * @param duration 延时的毫秒数。
     * @return 返回一个可触发延时执行的函数。
     * 如果在延时等待期间有新的调用，则之前的延时失效，重新开始延时执行。
     * @example document.onscroll = delay(function(){ console.log('延时执行'); }, 100);
     */
    function delay(fn, duration = 0) {
        let timer;
        return function () {
            const args = arguments;
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                timer = 0;
                fn.apply(this, args);
            }, duration);
        };
    }
    exports.delay = delay;
    /**
     * 获取指定函数的源码。
     * @param fn 要获取的函数。
     * @return 返回函数源码。
     * @example getSource(function (x){ return x; })
     */
    function getSource(fn) {
        return fn.toString().replace(/^function\s+[^(]*\s*\(.*?\)\s*\{[\r\n]*/, "").replace(/\s*\}\s*$/, "").replace(/\\u([0-9a-f]{3})([0-9a-f])/gi, (a, b, c) => String.fromCharCode((parseInt(b, 16) * 16 + parseInt(c, 16))));
    }
    exports.getSource = getSource;
    /**
     * 确保一个函数只执行一次。
     * @param fn 要执行的函数。
     */
    function once(fn) {
        let run = false;
        return function () {
            if (run) {
                return;
            }
            run = true;
            return fn.apply(this, arguments);
        };
    }
    exports.once = once;
    /**
     * 确保一个函数在当前上下文只执行指定次数。
     * @param fn 要执行的函数。
     * @param times 最多允许执行的次数。
     * @param timeout 统计超时的毫秒数。如果大于 0 表示永久保存，小于 0 表示会话内保存，等于 0 表示当前执行上下文。
     * @param cacheKey 缓存的键。
     */
    function limit(fn, times = 1, timeout = 0, cacheKey = fn.toString()) {
        return function () {
            let run;
            if (timeout === 0) {
                run = --times >= 0;
            }
            else {
                const storage = timeout > 0 ? localStorage : sessionStorage;
                const datas = storage["__function_limit__"] ? JSON.parse(storage["__function_limit__"]) : {};
                const data = datas[cacheKey] || (datas[cacheKey] = [0, Date.now()]);
                run = data[0] < times || Date.now() - data[1] > Math.abs(timeout);
                if (run) {
                    data[0]++;
                    storage["__function_limit__"] = JSON.stringify(datas);
                }
            }
            if (run) {
                return fn.apply(this, arguments);
            }
        };
    }
    exports.limit = limit;
});
//# sourceMappingURL=function.js.map