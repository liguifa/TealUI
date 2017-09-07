define(["require", "exports", "control", "./datePicker.less"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个日期选择器。
     */
    class DatePicker extends control_1.default {
        constructor() {
            super(...arguments);
            /**
             * 获取当前控件的模板。
             */
            this.tpl = `<div class="x-datepicker"></div>`;
        }
        /**
         * 当被子类重写时，负责初始化当前控件。
         */
        init() {
        }
    }
    exports.default = DatePicker;
});
//# sourceMappingURL=datePicker.js.map