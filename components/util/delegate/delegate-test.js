define(["require", "exports", "assert", "./delegate"], function (require, exports, assert, delegate) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function delegateTest() {
        let i = 0;
        const del = new delegate.Delegate(() => i++);
        del.add(() => i++);
        del.remove(del.funcs[0]);
        del();
        assert.strictEqual(i, 1);
    }
    exports.delegateTest = delegateTest;
});
//# sourceMappingURL=delegate-test.js.map