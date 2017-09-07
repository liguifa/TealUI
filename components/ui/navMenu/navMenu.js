var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ux/pin", "ui/control", "typo/icon/icon.scss", "./navMenu.scss"], function (require, exports, dom, pin_1, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个导航菜单。
     */
    class NavMenu extends control_1.default {
        render() {
            return control_1.VNode.create("nav", { class: "x-navmenu" });
        }
        init() {
            dom.on(this.elem, "click", "li", this.handleItemClick, this);
            dom.on(this.elem, "pointerenter", ".x-navmenu-body>li", this.handleItemPointerEnter, this);
            dom.on(this.elem, "pointerleave", ".x-navmenu-body>li", this.handleItemPointerLeave, this);
        }
        /**
         * 当前激活项。
         */
        get activeItem() {
            return dom.find(this.elem, ".x-navmenu-active");
        }
        set activeItem(value) {
            dom.query(this.elem, ".x-navmenu-active").forEach(elem => {
                dom.removeClass(elem, "x-navmenu-active");
            });
            if (value) {
                dom.addClass(value, "x-navmenu-active");
                while ((value = value.parentNode)) {
                    if (dom.hasClass(value, "x-navmenu-collapsable")) {
                        dom.removeClass(value, "x-navmenu-collapsed");
                        dom.addClass(value, "x-navmenu-active");
                    }
                }
            }
        }
        /**
         * 点击项事件。
         */
        handleItemClick(e, item) {
            this.activeItem = item;
            if (dom.hasClass(item, "x-navmenu-collapsable")) {
                if ((!this.collapsed || !dom.hasClass(item.parentNode, "x-navmenu-body"))) {
                    const collapse = !dom.hasClass(item, "x-navmenu-collapsed");
                    dom.toggle(dom.last(item), !collapse, "height", undefined, this.duration);
                    dom.toggleClass(item, "x-navmenu-collapsed", collapse);
                }
            }
            else if (this.onItemClick) {
                this.onItemClick(item, e);
                if (this.collapsed) {
                    const popover = this.find(".x-navmenu-popover");
                    if (popover) {
                        this.handleItemPointerLeave(e, this.activeItem = popover.parentNode);
                    }
                }
            }
        }
        toggleCollapse() {
            const show = this.collapsed;
            if (show) {
                const width = this.elem.offsetWidth;
                this.collapsed = false;
                const newWidth = this.elem.offsetWidth;
                dom.setStyle(this.elem, "width", width);
                dom.animate(this.elem, { width: newWidth }, () => {
                    dom.setStyle(this.elem, "width", "");
                }, this.duration);
            }
            else {
                this.collapsed = true;
                const width = this.elem.offsetWidth;
                this.collapsed = false;
                dom.animate(this.elem, { width: width }, () => {
                    dom.setStyle(this.elem, "width", "");
                    this.collapsed = true;
                }, this.duration);
            }
            dom.query(this.elem, ".x-navmenu-collapsable:not(.x-navmenu-collapsed)>ul").forEach(item => {
                dom.toggle(item, show, "height", () => {
                    item.style.display = "";
                }, this.duration);
            });
            this.onCollapseChange && this.onCollapseChange();
        }
        /**
         * 鼠标移入折叠项事件。
         */
        handleItemPointerEnter(e, item) {
            if (this.collapsed) {
                this.activeItem = item;
                if (dom.hasClass(item, "x-navmenu-collapsable")) {
                    const ul = dom.last(item);
                    dom.addClass(ul, "x-navmenu-popover");
                    dom.addClass(ul, "x-popover");
                    dom.show(ul, "opacity", undefined, this.duration);
                    pin_1.default(ul, dom.first(item), "rightTop", 1, document);
                }
            }
        }
        /**
         * 鼠标移出折叠项事件。
         */
        handleItemPointerLeave(e, item) {
            if (this.collapsed && dom.hasClass(item, "x-navmenu-collapsable")) {
                const ul = dom.last(item);
                dom.hide(ul, "opacity", () => {
                    dom.removeClass(ul, "x-navmenu-popover");
                    dom.removeClass(ul, "x-popover");
                }, this.duration);
            }
        }
    }
    __decorate([
        control_1.bind("")
    ], NavMenu.prototype, "body", void 0);
    __decorate([
        control_1.bind("", "class", "x-navmenu-mini")
    ], NavMenu.prototype, "collapsed", void 0);
    exports.default = NavMenu;
});
//# sourceMappingURL=navMenu.js.map