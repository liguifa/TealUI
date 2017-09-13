var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ux/popup", "ui/control", "typo/arrow", "./popup.scss"], function (require, exports, dom, popup_1, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个弹层。
     */
    class Popup extends control_1.default {
        /**
         * 触发弹层显示的元素。
         */
        get target() {
            return control_1.data(this).target;
        }
        set target(value) {
            const old = this.target;
            if (old !== value) {
                if (old) {
                    popup_1.Popup.prototype.disable.call(this);
                }
                control_1.data(this).target = value;
                if (value) {
                    popup_1.Popup.prototype.enable.call(this);
                }
            }
        }
        /**
         * 是否禁用弹窗效果。
         */
        get disabled() {
            return control_1.data(this).disabled;
        }
        set disabled(value) {
            control_1.data(this).disabled = value;
            popup_1.Popup.prototype[value ? "disable" : "enable"].call(this);
        }
        /**
         * 是否显示箭头。
         */
        get arrow() {
            return !!dom.first(this.elem, ".x-arrow");
        }
        set arrow(value) {
            let arrow = dom.first(this.elem, ".x-arrow");
            if (value) {
                if (!arrow) {
                    dom.prepend(this.elem, `<span class="x-arrow"/>`);
                }
            }
            else {
                dom.remove(arrow);
            }
        }
        render() {
            return control_1.VNode.create("div", { class: "x-popup", style: "display: none" });
        }
        layout() {
            let prev = dom.prev(this.elem);
            while (prev && control_1.from(prev) instanceof Popup) {
                prev = dom.prev(prev);
            }
            this.target = prev;
        }
        /**
         * 显示当前弹层。
         */
        show() {
            dom.ready(() => {
                if (!dom.contains(document.body, this.elem)) {
                    document.body.appendChild(this.elem);
                }
                popup_1.Popup.prototype.show.call(this);
            });
        }
        /**
         * 隐藏当前弹层。
         */
        hide() {
            popup_1.Popup.prototype.hide.call(this);
        }
        /**
         * 切换显示或隐藏当前弹层。
         * @param value 如果为 true 则强制显示。如果为 false 则强制隐藏。
         */
        toggle(value) {
            popup_1.Popup.prototype.toggle.call(this, value);
        }
        /**
         * 重新对齐弹层的位置。
         */
        realign() {
            const arrow = dom.last(this.elem, ".x-arrow");
            if (arrow && this.margin == undefined) {
                this.margin = arrow.offsetHeight / 2 + 2;
            }
            const pinResult = popup_1.Popup.prototype.realign.call(this);
            // 根据定位的结果更新箭头。
            if (pinResult && arrow) {
                arrow.className = "x-arrow";
                switch (pinResult.align) {
                    case "lr-tt":
                    case "lr-bb":
                    case "cc-tt":
                    case "cc-bb":
                    case "rl-tt":
                    case "rl-bb":
                        if (!pinResult.transformY) {
                            const arrowSize = arrow.offsetWidth / 2;
                            const arrowPos = pinResult.target.x + pinResult.target.width / 2 - pinResult.x;
                            if (arrowPos >= arrowSize && arrowPos <= pinResult.width - arrowSize) {
                                arrow.className += ` x-arrow-${(pinResult.align.charAt(4) === "t") !== !!pinResult.rotateY ? "bottom" : "top"}`;
                                arrow.style.left = arrowPos + (this.arrowOffset ? this.arrowOffset < 1 ? pinResult.target.width * this.arrowOffset : this.arrowOffset : 0) + "px";
                            }
                        }
                        break;
                    case "ll-tb":
                    case "ll-cc":
                    case "ll-bt":
                    case "rr-tb":
                    case "rr-cc":
                    case "rr-bt":
                        if (!pinResult.transformX) {
                            const arrowSize = arrow.offsetHeight / 2;
                            const arrowPos = pinResult.target.y + pinResult.target.height / 2 - pinResult.y;
                            if (arrowPos >= arrowSize && arrowPos <= pinResult.height - arrowSize) {
                                arrow.className += ` x-arrow-${(pinResult.align.charAt(0) === "l") !== !!pinResult.rotateX ? "right" : "left"}`;
                                arrow.style.top = arrowPos + (this.arrowOffset ? this.arrowOffset < 1 ? pinResult.target.height * this.arrowOffset : this.arrowOffset : 0) + "px";
                            }
                        }
                        break;
                }
            }
            return pinResult;
        }
        /**
         * 处理文档指针按下事件。
         * @param e 事件参数。
         */
        handleDocumentPointerDown(e) {
            popup_1.Popup.prototype.handleDocumentPointerDown.call(this, e);
        }
        /**
         * 处理文档滚动事件。
         * @param e 事件参数。
         */
        handleDocumentScroll(e) {
            popup_1.Popup.prototype.handleDocumentScroll.call(this, e);
        }
        /**
         * 创建一个弹层。
         * @param elem 要弹出的元素或控件。
         * @param target 触发弹层显示的元素或控件。
         * @param event 触发弹层显示的事件。
         * @param align 显示弹层时使用的动画。如果为 null 则保留默认位置。
         * @param arrow 是否显示箭头。
         * @param animation 显示弹层时使用的动画。
         * @return 返回创建的弹层对象。
         */
        static create(elem, target, event, align, arrow, animation) {
            if (elem instanceof control_1.default) {
                elem = elem.elem;
            }
            dom.addClass(elem, "x-popup");
            dom.hide(elem);
            const result = new this();
            if (event)
                result.event = event;
            if (align)
                result.align = align;
            if (arrow)
                result.arrow = arrow;
            if (animation)
                result.animation = animation;
            result.elem = elem;
            result.target = target instanceof control_1.default ? target.elem : target;
            return result;
        }
    }
    __decorate([
        control_1.bind("")
    ], Popup.prototype, "body", void 0);
    exports.default = Popup;
    Popup.prototype.event = popup_1.Popup.prototype.event;
    Popup.prototype.delay = popup_1.Popup.prototype.delay;
    Popup.prototype.autoHide = popup_1.Popup.prototype.autoHide;
    Popup.prototype.autoScroll = popup_1.Popup.prototype.autoScroll;
    Popup.prototype.animation = popup_1.Popup.prototype.animation;
    Popup.prototype.align = popup_1.Popup.prototype.align;
});
//# sourceMappingURL=popup.js.map