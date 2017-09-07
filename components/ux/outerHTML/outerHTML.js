define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 获取外部 HTML。
     * @param elem 相关的元素。
     */
    function getOuterHTML(elem) {
        const p = elem.ownerDocument.createElement(elem.parentNode ? elem.parentNode.nodeName : "div");
        p.appendChild(elem.cloneNode(true));
        return p.innerHTML;
    }
    exports.getOuterHTML = getOuterHTML;
    /**
     * 设置外部 HTML。
     * @param elem 相关的元素。
     * @param value 要设置的值。
     */
    function setOuterHTML(elem, value) {
        if (elem.parentNode) {
            const p = elem.ownerDocument.createElement(elem.parentNode.nodeName);
            p.innerHTML = value;
            while (p.firstChild) {
                elem.parentNode.insertBefore(p.firstChild, elem);
            }
            elem.parentNode.removeChild(elem);
        }
    }
    exports.setOuterHTML = setOuterHTML;
});
//# sourceMappingURL=outerHTML.js.map