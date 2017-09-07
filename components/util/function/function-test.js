define(["require", "exports", "assert", "./function"], function (require, exports, assert, func) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function emptyTest() {
        assert.ok(func.empty);
    }
    exports.emptyTest = emptyTest;
    function fromTest() {
        assert.strictEqual(func.from(false)(), false);
    }
    exports.fromTest = fromTest;
    function isFunctionTest() {
        assert.strictEqual(func.isFunction(function () { }), true);
        assert.strictEqual(func.isFunction(null), false);
        assert.strictEqual(func.isFunction(new Function()), true);
        // Make sure that false values return false
        assert.ok(!func.isFunction(null), "null Value");
        assert.ok(!func.isFunction(undefined), "undefined Value");
        assert.ok(!func.isFunction(""), "Empty String Value");
        assert.ok(!func.isFunction(0), "0 Value");
        // Check built-ins
        // Safari uses "(Internal Function)"
        assert.ok(func.isFunction(String), "String Function(" + String + ")");
        assert.ok(func.isFunction(Array), "Array Function(" + Array + ")");
        assert.ok(func.isFunction(Object), "Object Function(" + Object + ")");
        assert.ok(func.isFunction(Function), "Function Function(" + Function + ")");
        // When stringified, this could be misinterpreted
        var mystr = "function";
        assert.ok(!func.isFunction(mystr), "Function String");
        // When stringified, this could be misinterpreted
        var myarr = ["function"];
        assert.ok(!func.isFunction(myarr), "Function Array");
        // When stringified, this could be misinterpreted
        var myfunction = { "function": "test" };
        assert.ok(!func.isFunction(myfunction), "Function Object");
        // Make sure normal functions still work
        var fn = function () { };
        assert.ok(func.isFunction(fn), "Normal Function");
        var obj = document.createElement("object");
        // Firefox says this is a function
        assert.ok(!func.isFunction(obj), "Object Element");
        // IE says this is an object
        // Since 1.3, this isn't supported (#2968)
        //assert.ok( func.isFunction(obj.getAttribute), "getAttribute Function" );
        var nodes = document.body.childNodes;
        // Safari says this is a function
        assert.ok(!func.isFunction(nodes), "childNodes Property");
        var first = document.body.firstChild;
        // Normal elements are reported ok everywhere
        assert.ok(!func.isFunction(first), "A normal DOM Element");
        var input = document.createElement("input");
        input.type = "text";
        document.body.appendChild(input);
        // IE says this is an object
        // Since 1.3, this isn't supported (#2968)
        //assert.ok( func.isFunction(input.focus), "A default function property" );
        document.body.removeChild(input);
        var a = document.createElement("a");
        a.href = "some-function";
        document.body.appendChild(a);
        // This serializes with the word 'function' in it
        assert.ok(!func.isFunction(a), "Anchor Element");
        document.body.removeChild(a);
        // Recursive function calls have lengths and array-like properties
        function callme(callback) {
            function fn(response) {
                callback(response);
            }
            assert.ok(func.isFunction(fn), "Recursive Function Call");
            fn({ some: "data" });
        }
        ;
        callme(function () {
            callme(function () { });
        });
    }
    exports.isFunctionTest = isFunctionTest;
    function repeatTest() {
        let i = 0;
        const fn = func.repeat(() => {
            i++;
        }, 2);
        fn();
        fn();
        assert.strictEqual(i, 1);
    }
    exports.repeatTest = repeatTest;
    function concatTest() {
        assert.ok(func.concat(function () { }, function () { }));
    }
    exports.concatTest = concatTest;
    function tryTheseTest() {
        assert.strictEqual(func.tryThese(function () { throw new Error("x"); }, function () { return 1; }), 1);
    }
    exports.tryTheseTest = tryTheseTest;
    function intervalTest(done) {
        func.interval(count => {
            assert.strictEqual(count, 0);
            done();
        }, 1, 1);
    }
    exports.intervalTest = intervalTest;
    function delayTest(done) {
        func.delay(() => {
            assert.ok(true);
            done();
        }, 1)();
    }
    exports.delayTest = delayTest;
    function getSourceTest() {
        assert.strictEqual(func.getSource(function (x) { return x; }).trim(), "return x;");
    }
    exports.getSourceTest = getSourceTest;
    function limitTest() {
        let i = 0;
        const fn = func.limit(() => i++, 1);
        fn();
        fn();
        assert.strictEqual(i, 1);
    }
    exports.limitTest = limitTest;
});
//# sourceMappingURL=function-test.js.map