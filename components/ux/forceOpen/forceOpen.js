define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 强制打开指定网页。
     * @param url 要打开的地址。
     * @example forceOpen("http://tealui.com/")
     */
    function forceOpen(url) {
        if (!window.open(url)) {
            var oldOnClick = document.onclick;
            document.onclick = function () {
                document.onclick = oldOnClick;
                window.open(url);
                return oldOnClick && oldOnClick.apply(document, arguments);
            };
        }
    }
    exports.default = forceOpen;
});
//# sourceMappingURL=forceOpen.js.map