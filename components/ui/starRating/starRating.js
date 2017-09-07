define(["require", "exports", "control", "./starRating.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个星级评分。
     */
    class StarRating extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-starrating" });
        }
    }
    exports.StarRating = StarRating;
    exports.default = StarRating;
});
//# sourceMappingURL=starRating.js.map