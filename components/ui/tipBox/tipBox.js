var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ui/control", "ui/input", "typo/icon", "typo/close", "./tipBox.scss"], function (require, exports, dom_1, control_1, input_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个提示框。
     */
    class TipBox extends control_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-tipbox" },
                control_1.VNode.create("button", { class: "x-close x-icon", title: "关闭", "aria-label": "关闭" }, "\u2716"),
                control_1.VNode.create("span", { class: "x-tipbox-body" }));
        }
        /**
         * 关闭当前提示框。
         */
        close() { dom_1.hide(this.elem, "height", this.duration); }
        get state() {
            return input_1.getState(this.elem, "x-textbox-");
        }
        set state(value) {
            input_1.setState(this.elem, "x-textbox-", value);
        }
    }
    __decorate([
        control_1.bind(".x-tipbox-body")
    ], TipBox.prototype, "body", void 0);
    exports.default = TipBox;
});
//# sourceMappingURL=tipBox.js.map