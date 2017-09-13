define(["require", "exports", "ux/dom", "ui/comboBox"], function (require, exports, dom, comboBox_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个选择框。
     */
    class Select extends comboBox_1.ComboBoxBase {
        get readOnly() {
            return this.input.readOnly && this.button.disabled;
        }
        set readOnly(value) {
            this.button.disabled = this.input.readOnly = value;
            dom.toggleClass(this.elem, "x-picker-readonly", value);
        }
        /**
         * 是否允许用户输入。
         */
        get canInput() {
            return !dom.hasClass(this.elem, "x-picker-select");
        }
        set canInput(value) {
            dom.toggleClass(this.elem, "x-picker-select", !value);
            this.input.readOnly = !value;
        }
        init() {
            super.init();
            dom.on(this.input, "click", this.dropDown.show, this.dropDown);
        }
        get value() {
            const value = this.input.value;
            const item = this.menu.findItemByContent(value);
            if (item) {
                return item.key;
            }
            return value;
        }
        set value(value) {
            const item = this.menu.selectedItem = this.menu.findItemByKey(value);
            if (item) {
                value = item.content;
            }
            this.menu.value = value;
        }
        handleMenuSelect(item, e) {
            this.input.value = item.content;
            this.dropDown.hide();
            this.onChange && this.onChange(e, this);
        }
    }
    exports.default = Select;
});
//# sourceMappingURL=select.js.map