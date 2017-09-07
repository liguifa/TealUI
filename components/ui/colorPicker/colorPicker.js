define(["require", "exports", "ui/control", "./colorPicker.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个颜色选择器。
     */
    class ColorPicker extends control_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-colorpicker" });
        }
    }
    exports.default = ColorPicker;
});
//# sourceMappingURL=colorPicker.js.map