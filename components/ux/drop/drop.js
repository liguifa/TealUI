define(["require", "exports", "ux/dom", "ux/drag"], function (require, exports, dom_1, drag_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个可拖放区域。
     */
    class Droppable {
        /**
         * 处理拖动开始事件。
         * @param e 事件对象。
         * @param sender 事件源。
         */
        static handleDragStart(e, sender) {
            Droppable.current = Droppable.instances.filter(droppable => !droppable.onDragStart || droppable.onDragStart(sender, e, droppable) !== false);
        }
        /**
         * 处理拖动移动事件。
         * @param e 事件对象。
         * @param sender 事件源。
         */
        static handleDragMove(e, sender) {
            for (const droppable of Droppable.current) {
                if (droppable.contains(sender, e)) {
                    if (droppable.active) {
                        droppable.onDragMove && droppable.onDragMove(sender, e, droppable);
                    }
                    else if (!droppable.onDragEnter || droppable.onDragEnter(sender, e, droppable) !== false) {
                        droppable.active = true;
                    }
                }
                else if (droppable.active && (!droppable.onDragLeave || droppable.onDragLeave(sender, e, droppable) !== false)) {
                    droppable.active = false;
                }
            }
        }
        /**
         * 处理拖动结束事件。
         * @param e 事件对象。
         * @param sender 事件源。
         */
        static handleDragEnd(e, sender) {
            for (const droppable of Droppable.current) {
                droppable.onDragEnd && droppable.onDragEnd(sender, e, droppable);
                if (droppable.active) {
                    droppable.active = false;
                    droppable.onDrop && droppable.onDrop(sender, e, droppable);
                }
            }
            Droppable.current = null;
        }
        /**
         * 启用拖放。
         */
        enable() {
            const index = Droppable.instances.indexOf(this);
            if (index < 0) {
                Droppable.instances.push(this);
            }
        }
        /**
         * 禁用拖放。
         */
        disable() {
            const index = Droppable.instances.indexOf(this);
            if (index >= 0) {
                Droppable.instances.splice(index, 1);
            }
        }
        /**
         * 判断指定的拖动元素是否已进入当前拖放区域。
         * @param draggable 当前的拖动元素。
         * @param e 事件对象。
         * @return 如果在区域内则返回 true，否则返回 false。
         */
        contains(draggable, e) {
            const rect = dom_1.getRect(this.elem);
            return rect.x <= draggable.endX && draggable.endX <= rect.x + rect.width && rect.y <= draggable.endY && draggable.endY <= rect.y + rect.height;
        }
    }
    /**
     * 所有拖放区域。
     */
    Droppable.instances = [];
    exports.Droppable = Droppable;
    function connect(dragEvent, dropEvent) {
        const old = drag_1.Draggable.prototype[dragEvent];
        drag_1.Draggable.prototype[dragEvent] = function (e) {
            const result = old.call(this, e);
            Droppable[dropEvent](e, this);
            return result;
        };
    }
    connect("dragStart", "handleDragStart");
    connect("dragMove", "handleDragMove");
    connect("dragEnd", "handleDragEnd");
    /**
     * 创建一个新的可拖放区域。
     * @param elem 要拖放的元素。
     * @param options 拖放的选项。
     * @return 返回一个可拖放区域。
     */
    function droppable(elem, options) {
        const result = new Droppable();
        result.elem = elem;
        Object.assign(result, options);
        result.enable();
        return result;
    }
    exports.default = droppable;
});
//# sourceMappingURL=drop.js.map