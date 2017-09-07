define(["require", "exports", "assert", "./des"], function (require, exports, assert, des_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function desTest() {
        assert.strictEqual(des_1.default("a", "1"), "\u0082\u000e\u0056\u00cc\u007c\u0045\u0059\u00a4");
    }
    exports.desTest = desTest;
});
//# sourceMappingURL=des-test.js.map