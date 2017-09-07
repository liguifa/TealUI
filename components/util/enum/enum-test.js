define(["require", "exports", "assert", "./enum"], function (require, exports, assert, enums) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function getNameTest() {
        var Colors = {
            red: 1 << 0,
            yellow: 1 << 1,
            blue: 1 << 2
        };
        assert.strictEqual(enums.getName(Colors, Colors.red), "red");
        assert.strictEqual(enums.getName(Colors, Colors.red | Colors.yellow), "red|yellow");
    }
    exports.getNameTest = getNameTest;
    function hasFlagTest() {
        var Colors = {
            red: 1 << 0,
            yellow: 1 << 1,
            blue: 1 << 2
        };
        assert.strictEqual(enums.hasFlag(Colors.red | Colors.yellow, Colors.red), true);
        assert.strictEqual(enums.hasFlag(Colors.red | Colors.yellow, Colors.blue), false);
    }
    exports.hasFlagTest = hasFlagTest;
    function setFlagTest() {
        var Colors = {
            red: 1 << 0,
            yellow: 1 << 1,
            blue: 1 << 2
        };
        assert.strictEqual(enums.setFlag(Colors.red, Colors.yellow, true), Colors.red | Colors.yellow);
        assert.strictEqual(enums.setFlag(Colors.red, Colors.yellow, false), Colors.red);
        assert.strictEqual(enums.setFlag(Colors.red | Colors.yellow, Colors.yellow, true), Colors.red | Colors.yellow);
        assert.strictEqual(enums.setFlag(Colors.red | Colors.yellow, Colors.yellow, false), Colors.red);
    }
    exports.setFlagTest = setFlagTest;
});
//# sourceMappingURL=enum-test.js.map