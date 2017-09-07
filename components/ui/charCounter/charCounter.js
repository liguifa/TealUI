define(["require", "exports", "control"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个文字计数器。
     */
    class CharCounter extends control_1.Control {
        constructor() {
            super(...arguments);
            /**
             * 获取或设置最大允许输入的字符数。
             */
            this.maxLength = 300;
        }
        render() {
            return VNode.create("span", { class: "x-tip", "x-role": "charcounter", "x-target": "#textArea1", "x-max-length": "300" },
                input,
                "/",
                total);
        }
    }
    exports.default = CharCounter;
});
//# sourceMappingURL=charCounter.js.map