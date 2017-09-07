define(["require", "exports", "control", "./upDown.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个调节器。
     */
    class UpDown extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-updown" });
        }
    }
    exports.UpDown = UpDown;
    exports.default = UpDown;
    /**
     * @author xuld@vip.qq.com
     */
    typeof include === "function" && include("../dom/keyNav");
    typeof include === "function" && include("../control/base");
    var UpDown = control_1.Control.extend({
        changeSpeed: 90,
        holdDuration: 600,
        init: function (options) {
            var me = this;
            bindEvent('up', -1);
            bindEvent('down', 1);
            this.elem.keyNav({
                up: function () {
                    me.onUpDown(-1);
                },
                down: function () {
                    me.onUpDown(1);
                }
            });
            function bindEvent(d, delta) {
                d = me.elem.querySelector('.x-updown-' + d);
                d.onmousedown = function () {
                    me.onUpDown(delta);
                    if (me.timer)
                        clearInterval(me.timer);
                    me.timer = setTimeout(function () {
                        me.timer = setInterval(function () { me.onUpDown(delta); }, me.changeSpeed);
                    }, me.holdDuration);
                };
                d.onmouseout = d.onmouseup = function () {
                    clearTimeout(me.timer);
                    clearInterval(me.timer);
                    me.timer = 0;
                };
            }
        },
        onUpDown: function (delta) { }
    });
});
//# sourceMappingURL=upDown.js.map