define(["require", "exports", "ui/control", "./shareTo.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个分享到。
     */
    class ShareTo extends control_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-shareto" });
        }
    }
    exports.default = ShareTo;
});
//# sourceMappingURL=shareTo.js.map