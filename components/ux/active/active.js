define(["require", "exports", "ux/dom"], function (require, exports, dom) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 获取列表中的元素的激活元素。
     * @param items 所有元素列表。
     * @param className 激活的 CSS 类名。
     * @return 返回激活的元素。如果不存在则返回 null。
     */
    function getActive(items, className) {
        for (const item of items) {
            if (dom.hasClass(item, className)) {
                return item;
            }
        }
        return null;
    }
    exports.getActive = getActive;
    /**
     * 设置列表中指定的元素为激活样式。
     * @param items 所有元素列表。
     * @param className 激活的 CSS 类名。
     * @param value 要激活的元素。如果为 null 则表示不再激活新元素。
     */
    function setActive(items, className, value) {
        for (const item of items) {
            dom.toggleClass(item, className, item === value);
        }
    }
    exports.setActive = setActive;
});
//# sourceMappingURL=active.js.map