define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 精确计算两个货币的和。
     * @param x 计算的左值，最大不得超过 1 万亿，最多只能有两位小数。
     * @param y 计算的右值，最大不得超过 1 万亿，最多只能有两位小数。
     * @return 返回计算的结果。
     * @example add(86.24, 0.1) // 86.34
     */
    function add(x, y) {
        return Math.round((x + y) * 100) / 100;
    }
    exports.add = add;
    /**
     * 精确计算两个货币的差。
     * @param x 计算的左值，最大不得超过 1 万亿，最多只能有两位小数。
     * @param y 计算的右值，最大不得超过 1 万亿，最多只能有两位小数。
     * @return 返回计算的结果。
     * @example sub(7, 0.8) // 6.2
     */
    function sub(x, y) {
        return Math.round((x - y) * 100) / 100;
    }
    exports.sub = sub;
    /**
     * 精确计算两个货币的积。
     * @param x 计算的左值。
     * @param y 计算的右值。
     * @return 返回计算的结果。
     * @example mul(7, 0.8) // 5.6
     */
    function mul(x, y) {
        return (x * 1000) * (y * 1000) / 1000000;
    }
    exports.mul = mul;
    /**
     * 精确计算两个货币的商。
     * @param x 计算的左值。
     * @param y 计算的右值。
     * @return 返回计算的结果。
     * @example div(7, 0.8) // 8.75
     */
    function div(x, y) {
        return Math.round(x * 100 / y) / 100;
    }
    exports.div = div;
    /**
     * 保留小数点后两位四舍五入。
     * @param value 要处理的值。
     * @return 返回计算的结果。
     * @example round(86.245) // 86.25
     */
    function round(value) {
        return Math.round(value * 100) / 100;
    }
    exports.round = round;
    /**
     * 将指定的货币格式化为字符串。
     * @param value 要处理的值。
     * @return 返回格式化后的字符串。字符串保留两位小数，整数部分每 3 位包含一个逗号分隔符。
     * @example format(86234.245) // "86,234.25"
     */
    function format(value) {
        const t = Math.round(Math.abs(value) * 100);
        const result = Math.floor(value) + "";
        const c = (result.length - 1) % 3 + (value < 0 ? 2 : 1);
        return result.substr(0, c) + result.substr(c).replace(/(\d{3})/g, ",$1") + "." + Math.floor(t / 10) % 10 + t % 10;
    }
    exports.format = format;
});
//# sourceMappingURL=currency.js.map