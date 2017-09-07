define(["require", "exports", "ui/control", "./timePicker.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个时间选择器。
     */
    class TimePicker extends control_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-timepicker" });
        }
    }
    exports.default = TimePicker;
});
//# sourceMappingURL=timePicker.js.map