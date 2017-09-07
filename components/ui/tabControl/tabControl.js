define(["require", "exports", "control", "./tabControl.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个选项卡控件。
     */
    class TabControl extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-tabcontrol" });
        }
    }
    exports.TabControl = TabControl;
    exports.default = TabControl;
});
//# sourceMappingURL=tabControl.js.map