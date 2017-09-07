define(["require", "exports", "ux/dom", "ux/scroll", "ux/keyPress", "ui/control", "ui/picker", "ui/listBox", "typo/icon"], function (require, exports, dom, scroll_1, keyPress_1, control_1, picker_1, listBox_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个组合框基类。
     */
    class ComboBoxBase extends picker_1.default {
        constructor() {
            super(...arguments);
            this.menu = new listBox_1.default();
        }
        get body() {
            return this.menu.body;
        }
        init() {
            super.init();
            dom.on(this.menu.body, "pointermove", "li", (e, item) => {
                this.menu.selectedItem = control_1.from(item);
            });
            this.menu.onSelect = (item, e) => {
                if (!e._ignore) {
                    this.handleMenuSelect(item, e);
                }
            };
            const mappings = this.menu.keyMappings();
            keyPress_1.default(this.input, {
                up: (e) => {
                    if (this.dropDown.hidden) {
                        this.dropDown.show();
                    }
                    else {
                        e._ignore = true;
                        mappings.up(e);
                    }
                },
                down: (e) => {
                    if (this.dropDown.hidden) {
                        this.dropDown.show();
                    }
                    else {
                        e._ignore = true;
                        mappings.down(e);
                    }
                },
                enter: (e) => {
                    if (this.dropDown.hidden) {
                        return true;
                    }
                    const item = this.menu.selectedItem;
                    if (item)
                        this.menu.onSelect(item, e, this.menu);
                }
            });
        }
        /**
         * 处理项选中事件。
         */
        handleMenuSelect(item, e) {
            this.value = item.content;
            this.dropDown.hide();
            this.onChange && this.onChange(e, this);
        }
        updateMenu() {
            this.menu.value = this.value;
            const item = this.menu.selectedItem;
            if (item) {
                scroll_1.scrollIntoViewIfNeeded(item.elem, this.menu.body, 0);
            }
        }
    }
    exports.ComboBoxBase = ComboBoxBase;
    /**
     * 表示一个组合框。
     */
    class ComboBox extends ComboBoxBase {
    }
    exports.default = ComboBox;
});
//# sourceMappingURL=comboBox.js.map