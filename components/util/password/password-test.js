define(["require", "exports", "assert", "./password"], function (require, exports, assert, password_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function checkPasswordTest() {
        assert.strictEqual(password_1.default("123456"), -1);
    }
    exports.checkPasswordTest = checkPasswordTest;
});
//# sourceMappingURL=password-test.js.map