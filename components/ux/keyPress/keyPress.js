define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const keys = {
        __proto__: null,
        esc: 27,
        up: 38,
        down: 40,
        left: 37,
        right: 39,
        pageUp: 33,
        pageDown: 34,
        home: 36,
        end: 35,
        space: 32,
        tab: 9,
        backspace: 8,
        delete: 46
    };
    /**
     * 绑定常用键盘按键。
     * @param elem 要绑定的元素。
     * @param options 绑定各个事件的处理器。
     */
    function keyPress(elem, options) {
        const map = {};
        for (const key in options) {
            map[keys[key] || key] = options[key];
        }
        if (options.enter || options.ctrlEnter) {
            map["10"] = map["13"] = (e) => {
                if (options.ctrlEnter && (e.ctrlKey || e.metaKey)) {
                    return options.ctrlEnter(e);
                }
                if (options.enter) {
                    return options.enter(e);
                }
            };
        }
        elem.addEventListener("keydown", function (e) {
            const func = map[e.keyCode];
            if (func && func.call(this, e) !== false) {
                e.preventDefault();
            }
        });
        if (map.other) {
            elem.addEventListener("keyup", function (e) {
                // 忽略 Shift 等组合键。
                const keyCode = e.keyCode;
                if ((keyCode < 16 || keyCode > 18) && !map[keyCode]) {
                    map.other.call(this, e);
                }
            });
        }
    }
    exports.default = keyPress;
});
//# sourceMappingURL=keyPress.js.map