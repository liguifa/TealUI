define(["require", "exports", "assert", "./formatTimeToChinese"], function (require, exports, assert, formatTimeToChinese_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function formatTimeToChineseTest() {
        assert.strictEqual(formatTimeToChinese_1.default(new Date()), "刚刚");
    }
    exports.formatTimeToChineseTest = formatTimeToChineseTest;
});
//# sourceMappingURL=formatTimeToChinese-test.js.map