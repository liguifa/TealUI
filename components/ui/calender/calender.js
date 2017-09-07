define(["require", "exports", "control", "./calender.less"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个日历。
     */
    class Calender extends control_1.default {
        constructor() {
            super(...arguments);
            /**
             * 获取当前控件的模板。
             */
            this.tpl = `<div class="x-calender"></div>`;
        }
        /**
         * 当被子类重写时，负责初始化当前控件。
         */
        init() {
        }
    }
    exports.default = Calender;
});
//# sourceMappingURL=calender.js.map