var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "ui/control", "./accordion.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个手风琴。
     */
    class Accordion extends control_1.default {
        constructor() {
            super(...arguments);
            /**
             * 处理面板即将折叠事件。
             * @param value 如果为 true 表示即将折叠。
             * @param sender 事件源。
             */
            this.handlePanelBeforeCollapseChange = (value, sender) => {
                if (this._ignoreChange) {
                    return;
                }
                if (!this.multiply) {
                    const selectedIndex = this.selectedIndex;
                    if (selectedIndex < 0) {
                        return;
                    }
                    if (this.panels[selectedIndex] !== sender) {
                        this._ignoreChange = true;
                        this.panels[selectedIndex].toggleCollapse(true);
                        this._ignoreChange = false;
                    }
                    else if (value) {
                        return false;
                    }
                    this.selectedIndex = this.panels.indexOf(sender);
                }
                this.onCollapseChange && this.onCollapseChange(sender, this);
            };
        }
        /**
         * 选中的索引。
         */
        get selectedIndex() { return this.panels.findIndex(panel => !panel.collapsed); }
        set selectedIndex(value) {
            this.panels.forEach((panel, index) => {
                panel.collapsed = index !== value;
            });
        }
        render() {
            return control_1.VNode.create("div", { class: "x-accordion" });
        }
        /**
         * 获取所有面板。
         */
        get panels() { return this.query(".x-accordion>.x-panel"); }
        layout() {
            let selectedIndex = this.selectedIndex;
            if (selectedIndex < 0)
                selectedIndex = 0;
            this.panels.forEach((panel, index) => {
                panel.collapsable = true;
                panel.onCollapseChange = this.handlePanelBeforeCollapseChange;
                if (!this.multiply) {
                    panel.collapsed = index !== selectedIndex;
                }
            });
        }
    }
    __decorate([
        control_1.bind("")
    ], Accordion.prototype, "body", void 0);
    exports.default = Accordion;
});
//# sourceMappingURL=accordion.js.map