var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ui/control", "ui/input", "ux/popup", "ui/textBox/textBox.scss", "ui/button/button.scss", "./picker.scss"], function (require, exports, dom, control_1, input_1, popup_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个填选器。
     */
    class Picker extends input_1.default {
        render() {
            return control_1.VNode.create("span", { class: "x-picker" },
                control_1.VNode.create("input", { type: "text", class: "x-textbox", autocomplete: "off" }),
                control_1.VNode.create("button", { type: "button", class: "x-button", tabIndex: -1 },
                    control_1.VNode.create("i", { class: "x-icon" }, "\u2B9F")));
        }
        get disabled() {
            return this.input.disabled && this.button.disabled;
        }
        set disabled(value) {
            this.button.disabled = this.input.disabled = value;
        }
        get readOnly() {
            return this.input.readOnly && this.button.disabled;
        }
        set readOnly(value) {
            this.button.disabled = this.input.readOnly = value;
        }
        /**
         * 下拉菜单控件。
         */
        get menu() {
            let menu = this._menu;
            if (!menu) {
                this._menu = menu = this.createMenu();
                menu.renderTo(this.elem);
                dom.addClass(menu.elem, "x-popup");
                this.menu = menu;
            }
            return this._menu;
        }
        set menu(value) {
            this._menu = Object.assign(value, this.menuOptions);
            if (this.resizeMode === "fitDropDown") {
                dom.show(value.elem);
                dom.setRect(this.elem, { width: dom.getRect(value.elem).width });
            }
            dom.hide(value.elem);
        }
        get body() { return this.menu.body; }
        /**
         * 下拉菜单。
         */
        get dropDown() {
            let dropDown = this._dropDown;
            if (!dropDown) {
                dropDown = new popup_1.Popup();
                dropDown.elem = this.menu.elem;
                dropDown.target = this.input;
                dropDown.pinTarget = this.elem;
                dropDown.align = "bottomLeft";
                dropDown.event = "focusin";
                dropDown.animation = "scaleY";
                this.dropDown = dropDown;
            }
            return dropDown;
        }
        set dropDown(value) {
            this._dropDown = value;
            value.onShow = this.handleDropDownShow.bind(this);
            value.onHide = this.handleDropDownHide.bind(this);
            Object.assign(value, this.dropDownOptions);
        }
        init() {
            super.init();
            // 初始化下拉效果。
            this.dropDown.enable();
            // 初始化按钮。
            dom.on(this.button, "click", this.input.select, this.input);
            dom.on(this.input, "input", this.handleInput, this);
        }
        /**
         * 当被子类重写时负责创建下拉菜单。
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
            this.onDropDownShow && this.onDropDownShow(this);
        }
        /**
         * 处理下拉菜单隐藏事件。
         */
        handleDropDownHide() {
            this.onDropDownHide && this.onDropDownHide(this);
        }
        /**
         * 处理输入事件。
         */
        handleInput() {
            if (!this.dropDown.hidden) {
                this.updateMenu();
            }
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