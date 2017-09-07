define(["require", "exports", "assert", "./class"], function (require, exports, assert, classes) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function extendTest() {
        var clazz = classes.Class.extend({
            fontSize: 1
        });
        assert.strictEqual(new clazz().fontSize, 1);
        assert.ok(clazz.extend);
    }
    exports.extendTest = extendTest;
});
//# sourceMappingURL=class-test.js.map