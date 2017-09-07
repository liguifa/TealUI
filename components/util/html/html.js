define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 编码 HTML 特殊字符。
     * @param value 要编码的字符串。
     * @return 返回已编码的字符串。HTML 特殊字符 `&`、`<`、`>`、`'`、`"` 分别会被编码成 `&amp;`、`&lt;`、`&gt;`、`&#39;`、`&quot;`。
     * @example encodeHTML("<a></a>") // "&lt;a&gt;&lt;/a&gt;"
     */
    function encodeHTML(value) {
        return value.replace(/[&<>'"]/g, c => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\'": "&#39;",
            '\"': "&quot;"
        }[c]));
    }
    exports.encodeHTML = encodeHTML;
    /**
     * 编码 HTML 属性特殊字符。
     * @param value 要编码的字符串。
     * @return 返回已编码的字符串。HTML 属性特殊字符 `'`、`"` 分别会被编码成 `&#39;`、`&quot;`。
     * @example encodeHTMLAttribute("'") // "&#39;"
     */
    function encodeHTMLAttribute(value) {
        return value.replace(/['"]/g, c => ({
            "\'": "&#39;",
            '\"': "&quot;"
        }[c]));
    }
    exports.encodeHTMLAttribute = encodeHTMLAttribute;
    /**
     * 解码 HTML 特殊字符。
     * @param value 要解码的字符串。
     * @return 返回已解码的字符串。
     * @example decodeHTML("&lt;a&gt;&lt;/a&gt;") // "<a></a>"
     */
    function decodeHTML(value) {
        return value.replace(/&(#(\d+)|\w+);/g, (_, word, unicode) => unicode ? String.fromCharCode(+unicode) : ({
            "amp": "&",
            "lt": "<",
            "gt": ">",
            "quot": '\"'
        }[word] || word));
    }
    exports.decodeHTML = decodeHTML;
    /**
     * 编码 HTML 属性值（含引号）。
     * @param value 要编码的字符串。
     * @param quote 要编码的引号。
     * @return 返回已编码的字符串。
     * @example escapeHTMLAttribute("a", '"') // "\"a\""
     */
    function escapeHTMLAttribute(value, quote) {
        const q = quote && quote.charCodeAt(0);
        return q === 34 /*"*/ ? '"' + value.replace(/"/g, "&quot;") + '"' :
            q === 39 /*'*/ ? "'" + value.replace(/'/g, "&#39;") + "'" :
                /[>\s="']/.test(value) ? escapeHTMLAttribute(value, value.indexOf('"') >= 0 && value.indexOf("\'") < 0 ? "\'" : '"') : value;
    }
    exports.escapeHTMLAttribute = escapeHTMLAttribute;
    /**
     * 解码 HTML 属性值（含引号）。
     * @param value 要编码的字符串。
     * @param quote 要编码的引号。
     * @return 返回已编码的字符串。
     * @example unescapeHTMLAttribute("'a'") // "a"
     */
    function unescapeHTMLAttribute(value) {
        return decodeHTML(value.replace(/^(['"])(.*)\1$/, "$2"));
    }
    exports.unescapeHTMLAttribute = unescapeHTMLAttribute;
});
//# sourceMappingURL=html.js.map