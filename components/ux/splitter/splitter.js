define(["require", "exports", "ux/drag", "ux/dom", "./splitter.scss"], function (require, exports, drag_1, dom_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个分割条。
     */
    class Splitter extends drag_1.Draggable {
        /**
         * 获取当前滑块的值（0-1 之间）。
         */
        getValue() {
            const prop = this.horizontal ? "height" : "width";
            return dom_1.computeStyle(this.target1, prop) / dom_1.computeStyle(this.target1.parentNode, prop);
        }
        /**
         * 设置当前滑块的值。
         * @param value 要设置的值（0-1 之间）。
         */
        setValue(value) {
            const prop = this.horizontal ? "height" : "width";
            this.target1.style[prop] = value * 100 + "%";
            this.target2.style[prop] = (1 - value) * 100 + "%";
            this.realign();
        }
        /**
         * 重新对齐分割条的位置。
         */
        realign() {
            const rect = dom_1.getRect(this.target2);
            delete rect[this.horizontal ? "height" : "width"];
            rect[this.horizontal ? "y" : "x"] -= this.elem[this.horizontal ? "offsetHeight" : "offsetWidth"] / 2;
            dom_1.setRect(this.elem, rect);
        }
        /**
         * 触发拖动开始事件。
         * @param e 事件对象。
         * @return 如果返回 false 则忽略本次拖动。
         */
        dragStart(e) {
            dom_1.addClass(this.elem, "x-splitter-active");
            if (this.onDragStart && this.onDragStart(e, this) === false) {
                return false;
            }
            this.startValue = this.getValue();
            return true;
        }
        /**
         * 触发拖动移动事件。
         * @param e 事件对象。
         */
        dragMove(e) {
            this.endValue = Math.min(Math.max(this.startValue + (this.horizontal ? this.endY - this.startY : this.endX - this.startX) / dom_1.computeStyle(this.target1.parentNode, this.horizontal ? "height" : "width"), this.minValue), this.maxValue);
            if (!this.onDragMove || this.onDragMove(e, this) !== false) {
                this.setValue(this.endValue);
            }
        }
        /**
         * 触发拖动结束事件。
         * @param e 事件对象。
         */
        dragEnd(e) {
            dom_1.removeClass(this.elem, "x-splitter-active");
            this.onDragEnd && this.onDragEnd(e, this);
        }
    }
    exports.Splitter = Splitter;
    Splitter.prototype.minValue = 0.05;
    Splitter.prototype.maxValue = 0.95;
    /**
     * 创建一个分割条。
     * @param target1 分割的第一个目标。
     * @param target2 分割的第二个目标。
     * @param options 分割条的选项。
     */
    function splitter(target1, target2, options) {
        const splitter = new Splitter();
        splitter.target1 = target1;
        splitter.target2 = target2;
        splitter.handle = splitter.elem = target1.parentNode.appendChild(document.createElement("div"));
        splitter.elem.className = "x-splitter";
        Object.assign(splitter, options);
        splitter.realign();
        splitter.enable();
        return splitter;
    }
    exports.default = splitter;
});
//# sourceMappingURL=splitter.js.map