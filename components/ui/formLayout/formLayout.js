define(["require", "exports", "ui/control", "./formLayout.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个表单布局。
     */
    class FormLayout extends control_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-formlayout" });
        }
    }
    exports.default = FormLayout;
});
//# sourceMappingURL=formLayout.js.map