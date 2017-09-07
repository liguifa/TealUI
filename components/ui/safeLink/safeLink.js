define(["require", "exports", "control", "./safeLink.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个安全按钮。
     */
    class SafeLink extends control_1.Control {
        /**
         * 当被子类重写时负责渲染当前控件。
         * @return 返回一个虚拟节点。
         */
        render() {
            return control_1.VNode.create("div", { class: "x-safelink" });
        }
    }
    exports.SafeLink = SafeLink;
    exports.default = SafeLink;
    /**
     * @author
     */
    imports("Controls.Button.SafeAnchor");
    var SafeAnthor = control_1.Control.extend({
        tpl: '<div class="x-safeanchor">\
		<div class="x-safeanchor-header">\
			<a href="#" class="x-safeanchor-link">继续访问</a>\
			<a href="javascript:;" class="x-safeanchor-cancel">取消</a>\
		</div>\
		<div class="x-safeanchor-body">\
			<div class="x-safeanchor-content">\
				 该链接已超出本站范围，可能有一定风险。     原网址为：<span class="x-safeanchor-text"></span>\
			</div>\
		</div>\
	</div>',
        setHref: function (href, target) {
            this.find('.x-safeanchor-link').node.href = href;
            this.find('.x-safeanchor-link').node.target = target;
            this.find('.x-safeanchor-text').setText(href);
            this.on('click', this.close, this);
            return this;
        },
        showBy: function (elem) {
            elem = Dom.get(elem);
            this.appendTo();
            var pos = elem.getPosition();
            pos.y += elem.getSize().y;
            pos.x -= 10;
            pos.y += 10;
            this.setPosition(pos);
        },
        close: function () {
            this.remove();
        }
    });
    // #todo
    /**
     * @author
     */
    typeof include === "function" && include("ui/button/safeanchor.css");
    var SafeAnthor = control_1.Control.extend({
        tpl: '<div class="x-safeanchor">\
		<div class="x-safeanchor-header">\
			<a href="#" class="x-safeanchor-link">继续访问</a>\
			<a href="javascript:;" class="x-safeanchor-cancel">取消</a>\
		</div>\
		<div class="x-safeanchor-body">\
			<div class="x-safeanchor-content">\
				 该链接已超出本站范围，可能有一定风险。     原网址为：<span class="x-safeanchor-text"></span>\
			</div>\
		</div>\
	</div>',
        setHref: function (href, target) {
            this.find('.x-safeanchor-link').node.href = href;
            this.find('.x-safeanchor-link').node.target = target;
            this.find('.x-safeanchor-text').setText(href);
            this.on('click', this.close, this);
            return this;
        },
        showBy: function (elem) {
            elem = Dom.get(elem);
            this.appendTo();
            var pos = elem.getPosition();
            pos.y += elem.getSize().y;
            pos.x -= 10;
            pos.y += 10;
            this.setPosition(pos);
        },
        close: function () {
            this.remove();
        }
    });
});
// 
// Dom.ready(function(){
// 	
// document.on('click', function(e){
// var t = e.getTarget();
// if(t.hasClass('h-link')){
// new SafeAnthor().setHref(t.node.href, t.node.target).showBy(t);
// e.stop();
// }
// });
// 	
// 	
// 
// });
// 
// Dom.ready(function(){
// 	
// document.on('click', function(e){
// var t = e.getTarget();
// if(t.hasClass('h-link')){
// new SafeAnthor().setHref(t.node.href, t.node.target).showBy(t);
// e.stop();
// }
// });
// 	
// 	
// 
// }); 
//# sourceMappingURL=safeLink.js.map