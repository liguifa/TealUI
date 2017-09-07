var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ui/control", "ui/input", "ux/popup", "ux/status", "ui/textBox/textBox.scss", "ui/button/button.scss", "./picker.scss"], function (require, exports, dom, control_1, input_1, popup_1, status_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个填选器。
     */
    class Picker extends input_1.default {
        constructor() {
            super(...arguments);
            /**
             * 下拉菜单。
             */
            this.dropDown = new popup_1.Popup();
        }
        render() {
            return control_1.VNode.create("span", { class: "x-picker" },
                control_1.VNode.create("input", { type: "text", class: "x-textbox", autocomplete: "off" }),
                control_1.VNode.create("button", { type: "button", class: "x-button", tabIndex: -1 },
                    control_1.VNode.create("i", { class: "x-icon" }, "\u2B9F")));
        }
        get status() {
            return status_1.getStatus(this.input, this.statusClassPrefix);
        }
        set status(value) {
            status_1.setStatus(this.input, this.statusClassPrefix, value);
        }
        get disabled() {
            return this.input.disabled;
        }
        set disabled(value) {
            this.button.disabled = this.input.disabled = value;
        }
        get readOnly() {
            return this.input.readOnly && this.button.disabled;
        }
        set readOnly(value) {
            this.button.disabled = this.input.readOnly = value;
            dom.toggleClass(this.elem, "x-picker-readonly", value);
        }
        /**
         * 是否允许用户输入。
         */
        get canInput() {
            return !dom.hasClass(this.elem, "x-picker-select");
        }
        set canInput(value) {
            dom.toggleClass(this.elem, "x-picker-select", !value);
            this.input.readOnly = !value;
        }
        /**
         * 是否允许用户选择。
         */
        get canSelect() {
            return !dom.isHidden(this.button);
        }
        set canSelect(value) {
            dom.toggle(this.button, !value);
        }
        init() {
            super.init();
            this.menu.renderTo(this.elem);
            dom.addClass(this.menu.elem, "x-popup");
            if (this.resizeMode === "fitDropDown") {
                dom.setRect(this.elem, { width: dom.getRect(this.menu.elem).width });
            }
            dom.hide(this.menu.elem);
            const dropDown = this.dropDown;
            dropDown.elem = this.menu.elem;
            dropDown.target = this.button;
            dropDown.pinTarget = this.elem;
            dropDown.align = "bottomLeft";
            dropDown.event = "click";
            dropDown.onShow = () => {
                this.handleDropDownShow();
            };
            dropDown.onHide = () => {
                this.handleDropDownHide();
            };
            Object.assign(dropDown, this.dropDownOptions);
            dropDown.enable();
            dom.on(this.button, "click", this.input.focus, this.input);
        }
        /**
         * 当被子类重写时负责创建一个下拉菜单。
         */
        createMenu() {
            return new control_1.default();
        }
        /**
         * 当被子类重写时负责更新下拉菜单的值。
         */
        updateMenu() { }
        /**
         * 处理下拉菜单显示事件。
         */
        handleDropDownShow() {
            if (this.disabled || this.readOnly) {
                this.dropDown.hide();
                return;
            }
            this.updateMenu();
            if (this.resizeMode !== "fitDropDown") {
                const elemWidth = dom.getRect(this.elem).width;
                if (this.resizeMode === "fitInput" || dom.getRect(this.dropDown.elem).width < elemWidth) {
                    dom.setRect(this.dropDown.elem, { width: elemWidth });
                }
            }
            this.dropDown.realign();
            this.onDropDownShow && this.onDropDownShow(this);
        }
        /**
         * 处理下拉菜单隐藏事件。
         */
        handleDropDownHide() {
            this.onDropDownHide && this.onDropDownHide(this);
        }
    }
    __decorate([
        control_1.bind(".x-button")
    ], Picker.prototype, "button", void 0);
    __decorate([
        control_1.bind(".x-button .x-icon", "innerHTML")
    ], Picker.prototype, "icon", void 0);
    exports.default = Picker;
    Picker.prototype.statusClassPrefix = "x-textbox-";
    Picker.prototype.resizeMode = "auto";
    Picker.prototype.validateEvent = "input";
});
//# sourceMappingURL=picker.js.map