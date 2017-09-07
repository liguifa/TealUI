define(["require", "exports", "control", "./balloonTip.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个泡泡提示。
     */
    class BalloonTip extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-balloontip" });
        }
    }
    exports.BalloonTip = BalloonTip;
    exports.default = BalloonTip;
    // #todo
    /**
     * @author xuld@vip.qq.com
     */
    typeof include === "function" && include("ui/tip/balloontip.css");
    typeof include === "function" && include("dom/pin.js");
    typeof include === "function" && include("ui/core/containercontrol.js");
    typeof include === "function" && include("ui/core/itooltip.js");
    /**
     * @class
     * @extends Control
     */
    var BalloonTip = ContainerControl.extend(IToolTip).implement({
        cssClass: 'x-balloontip'
    });
    ");";
    ;
});
//# sourceMappingURL=balloonTip.js.map