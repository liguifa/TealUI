define(["require", "exports", "assert", "./nextTick"], function (require, exports, assert, nextTick_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function nextTickTest(done) {
        let i = 0;
        nextTick_1.default(() => {
            i++;
        });
        nextTick_1.default(() => {
            assert.strictEqual(i, 1);
            done();
        });
        assert.strictEqual(i, 0);
    }
    exports.nextTickTest = nextTickTest;
});
//# sourceMappingURL=nextTick-test.js.map