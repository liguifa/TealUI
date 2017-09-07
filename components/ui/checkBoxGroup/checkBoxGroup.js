var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ui/control", "./checkBoxGroup.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个复选框组基类。
     */
    class CheckBoxGroupBase extends control_1.default {
        /**
         * 获取所有按钮。
         */
        get inputs() { return this.query("input[type=checkbox],input[type=radio]"); }
        /**
         * 组名称。
         */
        get name() {
            return (this.inputs[0] || 0).name;
        }
        set name(value) {
            this.inputs.forEach(input => { input.name = value; });
        }
        /**
         * 是否禁用。
         */
        get disabled() {
            return (this.inputs[0] || 0).disabled;
        }
        set disabled(value) {
            this.inputs.forEach(input => { input.disabled = value; });
        }
        /**
         * 是否只读。
         */
        get readOnly() {
            return (this.inputs[0] || 0).readOnly;
        }
        set readOnly(value) {
            this.inputs.forEach(input => { input.readOnly = value; });
        }
    }
    __decorate([
        control_1.bind("")
    ], CheckBoxGroupBase.prototype, "body", void 0);
    exports.CheckBoxGroupBase = CheckBoxGroupBase;
    /**
     * 表示一个复选框组。
     */
    class CheckBoxGroup extends CheckBoxGroupBase {
        get value() {
            return this.inputs.filter(input => input.value).map(input => input.key);
        }
        set value(value) {
            for (const input of this.inputs) {
                input.value = value.indexOf(input.key) >= 0;
            }
        }
    }
    exports.default = CheckBoxGroup;
});
//# sourceMappingURL=checkBoxGroup.js.map