define(["require", "exports", "ui/control", "./palette.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个调色板。
     */
    class Palette extends control_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-palette" });
        }
    }
    exports.default = Palette;
});
//# sourceMappingURL=palette.js.map