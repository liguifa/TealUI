define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个委托。
     */
    class Delegate {
        /**
         * 初始化新的委托。
         * @param funcs 绑定的函数。
         */
        constructor(...funcs) {
            const delegate = function () {
                for (const handler of delegate.funcs) {
                    handler.apply(this, arguments);
                }
            };
            for (const key in Delegate.prototype) {
                delegate[key] = Delegate.prototype[key];
            }
            delegate.funcs = funcs;
            return delegate;
        }
        /**
         * 增加一个委托函数。
         * @param func 要增加的函数。
         * @example new Delegate().add(function () {})
         */
        add(func) {
            this.funcs.push(func);
            return this;
        }
        /**
         * 删除一个委托函数。
         * @param func 要删除的函数。
         * @example new Delegate().remove(function () {})
         */
        remove(func) {
            const index = this.funcs.indexOf(func);
            if (index >= 0) {
                this.funcs.splice(index, 1);
            }
            return this;
        }
        /**
         * 删除所有委托函数。
         * @example new Delegate().clear()
         */
        clear() {
            this.funcs.length = 0;
            return this;
        }
    }
    exports.Delegate = Delegate;
    exports.default = Delegate;
});
//# sourceMappingURL=delegate.js.map