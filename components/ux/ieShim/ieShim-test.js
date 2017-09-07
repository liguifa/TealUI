define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function ieShimTest() {
    }
    exports.ieShimTest = ieShimTest;
    test("execScript", function () {
        expect(3);
        execScript("var globalEvalTest = true;");
        ok(window.globalEvalTest, "Test variable declarations are global");
        window.globalEvalTest = false;
        execScript("globalEvalTest = true;");
        ok(window.globalEvalTest, "Test variable assignments are global");
        window.globalEvalTest = false;
        execScript("this.globalEvalTest = true;");
        ok(window.globalEvalTest, "Test context (this) is the window object");
        window.globalEvalTest = undefined;
    });
});
//# sourceMappingURL=ieShim-test.js.map