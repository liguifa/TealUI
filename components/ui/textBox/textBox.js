var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ui/control", "ui/input", "./textBox.scss"], function (require, exports, control_1, input_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个文本框。
     */
    class TextBox extends input_1.default {
        render() {
            return control_1.VNode.create("input", { type: "text", class: "x-textbox" });
        }
        /**
         * 全选当前控件。
         */
        select() {
            this.input.select();
        }
    }
    __decorate([
        control_1.bind("@input", "onSelect")
    ], TextBox.prototype, "onSelect", void 0);
    exports.default = TextBox;
    TextBox.prototype.statusClassPrefix = "x-textbox-";
    TextBox.prototype.validateEvent = "input";
});
//# sourceMappingURL=textBox.js.map