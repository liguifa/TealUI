define(["require", "exports", "ui/control", "./cityPicker.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个城市选择器。
     */
    class CityPicker extends control_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-citypicker" });
        }
    }
    exports.default = CityPicker;
});
//# sourceMappingURL=cityPicker.js.map