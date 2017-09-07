define(["require", "exports", "control", "./splitter.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个分割器。
     */
    class Splitter extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-splitter" });
        }
    }
    exports.Splitter = Splitter;
    exports.default = Splitter;
});
//# sourceMappingURL=splitter.js.map