var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ui/control", "typo/icon/icon.scss", "./panel.scss"], function (require, exports, dom, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个面板。
     */
    class Panel extends control_1.default {
        render() {
            return control_1.VNode.create("section", { class: "x-panel" },
                control_1.VNode.create("header", { class: "x-panel-header" },
                    control_1.VNode.create("h5", null)),
                control_1.VNode.create("div", { class: "x-panel-body" }));
        }
        /**
         * 是否可折叠。
         */
        get collapsable() {
            return dom.hasClass(this.elem, "x-panel-collapsable");
        }
        set collapsable(value) {
            if (value !== this.collapsable) {
                dom.toggleClass(this.elem, "x-panel-collapsable", value);
                if (value) {
                    dom.on(this.header, "click", this.handleHeaderClick, this);
                }
                else {
                    dom.off(this.header, "click", this.handleHeaderClick, this);
                }
            }
        }
        /**
         * 处理标题点击事件。
         */
        handleHeaderClick() {
            this.toggleCollapse();
        }
        /**
         * 切换面板的折叠状态。
         * @param value 如果为 true 则强制折叠；如果为 false 则强制展开。
         */
        toggleCollapse(value = !this.collapsed) {
            if (value !== this.collapsed && (!this.onCollapseChange || this.onCollapseChange(value, this) !== false)) {
                dom.addClass(this.elem, "x-panel-collapsing");
                this.collapsed = value;
                dom.toggle(this.body, !value, "height", () => {
                    dom.removeClass(this.elem, "x-panel-collapsing");
                    if (value) {
                        this.body.style.display = "";
                    }
                }, this.duration);
            }
        }
    }
    __decorate([
        control_1.bind(".x-panel-header")
    ], Panel.prototype, "header", void 0);
    __decorate([
        control_1.bind(".x-panel-body")
    ], Panel.prototype, "body", void 0);
    __decorate([
        control_1.bind(".x-panel-header h5", "innerHTML")
    ], Panel.prototype, "title", void 0);
    __decorate([
        control_1.bind("", "class", "x-panel-collapsed")
    ], Panel.prototype, "collapsed", void 0);
    exports.default = Panel;
});
//# sourceMappingURL=panel.js.map