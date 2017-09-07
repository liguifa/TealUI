define(["require", "exports", "ui/control", "./listView.scss"], function (require, exports, control_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个列表视图。
     */
    class ListView extends control_1.default {
        render() {
            return control_1.VNode.create("div", { class: "x-listview" });
        }
    }
    exports.default = ListView;
});
//# sourceMappingURL=listView.js.map