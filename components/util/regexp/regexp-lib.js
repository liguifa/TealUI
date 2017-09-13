define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 首尾空格。
     */
    exports.space = /^\s*|\s*$/g;
    /**
     * 空白行。
     */
    exports.blankLine = /\r?\n\s*\r?\n/;
    /**
     * 包含双字节字符。
     */
    exports.wideChar = /[\x00-\xff]/;
    /**
     * 字母。
     */
    exports.letter = /^[A-Za-z]*$/;
    /**
     * 小写字母。
     */
    exports.letterLowerCase = /^[a-z]*$/;
    /**
     * 大写字母。
     */
    exports.letterUpperCase = /^[A-Z]*$/;
    /**
     * 字母或数字。
     */
    exports.letterOrDight = /^[A-Za-z\d]*$/;
    /**
     * 含有特殊符号。
     */
    exports.symbol = /[%&',;=?$\x22]/;
    /**
     * 数字。
     */
    exports.number = /^[+-]?\d+(\.\d+)?$/;
    /**
     * 零或正整数。
     */
    exports.integer = /^(0|[1-9]\d*)$/;
    /**
     * 全数字。
     */
    exports.digit = /^\d*$/;
    /**
     * 十六进制数字。
     */
    exports.hex = /^[\da-fA-F]*$/;
    /**
     * 八进制数字。
     */
    exports.octal = /^[0-7]*$/;
    /**
     * 二进制数字。
     */
    exports.binary = /^[01]*$/;
    /**
     * 合法标志名（字母、数字或下划线，但不允许数字开头）。
     */
    exports.identifier = /^[a-zA-Z_]\w*$/;
    /**
     * 金额。
     */
    exports.currency = /^(0|[1-9]\d*)(\.\d\d?)?$/;
    /**
     * 合法路径。
     */
    exports.path = /^[^<>;:/\\?*"|]+$/;
    /**
     * 是否是地址。
     */
    exports.url = /^[a-zA-z]+:\/\//;
    /**
     * 邮箱。
     */
    exports.email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    /**
     * IP地址。
     */
    exports.ip = /^((25[0-5]|2[0-4]\\d|[01]?\\d?\\d)(\\.25[0-5]|2[0-4]\\d|[01]?\\d?\\d)){3}$/;
    /**
     * 域名。
     */
    exports.domain = /[a-zA-Z\d][-a-zA-Z\d]{0,62}(\/.[a-zA-Z\d][-a-zA-Z\d]{0,62})+/;
    /**
     * 日期时间。
     */
    exports.datetime = /^\d{4}[-/]\d\d?[-/]\d\d?\s+\d\d?:\d\d?:\d\d?$/;
    /**
     * 日期。
     */
    exports.date = /^\d{4}[-/]\d\d?[-/]\d\d?$/;
    /**
     * 时间。
     */
    exports.time = /^\d\d?:\d\d?:\d\d?$/;
    /**
     * 年。
     */
    exports.year = /^\d{4}$/;
    /**
     * 月份。
     */
    exports.month = /^(0?[1-9]|1[0-2])$/;
    /**
     * 天。
     */
    exports.day = /^((0?[1-9])|((1|2)[0-9])|30|31)$/;
    /**
     * 小时。
     */
    exports.hour = /^\d|1\d|2[0-3]$/;
    /**
     * 分钟或秒。
     */
    exports.minute = /^\d|[1-5]\d$/;
    /**
     * 包含 HTML 片段。
     */
    exports.html = /<(\S*?)[^>]*>/;
    /**
     * XML 文档。
     */
    exports.xmlDocument = /^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$/;
    /**
     * 合法账号。
     */
    exports.userName = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    /**
     * 密码（以字母开头，长度在6~18之间，只能包含字母、数字和下划线）。
     */
    exports.password = /^[a-zA-Z]\w{5,17}$/;
    /**
     * 强密码（必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间）。
     */
    exports.passwordSafe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
    /**
     * 包含中文。
     */
    exports.chinese = /[\u4e00-\u9fa5]/;
    /**
     * 中国身份证。
     */
    exports.chineseId = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/;
    /**
     * 中国邮政编码。
     */
    exports.chinesePostCode = /^[1-9]\d{5}(?!\d)$/;
    /**
     * 腾讯 QQ 号。
     */
    exports.qq = /^[1-9][0-9]{4,}$/;
    /**
     * 手机号。
     */
    exports.phone = /^(13\d|14[5|7]|15\d|18\d)\d{8}$/;
    /**
     * 手机号。
     */
    exports.tel = /^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$/;
});
//# sourceMappingURL=regexp-lib.js.map