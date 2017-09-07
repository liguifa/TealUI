define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 绑定 CTRL 回车事件。
     * @param elem 要绑定的元素。
     * @param callback 设置 CTRL 回车的回调。
     * @example ctrlEnter(elem, function(){ alert("CTRL+ENTER"); });
     */
    function ctrlEnter(elem, callback) {
        elem.addEventListener("keypress", e => {
            if ((e.ctrlKey || e.metaKey) && (e.which === 13 || e.which === 10)) {
                callback(e);
            }
        });
    }
    exports.default = ctrlEnter;
});
//# sourceMappingURL=ctrlEnter.js.map