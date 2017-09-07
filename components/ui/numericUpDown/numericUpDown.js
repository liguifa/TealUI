define(["require", "exports", "control", "./numericUpDown.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个数字输入框。
     */
    class NumericUpDown extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-numericupdown" });
        }
    }
    exports.NumericUpDown = NumericUpDown;
    exports.default = NumericUpDown;
    /**
     * @author xuld@vip.qq.com
     */
    typeof include === "function" && include("ui/suggest/updown.js");
    var NumericUpDown = UpDown.extend({
        step: 1,
        onUpDown: function (delta) {
            this.elem.querySelector('input').value = (+this.elem.querySelector('input').value || 0) + delta * this.step;
        }
    });
});
//# sourceMappingURL=numericUpDown.js.map