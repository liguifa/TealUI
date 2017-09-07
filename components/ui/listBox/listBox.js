var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ux/dom", "ux/scroll", "ux/keyPress", "ui/control", "ui/input", "./listBox.scss"], function (require, exports, dom, scroll_1, keyPress_1, control_1, input_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个列表框基类。
     */
    class ListBoxBase extends input_1.default {
        render() {
            return control_1.VNode.create("ul", { class: "x-listbox" });
        }
        /**
         * 所有项。
         */
        get items() {
            return this.query(".x-listbox>li");
        }
        set items(value) {
            this.body.innerHTML = "";
            if (Array.isArray(value)) {
                for (const item of value) {
                    if (item instanceof ListItem) {
                        item.renderTo(this);
                    }
                    else {
                        const listItem = new ListItem();
                        listItem.content = item;
                        listItem.renderTo(this);
                    }
                }
            }
            else {
                for (const key in value) {
                    const item = new ListItem();
                    item.key = key;
                    item.content = value[key];
                    item.renderTo(this);
                }
            }
        }
        /**
         * 选中的第一项。
         */
        get selectedItem() {
            return this.find(".x-listbox>.x-listbox-selected");
        }
        set selectedItem(value) {
            const old = this.selectedItem;
            if (old)
                old.selected = false;
            if (value)
                value.selected = true;
        }
        /**
         * 选中的第一项的索引。
         */
        get selectedIndex() {
            const item = this.selectedItem;
            return item ? dom.index(item.elem) : -1;
        }
        set selectedIndex(value) {
            this.selectedItem = value >= 0 ? this.items[value] : null;
        }
        /**
         * 获取指定键对应的项。
         * @param key 要查询的键。
         * @return 返回匹配的第一个项。如果不存在则返回 undefined。
         */
        findItemByKey(key) {
            return this.items.find(x => x.key === key);
        }
        /**
         * 获取指定值对应的项。
         * @param content 要查询的键。
         * @return 返回匹配的第一个项。如果不存在则返回 undefined。
         */
        findItemByContent(content) {
            return this.items.find(x => x.content === content);
        }
    }
    __decorate([
        control_1.bind("")
    ], ListBoxBase.prototype, "body", void 0);
    __decorate([
        control_1.bind("", "class", "x-listbox-readonly")
    ], ListBoxBase.prototype, "readOnly", void 0);
    __decorate([
        control_1.bind("", "class", "x-listbox-disabled")
    ], ListBoxBase.prototype, "disabled", void 0);
    exports.ListBoxBase = ListBoxBase;
    /**
     * 表示一个列表框。
     */
    class ListBox extends ListBoxBase {
        /**
         * 值。
         */
        get value() {
            const item = this.selectedItem;
            if (item) {
                return item.key;
            }
            return null;
        }
        set value(value) {
            this.selectedItem = this.findItemByKey(value);
        }
        init() {
            super.init();
            dom.on(this.body, "click", "li", this.handleClick, this);
            keyPress_1.default(this.elem, this.keyMappings());
        }
        /**
         * 处理指针按下事件。
         */
        handleClick(e, item) {
            if (!this.disabled && !this.readOnly) {
                this.select(item, e);
            }
        }
        /**
         * 选中项。
         * @param item 要选中的项。
         * @param e 事件参数。
         */
        select(item, e) {
            item = control_1.from(item);
            if (!this.onSelect || this.onSelect(item, e, this) !== false) {
                const changed = this.selectedItem !== item;
                if (changed) {
                    this.selectedItem = item;
                }
                if (item) {
                    scroll_1.scrollIntoViewIfNeeded(item.elem, this.body, this.duration);
                }
                if (changed && this.onChange) {
                    this.onChange(e, this);
                }
            }
        }
        /**
         * 获取键盘绑定。
         * @return 返回各个键盘绑定对象。
         */
        keyMappings() {
            const upDown = (e, delta) => {
                const items = this.items;
                if (items.length) {
                    let index = this.selectedIndex + delta;
                    if (index < 0)
                        index += items.length;
                    if (index >= items.length)
                        index = 0;
                    this.select(items[index], e);
                }
            };
            return {
                up(e) {
                    upDown(e, -1);
                },
                down(e) {
                    upDown(e, 1);
                }
            };
        }
    }
    exports.default = ListBox;
    /**
     * 表示一个列表项。
     */
    class ListItem extends control_1.default {
        render() {
            return control_1.VNode.create("li", null,
                control_1.VNode.create("a", { href: "javascript:;", draggable: false }));
        }
        /**
         * 键。
         */
        get key() {
            return this.elem.getAttribute("data-key") || this.content;
        }
        set key(value) {
            this.elem.setAttribute("data-key", value);
        }
        /**
         * 是否选中。
         */
        get selected() {
            return dom.hasClass(this.elem, "x-listbox-selected");
        }
        set selected(value) {
            dom.toggleClass(this.elem, "x-listbox-selected", value);
            this.elem.setAttribute("aria-selected", value.toString());
        }
    }
    __decorate([
        control_1.bind("a")
    ], ListItem.prototype, "body", void 0);
    __decorate([
        control_1.bind("a", "textContent")
    ], ListItem.prototype, "content", void 0);
    exports.ListItem = ListItem;
});
//# sourceMappingURL=listBox.js.map