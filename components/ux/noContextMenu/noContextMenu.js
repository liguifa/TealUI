define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 禁止右键菜单。
     * @param elem 相关的元素。
     */
    function noContextMenu(elem) {
        elem.addEventListener("contextmenu", e => e.preventDefault());
    }
    exports.default = noContextMenu;
});
//# sourceMappingURL=noContextMenu.js.map