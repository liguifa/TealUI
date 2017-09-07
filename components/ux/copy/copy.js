define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 复制内容。
     * @param content 要复制的内容。
     * @return 如果复制成功则返回 true，否则返回 false。
     */
    function copy(content) {
        const textarea = document.body.appendChild(document.createElement("textarea"));
        textarea.value = content;
        textarea.select();
        let success;
        try {
            success = document.execCommand("copy");
        }
        catch (e) {
        }
        finally {
            document.body.removeChild(textarea);
        }
        return success;
    }
    exports.default = copy;
});
//# sourceMappingURL=copy.js.map