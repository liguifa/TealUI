define(["require", "exports", "assert", "./tween"], function (require, exports, assert, tween_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function tweenTest(done) {
        const tween = new tween_1.default();
        let c = 0;
        tween.set = (e) => { c = e; };
        tween.done = () => {
            assert.equal(c, 1);
            done();
        };
        tween.reset();
        tween.start();
    }
    exports.tweenTest = tweenTest;
});
//# sourceMappingURL=tween-test.js.map