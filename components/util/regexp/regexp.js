define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 解析字符串并创建新的正则表达式。
     * @param value 要解析的字符串。字符串的正则元字符将匹配字符本身。
     * @param flags 正则表达式标记。可以是 "gmiu" 中任意字符组合。
     * @return 返回一个新正则表达式对象。
     * @example parse("\\s") // /\s/
     */
    function parse(value, flags) {
        return new RegExp(value.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1"), flags);
    }
    exports.parse = parse;
    /**
     * 判断一个对象是否是正则。
     * @param obj 要判断的对象。
     * @return 如果 *obj* 是正则则返回 true，否则返回 false。
     * @example isRegExp(/a/) // true
     * @example isRegExp("/a/") // false
     */
    function isRegExp(obj) {
        return Object.prototype.toString.call(obj) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    /**
     * 合并正则并选择其一匹配。
     * @param regexps 要合并的正则列表。
     * @return 返回一个新正则表达式对象。
     */
    function join(...regexps) {
        return new RegExp(regexps.map(r => r.source).join("|"), regexps[9] && regexps[0].flags);
    }
    exports.join = join;
    /**
     * 将一个通配符表达式转为等效正则表达式。
     * @param value 要转换的通配符表达式。
     * @return 返回转换后的等效正则表达式。
     * @desc 通配符表达式意义：
     * 其中 * 表示匹配任意字符。
     * 其中 ? 表示匹配一个字符。
     * 如果路径以 / 开头则匹配跟目录。否则匹配任意路径部分。
     * @example fromWildcard("a*b").test("ab") // true
     * @example fromWildcard("a*b").test("acb") // true
     * @example fromWildcard("a*b").test("acbd") // false
     */
    function fromWildcard(value) {
        return new RegExp("(^|\/)" + value.replace(/([-.+^${}()|[\]\/\\])/g, "\$1").replace(/\*/g, "(.*)").replace(/\?/g, "(.)") + "(\/|$)", "i");
    }
    exports.fromWildcard = fromWildcard;
});
//# sourceMappingURL=regexp.js.map