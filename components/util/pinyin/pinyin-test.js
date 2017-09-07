define(["require", "exports", "assert", "./pinyin"], function (require, exports, assert, pinyin_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function pinyinTest() {
        assert.deepEqual(pinyin_1.default("啊"), [["a"]]);
    }
    exports.pinyinTest = pinyinTest;
});
//# sourceMappingURL=pinyin-test.js.map