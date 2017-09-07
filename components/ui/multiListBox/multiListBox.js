define(["require", "exports", "ux/dom", "ux/keyPress", "ux/scroll", "ui/control", "ui/listBox"], function (require, exports, dom, keyPress_1, scroll_1, control_1, listBox_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个多选列表框。
     */
    class MultiListBox extends listBox_1.ListBoxBase {
        /**
         * 所有选中项。
         */
        get selectedItems() {
            return this.query(".x-listbox>.x-listbox-selected");
        }
        set selectedItems(value) {
            this.selectedItems.forEach(item => { item.selected = false; });
            if (value)
                value.forEach(item => { item.selected = true; });
        }
        /**
         * 值。
         */
        get value() {
            return this.selectedItems.map(item => item.key);
        }
        set value(value) {
            this.items.forEach(item => {
                item.selected = !!value && value.indexOf(item.key) >= 0;
            });
        }
        init() {
            super.init();
            dom.on(this.body, "pointerdown", "li", this.handlePointerDown, this);
            keyPress_1.default(this.elem, this.keyMap());
        }
        /**
         * 处理指针按下事件。
         */
        handlePointerDown(e, item) {
            e.preventDefault();
            if (!this.disabled && !this.readOnly) {
                dom.on(document, "pointerup", this.handlePointerUp, this);
                dom.on(this.body, "pointerenter", "li", this.handlePointerMove, this);
                item = control_1.from(item);
                this.select(e.shiftKey ? this._lastClickItem : item, item, this._lastSelected = !item.selected, this._ctrlKeyPressed = !!(e.ctrlKey || e.metaKey) === !!this.ctrlKey, e);
                this._lastClickItem = item;
            }
        }
        /**
         * 处理指针移动事件。
         */
        handlePointerMove(e, item) {
            this.select(this._lastClickItem, item, this._lastSelected, this._ctrlKeyPressed, e);
        }
        /**
         * 处理指针松开事件。
         */
        handlePointerUp(e) {
            dom.off(this.body, "pointerenter", "li", this.handlePointerMove, this);
            dom.off(document, "pointerup", this.handlePointerUp, this);
        }
        /**
         * 选中项。
         * @param start 选区的第一个节点。
         * @param end 选区的最后一个节点。默认同 *from*。
         * @param value 如果为 true 则表示选中，如果为 false 则表示不选中。
         * @param add 如果为 true 则合并之前选中的项，否则为替代。
         * @param e 事件参数。
         */
        select(start, end = start, value = true, add, e) {
            const items = this.items;
            const last = control_1.from(end);
            let startIndex = items.indexOf(control_1.from(start));
            let endIndex = items.indexOf(last);
            if (startIndex > endIndex) {
                const t = startIndex;
                startIndex = endIndex;
                endIndex = t;
            }
            let changed = false;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (i >= startIndex && i <= endIndex) {
                    if (!this.onSelect || this.onSelect(item, value, e, this) !== false) {
                        if (item.selected !== value) {
                            item.selected = value;
                            changed = true;
                        }
                    }
                }
                else if (!add && value && item.selected === value && (!this.onSelect || this.onSelect(item, !value, e, this) !== false)) {
                    item.selected = !value;
                    changed = true;
                }
            }
            if (last) {
                scroll_1.scrollIntoViewIfNeeded(last.elem, this.body, this.duration);
            }
            if (changed && this.onChange) {
                this.onChange(e, this);
            }
        }
        /**
         * 获取键盘绑定。
         * @return 返回各个键盘绑定对象。
         */
        keyMap() {
            const upDown = (e, delta) => {
                const items = this.items;
                const selectedItem = delta < 0 ? this.selectedItem : this.selectedItems[this.selectedItems.length - 1];
                let newSelected;
                if (selectedItem) {
                    if (!(newSelected = items[items.indexOf(selectedItem) + delta])) {
                        return true;
                    }
                    this.select(newSelected, undefined, !newSelected.selected, !this.ctrlKey || e.shiftKey || e.ctrlKey || e.metaKey);
                }
                else {
                    this.select(newSelected = items[delta > 0 ? 0 : items.length - 1], undefined, undefined, undefined, e);
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
    exports.default = MultiListBox;
});
//# sourceMappingURL=multiListBox.js.map