var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ux/drag", "ui/control", "typo/icon", "typo/close", "ui/panel", "./dialog.scss"], function (require, exports, dom, drag_1, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个对话框。
     */
    class Dialog extends control_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-dialog", style: "display: none" },
                control_1.VNode.create("section", { class: "x-panel" },
                    control_1.VNode.create("header", { class: "x-panel-header" },
                        control_1.VNode.create("button", { class: "x-close x-icon", title: "关闭", "aria-label": "关闭" }, "\u2716"),
                        control_1.VNode.create("h5", null)),
                    control_1.VNode.create("div", { class: "x-panel-body" })));
        }
        init() {
            const close = dom.find(this.header, ".x-close");
            if (close) {
                dom.on(close, "click", this.handleCloseClick, this);
            }
            this.draggable = true;
        }
        /**
         * 当点击关闭按钮后执行。
         */
        handleCloseClick() {
            this.close();
        }
        /**
         * 显示当前对话框。
         * @param target 显示的目标。
         */
        show(target) {
            if (target) {
                this.target = target;
            }
            else {
                target = this.target;
            }
            dom.ready(() => {
                if (!dom.contains(document.body, this.elem)) {
                    document.body.appendChild(this.elem);
                }
                if (this.hidden) {
                    dom.show(this.elem);
                    dom.show(this.find(".x-panel"), this.animation, undefined, this.duration, undefined, target);
                    dom.addClass(document.body, "x-dialog-open");
                }
            });
        }
        /**
         * 关闭当前对话框。
         * @param target 关闭的目标。
         */
        close(target) {
            if (target) {
                this.target = target;
            }
            else {
                target = this.target;
            }
            if (!this.onBeforeClose || this.onBeforeClose() !== false) {
                this.elem.style.backgroundColor = "transparent";
                dom.hide(this.find(".x-panel"), this.animation, () => {
                    this.elem.style.backgroundColor = "";
                    dom.removeClass(document.body, "x-dialog-open");
                    this.renderTo(null);
                    this.onClose && this.onClose();
                }, this.duration, undefined, target);
            }
        }
        /**
         * 是否可拖动。
         */
        get draggable() {
            return !!this._draggable;
        }
        set draggable(value) {
            dom.toggleClass(this.elem, "x-dialog-draggable", value);
            if (value) {
                if (this._draggable) {
                    this._draggable.enable();
                }
                else {
                    this._draggable = drag_1.default(this.find(".x-panel"), {
                        handle: this.find(".x-panel-header h5"),
                        onDragStart: () => {
                            if (!this._draggable.elem.style.margin) {
                                const rect = dom.getRect(this._draggable.elem);
                                this._draggable.elem.style.margin = "0";
                                dom.setRect(this._draggable.elem, rect);
                            }
                        }
                    });
                }
            }
            else if (this._draggable) {
                this._draggable.disable();
            }
        }
    }
    __decorate([
        control_1.bind(".x-panel-header")
    ], Dialog.prototype, "header", void 0);
    __decorate([
        control_1.bind(".x-panel-header h5", "innerHTML")
    ], Dialog.prototype, "title", void 0);
    __decorate([
        control_1.bind(".x-panel-header .x-close", "hidden")
    ], Dialog.prototype, "hideClose", void 0);
    __decorate([
        control_1.bind(".x-panel-body")
    ], Dialog.prototype, "body", void 0);
    __decorate([
        control_1.bind(".x-panel-body", "innerHTML")
    ], Dialog.prototype, "content", void 0);
    exports.default = Dialog;
    Dialog.prototype.animation = "scale";
});
//# sourceMappingURL=dialog.js.map