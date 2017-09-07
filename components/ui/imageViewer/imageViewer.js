define(["require", "exports", "control", "./imageViewer.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个图片查看器。
     */
    class ImageViewer extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-imageviewer" });
        }
    }
    exports.ImageViewer = ImageViewer;
    exports.default = ImageViewer;
    // #todo
    /**
     * @author xuld@vip.qq.com
     */
    typeof include === "function" && include("dom/imagezoom.css");
    typeof include === "function" && include("dom/dom.js");
    Dom.imageZoom = function (elem, getUrlCallback) {
        Dom.addClass(elem, 'x-imagezoom-small');
        Dom.on(elem, 'click', function (e) {
            var oldState, data = Dom.data(this);
            if (Dom.hasClass(this, 'x-imagezoom-small')) {
                Dom.removeClass(this, 'x-imagezoom-small');
                Dom.addClass(this, 'x-imagezoom-large');
                if (getUrlCallback) {
                    data.imageZoomSrc = this.src;
                    this.src = getUrlCallback(this.src);
                }
                else {
                    data.imageZoomWidth = Dom.getWidth(this);
                    data.imageZoomHeight = Dom.getHeight(this);
                    this.style.width = this.style.height = 'auto';
                }
            }
            else {
                Dom.addClass(this, 'x-imagezoom-small');
                Dom.removeClass(this, 'x-imagezoom-large');
                if (getUrlCallback) {
                    this.src = data.imageZoomSrc;
                }
                else {
                    Dom.setWidth(this, data.imageZoomWidth);
                    Dom.setHeight(this, data.imageZoomHeight);
                }
            }
        });
    };
    Dom.prototype.imageZoom = function () {
        return;
    };
});
//# sourceMappingURL=imageViewer.js.map