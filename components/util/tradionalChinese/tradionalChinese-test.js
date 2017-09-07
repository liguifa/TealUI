define(["require", "exports", "assert", "./tradionalChinese"], function (require, exports, assert, tradionalChinese) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function toSimpleChineseTest() {
        assert.equal(tradionalChinese.toSimpleChinese("簡体"), "简體");
    }
    exports.toSimpleChineseTest = toSimpleChineseTest;
    function toTradionalChineseTest() {
        assert.equal(tradionalChinese.toTradionalChinese("简體"), "簡体");
    }
    exports.toTradionalChineseTest = toTradionalChineseTest;
});
//# sourceMappingURL=tradionalChinese-test.js.map