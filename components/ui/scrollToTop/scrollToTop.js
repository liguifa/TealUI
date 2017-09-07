define(["require", "exports", "control", "./scrollToTop.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个滚到顶部。
     */
    class ScrollToTop extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-scrolltotop" });
        }
    }
    exports.ScrollToTop = ScrollToTop;
    exports.default = ScrollToTop;
    // #todo
    /**
     * @author xuld@vip.qq.com
     */
    typeof include === "function" && include("../control/base");
    typeof include === "function" && include("../dom/animate");
    typeof include === "function" && include("../dom/scrollTo");
    typeof include === "function" && include("../dom/rect");
    control_1.Control.extend({
        role: "scrollToTop",
        scrollDuration: 100,
        minScroll: 130,
        init: function () {
            var me = this;
            window.addEventListener('scroll', function () {
                var isHidden = me.dom.isHidden();
                if (Dom(document).scroll().top > me.minScroll) {
                    isHidden && me.dom.show('opacity', null, me.duration);
                }
                else {
                    !isHidden && me.dom.hide('opacity', null, me.duration);
                }
            }, false);
            me.dom.on('click', function (e) {
                e.preventDefault();
                Dom(document).scrollTo(null, 0, me.scrollDuration);
            });
        }
    });
});
//# sourceMappingURL=scrollToTop.js.map