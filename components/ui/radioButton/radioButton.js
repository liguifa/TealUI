define(["require", "exports", "ui/control", "ui/checkBox"], function (require, exports, control_1, checkBox_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个单选按钮。
     */
    class RadioButton extends checkBox_1.CheckBoxBase {
        render() {
            return control_1.VNode.create("label", { class: "x-checkbox x-radiobutton" },
                control_1.VNode.create("input", { type: "radio", class: "x-checkbox-button", __control__: this }),
                control_1.VNode.create("i", { class: "x-icon" }, "\u25EF"),
                control_1.VNode.create("i", { class: "x-icon" }, "\uD83D\uDDB8"),
                "\u00A0");
        }
    }
    exports.default = RadioButton;
});
//# sourceMappingURL=radioButton.js.map