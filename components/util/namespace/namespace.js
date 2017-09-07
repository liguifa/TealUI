define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 定义命名空间。
     * @param ns 要创建的命名空间。
     * @return 如果命名空间已存在则返回之前的命名空间，否则返回新创建的命名空间。
     * @example namespace("MyNameSpace.SubNamespace")
     */
    function namespace(ns) {
        const parts = ns.split(".");
        let current = (function () { return this; })();
        for (const part of parts) {
            current = current[part] || (current[part] = {});
        }
        return current;
    }
    exports.default = namespace;
});
//# sourceMappingURL=namespace.js.map