define(["require", "exports", "control", "./contextMenu.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个右键菜单。
     */
    class ContextMenu extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-contextmenu" });
        }
    }
    exports.ContextMenu = ContextMenu;
    exports.default = ContextMenu;
    /**
     * @author
     */
    using("Controls.Button.Menu");
    var ContextMenu = Menu.extend({
        floating: true,
        setControl: function (ctrl) {
            ctrl.on('contextmenu', this.onContextMenu, this);
            return this;
        },
        onContextMenu: function (e) {
            this.showAt(e.pageX === undefined ? event.x : e.pageX, e.pageY === undefined ? event.y : e.pageY);
            e.stop();
        }
    });
});
//# sourceMappingURL=contextMenu.js.map