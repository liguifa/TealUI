define(["require", "exports", "ui/control", "./emailSuggest.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个邮箱提示。
     */
    class EmailSuggest extends control_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-emailsuggest" });
        }
    }
    exports.default = EmailSuggest;
});
//# sourceMappingURL=emailSuggest.js.map