define(["require", "exports", "control", "./table.less"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个表格。
     */
    class Table extends control_1.default {
        constructor() {
            super(...arguments);
            /**
             * 获取当前控件的模板。
             */
            this.tpl = `<table class="x-table"><thead><tr/></thead><tbody/></table>`;
        }
        /**
         * 当被子类重写时，负责初始化当前控件。
         */
        init() {
        }
    }
    exports.default = Table;
});
//# sourceMappingURL=table.js.map