define(["require", "exports", "ux/dom"], function (require, exports, dom) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 获取元素的状态。
     * @param elem 要获取的元素。
     * @param classPrefix CSS 类名前缀。
     * @return 返回状态。
     */
    function getStatus(elem, classPrefix) {
        for (const state of ["error", "warning", "info", "success"]) {
            if (dom.hasClass(elem, `${classPrefix}${state}`)) {
                return state;
            }
        }
        return null;
    }
    exports.getStatus = getStatus;
    /**
     * 设置元素的状态。
     * @param elem 要设置的元素。
     * @param classPrefix CSS 类名前缀。
     * @param value 要设置的状态。
     */
    function setStatus(elem, classPrefix, value) {
        for (const state of ["error", "warning", "info", "success"]) {
            dom.removeClass(elem, `${classPrefix}${state}`);
        }
        if (value) {
            dom.addClass(elem, `${classPrefix}${value}`);
        }
    }
    exports.setStatus = setStatus;
});
//# sourceMappingURL=status.js.map