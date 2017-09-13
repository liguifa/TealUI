define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个异步任务队列。
     */
    class AsyncQueue extends Array {
        constructor() {
            super(...arguments);
            /**
             * 被挂起的次数。
             */
            this._suspendCount = 0;
        }
        /**
         * 添加一个任务函数。
         * @param callback 要添加的任务函数。
         * @param link 当前队列正在等待其它异步任务函数时所使用的处理方式。
         *
         * 值      | 意义
         * --------|--------------------------------------------
         * wait    | 等待之前所有异步任务都完成后再执行当前任务。
         * abort   | 终止正在执行和其它正在等待的任务并立即执行当前任务。
         * replace | 终止正在执行的异步任务并立即执行当前任务，然后继续执行其它正在等待的异步任务。
         * insert  | 等待正在执行的异步任务完成后执行当前任务，然后继续执行其它正在等待的异步任务。
         * cancel  | 取消当前任务。
         *
         * @example new AsyncQueue().then(() => { })
         */
        then(callback, link = "wait") {
            if (this._suspendCount && link !== "wait") {
                switch (link) {
                    case "abort":
                        this[0] = callback;
                        this.length = 1;
                        this.skip();
                        break;
                    case "insert":
                        this.splice(1, 0, callback);
                        break;
                    case "replace":
                        this.splice(1, 0, callback);
                        this.skip();
                        break;
                }
            }
            else {
                this.push(callback);
                this._progress();
            }
        }
        /**
         * 终止当前正在执行的异步任务并执行其它正在等待的任务。
         * @example new AsyncQueue().abort()
         */
        skip() {
            if (this._abortable) {
                this._abortable.abort();
            }
            else {
                this.resume();
            }
        }
        /**
         * 挂起当前队列。所有后续任务都将开始等待。
         * @param abortable 引发挂起的对象。其提供一个 `abort()` 函数可立即终止执行。
         * @example new AsyncQueue().suspend()
         */
        suspend(abortable) {
            this._suspendCount++;
            if (abortable) {
                this._abortable = abortable;
            }
        }
        /**
         * 通知当前异步任务已经完成，并继续执行下一个任务。
         * @param data 传递给下个异步任务的数据。
         * @example new AsyncQueue().resume()
         */
        resume(data) {
            this._suspendCount--;
            if (data !== undefined) {
                this._data = data;
            }
            this._progress();
        }
        /**
         * 判断当前队列是否已被阻止。
         */
        get suspended() { return !!this._suspendCount; }
        /**
         * 执行队首的异步任务。
         */
        _progress() {
            while (this.length && !this._suspendCount) {
                delete this._abortable;
                this.shift()(this._data);
            }
        }
    }
    exports.default = AsyncQueue;
});
//# sourceMappingURL=asyncQueue.js.map