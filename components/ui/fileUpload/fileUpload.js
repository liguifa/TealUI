define(["require", "exports", "control", "./fileUpload.scss", "./fileUpload.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个文件上传域。
     */
    class FileUpload extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-fileupload" });
        }
    }
    exports.FileUpload = FileUpload;
    exports.default = FileUpload;
    /**
     * 表示一个文件上传域。
     */
    class FileUpload extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-fileupload" });
        }
    }
    exports.FileUpload = FileUpload;
    exports.default = FileUpload;
    /**
     * @author xuld@vip.qq.com
     */
    typeof include === "function" && include("../form/button");
    typeof include === "function" && include("../core/base");
    control_1.Control.extend({
        role: 'fileupload',
        init: function () {
            var dom = this.dom;
            dom.find('[type=file]').on('change', function () {
                var textBox = dom.next('[type=text]');
                if (!textBox.length) {
                    textBox = dom.prev('[type=text]');
                }
                textBox.text(this.value);
            });
        }
    });
});
//# sourceMappingURL=fileUpload.js.map