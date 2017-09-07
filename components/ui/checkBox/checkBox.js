var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ui/control", "ui/input", "typo/icon/icon.scss", "./checkBox.scss"], function (require, exports, dom, control_1, input_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个复选框组基类。
     */
    class CheckBoxBase extends input_1.default {
        /**
         * 是否选中。
         */
        get value() { return this.input.checked; }
        set value(value) {
            this.input.checked = value;
            if (this.defaultValue === undefined) {
                this.defaultValue = value;
            }
        }
    }
    __decorate([
        control_1.bind("")
    ], CheckBoxBase.prototype, "body", void 0);
    __decorate([
        control_1.bind("@input", "value")
    ], CheckBoxBase.prototype, "key", void 0);
    exports.CheckBoxBase = CheckBoxBase;
    /**
     * 表示一个复选框。
     */
    class CheckBox extends CheckBoxBase {
        render() {
            return control_1.VNode.create("label", { class: "x-checkbox" },
                control_1.VNode.create("input", { type: "checkbox", class: "x-checkbox-button", __control__: this }),
                control_1.VNode.create("i", { class: "x-icon" }, "\u2610"),
                control_1.VNode.create("i", { class: "x-icon" }, "\u2611"),
                "\u00A0");
        }
        /**
         * 是否启用第三状态。
         */
        get threeState() {
            return this.find(".x-icon").innerHTML === this.threeStateIcon;
        }
        set threeState(value) {
            const icon = this.find(".x-icon");
            if (value) {
                this.value = false;
                icon._innerHTML = icon.innerHTML;
                icon.innerHTML = this.threeStateIcon;
                dom.on(this.input, "change", this.offThreeState, this);
            }
            else {
                icon.innerHTML = icon._innerHTML;
                dom.off(this.input, "change", this.offThreeState, this);
            }
        }
        offThreeState() {
            this.threeState = false;
        }
    }
    exports.default = CheckBox;
    CheckBox.prototype.threeStateIcon = "⊞";
});
//# sourceMappingURL=checkBox.js.map