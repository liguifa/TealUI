define(["require", "exports", "ux/dom"], function (require, exports, dom) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 判断元素是否在指定区域。
     * @param elem 要判断的元素。
     * @param container 要判断的容器元素或区域。
     * @param padding 判断是否在区域内的最小距离。
     * @return 如果元素和目标容器有任一交集，则返回 true，否则返回 false。
     * @example within(elem, { x:0, y:0, width: 400, height: 500 });
     */
    function within(elem, container, padding = 0) {
        container = container.nodeType ? dom.getRect(container) : container;
        const rect = dom.getRect(elem);
        const deltaY = rect.y - container.y;
        const deltaX = rect.x - container.x;
        return (deltaY < padding ? deltaY + rect.height > padding : deltaY < container.height) && (deltaX < padding ? deltaX + rect.width > padding : deltaX < container.width);
    }
    exports.default = within;
});
//# sourceMappingURL=within.js.map