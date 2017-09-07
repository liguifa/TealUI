define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 设置哈希值改变事件的回调。
     * @param callback 哈希值改变的事件回调。
     * @example hashChange(window, function(hash){ alert("哈希值改变为：" + hash); });
     */
    function hashChange(callback) {
        window.addEventListener("hashchange", callback, false);
        callback.call(window);
        // 并不是所有浏览器都支持 hashchange 事件，
        // 当浏览器不支持的时候，使用自定义的监视器，每隔50ms监听当前hash是否被修改。
        if (!("onhashchange" in window) || document.documentMode < 8) {
            var currentHash = hash();
            setInterval(function () {
                const newHash = hash();
                if (currentHash !== newHash) {
                    currentHash = newHash;
                    callback();
                }
            }, 50);
        }
    }
    exports.default = hashChange;
    /**
     * 获取当前页面的哈希值。
     * @return 返回当前页面的哈希值。
     * @example hash()
     */
    function hash() {
        const href = location.href;
        const index = href.indexOf("#");
        return index >= 0 ? href.substr(index + 1) : null;
    }
    exports.hash = hash;
});
//# sourceMappingURL=hashChange.js.map