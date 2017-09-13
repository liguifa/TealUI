define(["require", "exports", "ux/dom", "ux/pin"], function (require, exports, dom, pin_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个弹层。
     */
    class Popup {
        /**
         * 启用弹层。
         */
        enable() {
            if (!this._handle || this._handle1) {
                const target = this.target;
                let event = this.event;
                switch (event) {
                    case "click":
                    case "dblclick":
                    case "auxclick":
                    case "pointerdown":
                    case "pointerup":
                        dom.on(target, event, this._handle = () => {
                            this.toggle();
                        });
                        break;
                    case "pointermove":
                        this.align = "rr-bb";
                        dom.on(target, event, this._handle = (e) => {
                            this.pinTarget = {
                                x: e.pageX,
                                y: e.pageY,
                                width: 16,
                                height: 16
                            };
                            this.realign();
                        });
                    // fall through
                    case "pointerenter":
                    case "hover":
                        let showTimer;
                        let hideTimer;
                        const show = this._handle1 = (e) => {
                            if (hideTimer) {
                                clearTimeout(hideTimer);
                                hideTimer = 0;
                            }
                            else if (!showTimer) {
                                showTimer = setTimeout(() => {
                                    showTimer = 0;
                                    this.show();
                                }, this.delay);
                            }
                        };
                        const hide = this._handle2 = (e) => {
                            if (showTimer) {
                                clearTimeout(showTimer);
                                showTimer = 0;
                            }
                            else if (!hideTimer) {
                                hideTimer = setTimeout(() => {
                                    hideTimer = 0;
                                    this.hide();
                                }, this.delay);
                            }
                        };
                        dom.on(target, "pointerenter", show);
                        dom.on(target, "pointerleave", hide);
                        // pointerenter 事件在指针移到目标元素后不消失。
                        if (event === "pointerenter") {
                            dom.on(this.elem, "pointerenter", show);
                            dom.on(this.elem, "pointerleave", hide);
                        }
                        break;
                    case "focusin":
                        dom.on(target, event, this._handle = this.show, this);
                        break;
                    case "focus":
                        dom.on(target, "focus", this._handle1 = this.show, this);
                        dom.on(target, "blur", this._handle2 = this.hide, this);
                        break;
                    case "active":
                        dom.on(target, "pointerdown", this._handle1 = this.show, this);
                        dom.on(document, "pointerup", this._handle2 = this.hide, this);
                        break;
                    case "contextmenu":
                        this.align = "rr-bb";
                        dom.on(target, event, this._handle = (e) => {
                            if (e.which === 3) {
                                e.preventDefault();
                                this.pinTarget = {
                                    x: e.pageX,
                                    y: e.pageY,
                                    width: 1,
                                    height: 1
                                };
                                this.show();
                            }
                        });
                        break;
                }
            }
        }
        /**
         * 禁用弹层。
         */
        disable() {
            const target = this.target;
            let event = this.event;
            switch (event) {
                case "click":
                case "dblclick":
                case "auxclick":
                case "pointerdown":
                case "pointerup":
                case "contextmenu":
                    dom.off(target, event, this._handle);
                    delete this._handle;
                    break;
                case "pointermove":
                    dom.off(target, event, this._handle);
                    delete this._handle;
                // fall through
                case "pointerenter":
                case "hover":
                    dom.off(target, "pointerenter", this._handle1);
                    dom.off(target, "pointerleave", this._handle2);
                    if (event === "pointerenter") {
                        dom.off(this.elem, "pointerenter", this._handle1);
                        dom.off(this.elem, "pointerleave", this._handle2);
                    }
                    delete this._handle1;
                    delete this._handle2;
                    break;
                case "focusin":
                    dom.off(target, event, this._handle, this);
                    delete this._handle;
                    break;
                case "focus":
                    dom.off(target, "focus", this._handle1, this);
                    dom.off(target, "blur", this._handle2, this);
                    delete this._handle1;
                    delete this._handle2;
                    break;
                case "active":
                    dom.off(target, "pointerdown", this._handle1, this);
                    dom.off(document, "pointerup", this._handle2, this);
                    delete this._handle1;
                    delete this._handle2;
                    break;
            }
        }
        /**
         * 判断当前元素是否已隐藏。
         */
        get hidden() { return dom.isHidden(this.elem); }
        /**
         * 显示当前浮层。
         */
        show() {
            const toggle = this._toggle !== undefined ? this._toggle : !this.hidden;
            if (toggle !== true) {
                this._toggle = true;
                this.autoHide && dom.on(document, "pointerdown", this.handleDocumentPointerDown, this);
                this.autoScroll && dom.on(document, "scroll", this.handleDocumentScroll, this);
                this.onShow && this.onShow(this);
                if (this._toggle === true) {
                    dom.show(this.elem);
                    this.realign();
                    dom.show(this.elem, this.animation, () => {
                        delete this._toggle;
                    }, this.duration, this.timingFunction, this.target);
                }
            }
            else if (this._toggle === undefined) {
                this.realign();
            }
        }
        /**
         * 隐藏当前浮层。
         */
        hide() {
            const toggle = this._toggle !== undefined ? this._toggle : !this.hidden;
            if (toggle !== false) {
                this._toggle = false;
                dom.off(document, "pointerdown", this.handleDocumentPointerDown, this);
                dom.off(document, "scroll", this.handleDocumentScroll, this);
                this.onHide && this.onHide(this);
                if (this._toggle === false) {
                    dom.hide(this.elem, this.hideAnimation || this.animation, () => {
                        delete this._toggle;
                    }, this.hideDuration != undefined ? this.hideDuration : this.duration, this.hideTimingFunction || this.timingFunction, this.target);
                }
            }
        }
        /**
         * 切换显示或隐藏当前浮层。
         * @param value 如果为 true 则强制显示。如果为 false 则强制隐藏。
         */
        toggle(value = this.hidden) {
            value ? this.show() : this.hide();
        }
        /**
         * 处理文档指针按下事件。
         * @param e 事件参数。
         */
        handleDocumentPointerDown(e) {
            const target = e.target;
            if (!dom.contains(this.elem, target) && !dom.contains(this.target, target)) {
                this.hide();
            }
        }
        /**
         * 处理文档滚动事件。
         * @param e 事件参数。
         */
        handleDocumentScroll(e) {
            this.realign();
        }
        /**
         * 重新对齐浮层的位置。
         * @return 如果已重新定位则返回定位的结果。
         */
        realign() {
            if (this.align && !this.hidden) {
                const pinResult = pin_1.default(this.elem, this.pinTarget || this.target, this.align, this.margin, this.container === undefined ? this.target.ownerDocument : this.container, this.containerPadding, this.offset, this.resize);
                this.onAlign && this.onAlign(pinResult, this);
                return pinResult;
            }
        }
    }
    exports.Popup = Popup;
    Popup.prototype.event = "click";
    Popup.prototype.delay = 100;
    Popup.prototype.animation = "opacity";
    Popup.prototype.align = "bottomLeft";
    Popup.prototype.autoHide = Popup.prototype.autoScroll = true;
    /**
     * 创建一个弹层。
     * @param elem 弹层的元素。
     * @param options 弹层的选项。
     * @return 返回一个弹层对象。
     */
    function popup(elem, options) {
        const result = new Popup();
        result.elem = elem;
        Object.assign(result, options);
        result.target = result.target || dom.prev(elem);
        result.enable();
        return result;
    }
    exports.default = popup;
});
//# sourceMappingURL=popup.js.map