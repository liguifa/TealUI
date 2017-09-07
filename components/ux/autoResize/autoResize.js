define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 令文本域随输入内容自动调整高度。
     * @param elem 要处理的文本域节点。
     */
    function autoResize(elem) {
        function autoResize() {
            elem.style.height = 'auto';
            elem.style.height = elem.scrollHeight + 'px';
        }
        elem.style.overflow = "hidden";
        elem.addEventListener("keydown", autoResize);
        elem.addEventListener("input", autoResize);
        elem.addEventListener("keyup", autoResize);
        autoResize();
    }
    exports.default = autoResize;
});
//# sourceMappingURL=autoResize.js.map