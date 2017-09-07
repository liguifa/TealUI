var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ui/control", "./button.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个按钮。
     */
    class Button extends control_1.default {
        render() {
            return control_1.VNode.create("button", { type: "button", class: "x-button" });
        }
    }
    __decorate([
        control_1.bind("")
    ], Button.prototype, "body", void 0);
    __decorate([
        control_1.bind("", "type")
    ], Button.prototype, "type", void 0);
    __decorate([
        control_1.bind("", "disabled")
    ], Button.prototype, "disabled", void 0);
    __decorate([
        control_1.bind("", "class", "x-button-active")
    ], Button.prototype, "active", void 0);
    exports.default = Button;
});
//# sourceMappingURL=button.js.map