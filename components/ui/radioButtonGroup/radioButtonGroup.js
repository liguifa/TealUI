define(["require", "exports", "ui/checkBoxGroup"], function (require, exports, checkBoxGroup_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个单选按钮组。
     */
    class RadioButtonGroup extends checkBoxGroup_1.CheckBoxGroupBase {
        init() {
            if (!this.name)
                this.name = "_" + RadioButtonGroup._id++;
        }
        get value() {
            const item = this.inputs.find(input => input.value);
            return item ? item.key : null;
        }
        set value(value) {
            this.inputs.forEach(item => {
                item.value = item.key === value;
            });
        }
    }
    RadioButtonGroup._id = 0;
    exports.default = RadioButtonGroup;
});
//# sourceMappingURL=radioButtonGroup.js.map