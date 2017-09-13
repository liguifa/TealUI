define(["require", "exports", "assert", "./chineseId"], function (require, exports, assert, chineseId_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function parseChineseIdTest() {
        assert.deepEqual(chineseId_1.default("152500198909267865"), {
            birthday: new Date("Tue Sep 26 1989 00:00:00 GMT+0800"),
            city: 25,
            county: 0,
            province: 15,
            sex: false,
            valid: true
        });
    }
    exports.parseChineseIdTest = parseChineseIdTest;
});
//# sourceMappingURL=chineseId-test.js.map