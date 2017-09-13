define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 计算大正整数的和。
     * @param x 要计算的左值。
     * @param y 要计算的左值。
     * @return 返回计算的结果。
     * @example add("1", "2") // "3"
     */
    function add(x, y) {
        const result = [];
        const m = x.split("").reverse();
        const n = y.split("").reverse();
        let s = 0;
        for (let i = 0; i < x.length || i < y.length; i++) {
            const t = (+m[i] || 0) + (+n[i] || 0) + s;
            result.push(t % 10);
            s = (t / 10) | 0;
        }
        s && result.push(s);
        return result.reverse().join("");
    }
    exports.add = add;
    /**
     * 计算大正整数的积。
     * @param x 要计算的左值。
     * @param y 要计算的左值。
     * @return 返回计算的结果。
     * @example mul("1", "2") // "2"
     */
    function mul(x, y) {
        let result = "0";
        const p = x.match(/\d{1,4}/g).reverse();
        const q = y.match(/\d{1,4}/g).reverse();
        let f1 = 0;
        for (const pi of p) {
            let f2 = 0;
            for (const qi of q) {
                result = add(result, +pi * +qi + new Array(f1 + f2 + 1).join("0"));
                f2 += qi.length;
            }
            f1 += pi.length;
        }
        return result;
    }
    exports.mul = mul;
});
//# sourceMappingURL=bigInteger.js.map