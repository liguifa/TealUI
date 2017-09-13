define(["require", "exports", "ui/control", "ui/popup", "./toolTip.scss"], function (require, exports, control_1, popup_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个工具提示。
     */
    class ToolTip extends popup_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-tooltip", style: "display: none;" },
                control_1.VNode.create("span", { class: "x-arrow" }));
        }
    }
    exports.default = ToolTip;
    ToolTip.prototype.event = "hover";
    ToolTip.prototype.align = "top";
    ToolTip.prototype.animation = "zoomIn";
});
//# sourceMappingURL=toolTip.js.map