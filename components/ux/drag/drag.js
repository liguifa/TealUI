define(["require", "exports", "ux/dom", "ux/scroll"], function (require, exports, dom_1, scroll_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个可拖动对象。
     */
    class Draggable {
        /**
         * 启用拖动。
         */
        enable() { dom_1.on(this.handle, "pointerdown", this.handlePointerDown, this); }
        /**
         * 禁用拖动。
         */
        disable() { dom_1.off(this.handle, "pointerdown", this.handlePointerDown, this); }
        /**
         * 是否禁止拖动。
         * @param e 事件对象。
         */
        cancel(e) {
            return e.target !== this.handle && /^(?:input|textarea|button|select|option)/i.test(e.target.tagName);
        }
        /**
         * 处理指针按下事件。
         * @param e 事件对象。
         */
        handlePointerDown(e) {
            if (e.which === 1 && !this.cancel(e)) {
                // 禁用选区。
                e.preventDefault();
                // 不允许两个对象同时拖动。
                if (Draggable.current) {
                    Draggable.current.stopDragging(e);
                }
                // 记录当前的开始位置。
                this.endX = this.startX = e.pageX;
                this.endY = this.startY = e.pageY;
                // 设置下一步处理句柄。
                this._handler = this.startDragging;
                // 延时以避免将简单的点击作为拖动处理。
                this._timer = this.delay >= 0 ? setTimeout(() => {
                    this._timer = 0;
                    this._handler(e);
                }, this.delay) : -1;
                // 绑定拖动和停止拖动事件。
                const doc = this.handle.ownerDocument;
                dom_1.on(doc, "pointerup", this.handlePointerUp, this);
                dom_1.on(doc, "pointermove", this.handlePointerMove, this);
            }
        }
        /**
         * 处理指针移动事件。
         * @param e 事件对象。
         */
        handlePointerMove(e) {
            // 禁用选区。
            e.preventDefault();
            // 更新当前的鼠标位置。
            this.endX = e.pageX;
            this.endY = e.pageY;
            // 调用当前的处理句柄来处理此函数。
            this._handler(e);
        }
        /**
         * 处理指针松开事件。
         * @param e 事件对象。
         */
        handlePointerUp(e) {
            // 只有鼠标左键松开， 才认为是停止拖动。
            if (e.which === 1) {
                e.preventDefault();
                this.stopDragging(e);
            }
        }
        /**
         * 进入拖动状态。
         * @param e 事件对象。
         */
        startDragging(e) {
            // 进入拖动状态有两种可能：
            // 1. 鼠标按下超时。
            // 2. 鼠标按下然后移动超过一定距离。
            // 如果 _timer 非 0 说明是通过移动鼠标进入。
            if (this._timer) {
                // 忽略移动距离太小的调用。
                if (Math.pow((this.endY - this.startY), 2) + Math.pow((this.endX - this.startX), 2) < Math.pow(this.distance, 2)) {
                    return;
                }
                clearTimeout(this._timer);
                this._timer = 0;
            }
            // 更新当前正在拖动的对象。
            Draggable.current = this;
            // 锁定鼠标样式。
            this._orignalCursor = document.documentElement.style.cursor;
            document.documentElement.style.cursor = dom_1.getStyle(this.handle, "cursor");
            if ("pointerEvents" in document.body.style) {
                document.body.style.pointerEvents = "none";
            }
            else if (document.body.setCapture) {
                document.body.setCapture();
            }
            // 执行开始拖动回调，如果用户阻止和强制停止拖动。
            if (this.dragStart(e) !== false) {
                this._handler = this.dragMove;
                this.dragMove(e);
            }
            else {
                this.stopDragging(e);
            }
        }
        /**
         * 退出拖动状态。
         * @param e 事件对象。
         */
        stopDragging(e) {
            // 解绑全局指针松开事件。
            const doc = this.handle.ownerDocument;
            dom_1.off(doc, "pointermove", this.handlePointerMove, this);
            dom_1.off(doc, "pointerup", this.handlePointerUp, this);
            // 清空计时器。
            if (this._timer) {
                clearTimeout(this._timer);
                this._timer = 0;
            }
            // 如果在停止拖动时仍未开始拖动则作为点击事件触发。
            if (this._handler === this.startDragging && this.onDragCancel) {
                this.onDragCancel(e, this);
            }
            // 拖动结束。
            if (Draggable.current === this) {
                // 恢复鼠标样式。
                if (document.body.style.pointerEvents === "none") {
                    document.body.style.pointerEvents = "";
                }
                else if (document.body.releaseCapture)
                    document.body.releaseCapture();
                document.documentElement.style.cursor = this._orignalCursor;
                this.dragEnd(e);
                Draggable.current = undefined;
            }
        }
        /**
         * 触发拖动开始事件。
         * @param e 事件对象。
         * @return 如果返回 false 则忽略本次拖动。
         */
        dragStart(e) {
            if (this.onDragStart && this.onDragStart(e, this) === false) {
                return false;
            }
            const offset = dom_1.getOffset(this.elem);
            this.endClientX = this.startClientX = offset.x;
            this.endClientY = this.startClientY = offset.y;
            return true;
        }
        /**
         * 触发拖动移动事件。
         * @param e 事件对象。
         */
        dragMove(e) {
            this.endClientX = this.startClientX + this.endX - this.startX;
            this.endClientY = this.startClientY + this.endY - this.startY;
            if (!this.onDragMove || this.onDragMove(e, this) !== false) {
                this.elem.style.top = this.endClientY + "px";
                this.elem.style.left = this.endClientX + "px";
            }
        }
        /**
         * 触发拖动结束事件。
         * @param e 事件对象。
         */
        dragEnd(e) {
            this.onDragEnd && this.onDragEnd(e, this);
        }
        /**
         * 自动滚动屏幕。
         * @param scrollable 滚动的容器元素。
         * @param padding 判断是否在区域内的最小距离。
         * @param offset 如果需要滚动则额外偏移的距离。
         */
        autoScroll(scrollable, padding, offset) {
            scroll_1.scrollIntoViewIfNeeded(this.elem, scrollable, 0, padding, offset);
        }
        /**
         * 限制拖动的方向。
         * @param value 要设置的方向。
         */
        direction(value) {
            this[value === "vertical" ? "endClientX" : "endClientY"] = this[value === "vertical" ? "startClientX" : "startClientY"];
        }
        /**
         * 限制只能在指定区域内拖动。
         * @param container 限制的区域或元素。
         * @param padding 容器的内边距。
         */
        limit(container, padding = 0) {
            container = container.nodeType ? dom_1.getRect(container) : container;
            this.elem.style.top = this.endClientY + "px";
            this.elem.style.left = this.endClientX + "px";
            const currentRect = dom_1.getRect(this.elem);
            let delta;
            if ((delta = currentRect.x - container.x - padding) <= 0 || (delta = currentRect.x + currentRect.width - container.x - container.width + padding) >= 0) {
                this.endClientX -= delta;
            }
            if ((delta = currentRect.y - container.y - padding) <= 0 || (delta = currentRect.y + currentRect.height - container.y - container.height + padding) >= 0) {
                this.endClientY -= delta;
            }
        }
        /**
         * 设置当前拖动的步长。
         * @param value 拖动的步长。
         */
        step(value) {
            this.endClientY = this.startClientY + Math.floor((this.endClientY - this.startClientY + value / 2) / value) * value;
            this.endClientX = this.startClientX + Math.floor((this.endClientX - this.startClientX + value / 2) / value) * value;
        }
        /**
         * 还原节点位置。
         * @param duration 渐变的总毫秒数。
         */
        revert(duration) {
            this.disable();
            dom_1.animate(this.elem, {
                left: this.startClientX,
                top: this.startClientY,
            }, () => {
                this.enable();
            }, duration);
        }
        /**
         * 使当前元素吸附于目标位置。
         * @param target 吸附的目标区域或元素。
         * @param padding 容器的内边距。
         * @param distance 吸附的最小距离，当距离小于这个值后产生吸附效果。
         * @param position 吸附的位置。
         * @return 如果未吸附成功则返回 0，如果水平吸附成功则返回 1，如果垂直吸附成功则返回 2，如果都吸附成功则返回 3。
         */
        snap(target, padding = 0, distance = 15, position = "both") {
            target = target.nodeType ? dom_1.getRect(target) : target;
            const inside = position !== "outside";
            const outside = position !== "inside";
            this.elem.style.top = this.endClientY + "px";
            this.elem.style.left = this.endClientX + "px";
            const rect = dom_1.getRect(this.elem);
            let result = 0;
            let deltaX = distance;
            if (inside) {
                deltaX = target.x + padding - rect.x;
                if (Math.abs(deltaX) >= distance) {
                    deltaX = target.x + target.width - padding - rect.x - rect.width;
                }
            }
            if (Math.abs(deltaX) >= distance && outside) {
                deltaX = target.x + padding - rect.x - rect.width;
                if (Math.abs(deltaX) >= distance) {
                    deltaX = target.x + target.width - padding - rect.x;
                }
            }
            if (Math.abs(deltaX) < distance) {
                this.endClientX += deltaX;
                result += 1;
            }
            let deltaY = distance;
            if (inside) {
                deltaY = target.y + padding - rect.y;
                if (Math.abs(deltaY) >= distance) {
                    deltaY = target.y + target.height - padding - rect.y - rect.height;
                }
            }
            if (Math.abs(deltaY) >= distance && outside) {
                deltaY = target.y + padding - rect.y - rect.height;
                if (Math.abs(deltaY) >= distance) {
                    deltaY = target.y + target.height - padding - rect.y;
                }
            }
            if (Math.abs(deltaY) < distance) {
                this.endClientY += deltaY;
                result += 2;
            }
            return result;
        }
    }
    exports.Draggable = Draggable;
    Draggable.prototype.delay = 500;
    Draggable.prototype.distance = 3;
    /**
     * 设置指定的元素可拖动。
     * @param elem 要拖动的元素。
     * @param options 拖动的选项。
     * @return 返回一个拖动对象。
     */
    function draggable(elem, options) {
        const position = dom_1.getStyle(elem, "position");
        if (!position || position === "static") {
            elem.style.position = "relative";
        }
        const result = new Draggable();
        result.handle = result.elem = elem;
        Object.assign(result, options);
        result.enable();
        return result;
    }
    exports.default = draggable;
});
//# sourceMappingURL=drag.js.map