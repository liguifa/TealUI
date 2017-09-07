define(["require", "exports", "ui/control", "./codeEditor.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个codeEditor。
     */
    class CodeEditor extends control_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-codeeditor" });
        }
    }
    exports.default = CodeEditor;
});
//# sourceMappingURL=codeEditor.js.map