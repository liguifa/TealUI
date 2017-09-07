define(["require", "exports", "ux/dom", "ui/select", "util/pinyin"], function (require, exports, dom, select_1, pinyin_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个选择框。
     */
    class Suggest extends select_1.default {
        constructor() {
            super(...arguments);
            this._cache = { __proto__: null };
        }
        init() {
            super.init();
            this.canInput = true;
            dom.on(this.input, "input", this.handleInput, this);
        }
        handleInput() {
            const value = this.input.value.trim();
            let hasItem;
            for (const item of this.menu.items) {
                const val = !!value && !this.match(value, item.content);
                if (!val) {
                    hasItem = true;
                }
                item.hidden = val;
            }
            this.dropDown.toggle(hasItem);
            this.dropDown.realign();
        }
        match(value, item) {
            value = value.toLowerCase();
            let c = this._cache[item];
            if (!c) {
                c = this._cache[item] = {
                    lower: item.toLowerCase(),
                    pinyin: item.split("").map(x => pinyin_1.getPinYinOfChar(x).join("|") || "_").join("").toLowerCase(),
                    py: item.split("").map(x => (pinyin_1.getPinYinOfChar(x).join("|") || "_")[0]).join("").toLowerCase()
                };
            }
            if (c.lower.indexOf(value) >= 0) {
                return true;
            }
            if (c.pinyin.indexOf(value) >= 0) {
                return true;
            }
            if (c.py.indexOf(value) >= 0) {
                return true;
            }
            return false;
        }
        validate(value) {
            const b = super.validate(value);
            if (b) {
                return b;
            }
            if (this.menu.items.find(x => x.key === value)) {
                return "";
            }
            return "请从菜单中选择项";
        }
        get body() {
            this.elem;
            return this.menu.body;
        }
        get value() {
            let c = this.input.value;
            this.menu.items.forEach(item => {
                if (item.body.textContent == this.input.value) {
                    c = item.key;
                }
            });
            return c;
        }
        set value(value) {
            this.menu.value = value;
            this.input.value = this.menu.selectedItem ? this.menu.selectedItem.elem.textContent : value;
        }
    }
    exports.default = Suggest;
});
//# sourceMappingURL=suggest.js.map