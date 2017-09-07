define(["require", "exports", "assert", "./regexp"], function (require, exports, assert, regexp) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function parseTest() {
        assert.strictEqual(regexp.parse("\\s").source, /\s/.source);
    }
    exports.parseTest = parseTest;
    function isRegExpTest() {
        assert.strictEqual(regexp.isRegExp(/a/), true);
        assert.strictEqual(regexp.isRegExp("a"), false);
    }
    exports.isRegExpTest = isRegExpTest;
    function fromWildcardTest() {
        assert.strictEqual(regexp.fromWildcard("a*b").test("ab"), true);
        assert.strictEqual(regexp.fromWildcard("a*b").test("acb"), true);
        assert.strictEqual(regexp.fromWildcard("a*b").test("acbd"), false);
    }
    exports.fromWildcardTest = fromWildcardTest;
});
//# sourceMappingURL=regexp-test.js.map