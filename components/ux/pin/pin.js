define(["require", "exports", "ux/dom", "ux/scroll"], function (require, exports, dom_1, scroll_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const knownAligns = {
        center: "cc-cc",
        leftTop: "ll-tb",
        left: "ll-cc",
        leftBottom: "ll-bt",
        rightBottom: "lr-bb",
        right: "rr-cc",
        rightTop: "rr-tb",
        topRight: "rl-tt",
        top: "cc-tt",
        topLeft: "lr-tt",
        bottomLeft: "lr-bb",
        bottom: "cc-bb",
        bottomRight: "rl-bb"
    };
    /**
     * 将元素对齐到其它节点或区域。
     * @param elem 要定位的元素。
     * @param target 对齐的目标节点或区域。
     * @param align 对齐的位置。
     * 位置使用格式为“xx-yy”的字符串表示。
     *
     * 其中 xx 表示水平方向的位置，可取以下值之一：
     * - ll: 对齐到 target 左边框的左侧。
     * - lr: 对齐到 target 左边框的右侧。
     * - cc: 对齐到 target 水平居中位置。
     * - rl: 对齐到 target 右边框的左侧。
     * - rr: 对齐到 target 右边框的右侧。
     *
     * 其中 yy 表示垂直方向的位置，可取以下值之一：
     * - tt: 对齐到 target 上边框的上侧。
     * - tb: 对齐到 target 上边框的下侧。
     * - cc: 对齐到 target 垂直居中位置。
     * - bt: 对齐到 target 下边框的上侧。
     * - bb: 对齐到 target 下边框的下侧。
     *
     * 对于常见的位置，也可以直接使用下图中的字符串表示：
     * ```
     * |        topLeft   top   topRight
     * |           ┌───────────────┐
     * |   leftTop │               │ rightTop
     * |           │               │
     * |      left │     center    │ right
     * |           │               │
     * |leftBottom │               │ rightBottom
     * |           └───────────────┘
     * |     bottomLeft bottom bottomRight
     * ```
     * @param margin 元素的外边距。
     * @param container 容器节点或区域，定位超出容器后会自动调整。如果为 null 则不自动调整位置。
     * @param containerPadding 容器的内边距。
     * @param offset 定位后的额外偏移距离。如果小于 1，则表示相对元素大小的百分比。
     * @param resize 如果容器比元素小，是否允许更改元素大小。
     * @return 返回定位结果。
     * @example pin(document.getElementById("pin_popover"), document.getElementById("pin_target"))
     */
    function pin(elem, target, align = "bottomLeft", margin = 0, container = scroll_1.scrollParent(elem), containerPadding = 10, offset = 0, resize = /^(?:auto|scroll)$/.test(dom_1.getStyle(elem, "overflow"))) {
        // 如果上一次定位更新了大小则先恢复默认大小。
        if (resize !== false) {
            const style = elem.style;
            if (style.__width__ != null) {
                style.width = style.__width__;
                delete style.__width__;
            }
            if (style.__height__ != null) {
                style.height = style.__height__;
                delete style.__height__;
            }
        }
        // 计算相关的矩形。
        const result = dom_1.getRect(elem);
        result.align = align = (knownAligns[align] || align);
        result.target = target = target.nodeType ? dom_1.getRect(target) : target;
        if (container) {
            result.container = container = container.nodeType ? dom_1.getRect(container) : Object.assign({}, container);
            container.x += containerPadding;
            container.y += containerPadding;
            container.width -= containerPadding + containerPadding;
            container.height -= containerPadding + containerPadding;
        }
        const proc = (x, width, offset, center, left, right) => {
            // 检测容器大小是否超出容器。
            if (resize && container && result[width] > container[width]) {
                result["scale" + x.toUpperCase()] = true;
                elem.style["__" + width + "__"] = elem.style[width];
                result[width] = container[width];
            }
            // 计算位置。
            if (offset < 1 && offset > -1) {
                offset *= result[width];
            }
            let value = target[x] + (center ?
                (target[width] - result[width]) / 2 + offset :
                (left ? 0 : target[width]) + (right ? offset : -result[width] - offset));
            // 检测位置是否超出容器。
            if (container) {
                const leftBound = container[x];
                const rightBound = leftBound + container[width] - result[width];
                if ((center || !right) && value < leftBound || (center || right) && value > rightBound) {
                    // 对于左右边对齐的布局，先尝试翻转布局。
                    if (!center) {
                        const rotateX = "rotate" + x.toUpperCase();
                        if (!result[rotateX]) {
                            result[rotateX] = true;
                            proc(x, width, offset, center, !left, !right);
                            return;
                        }
                    }
                    // 如果翻转后仍然超出位置再移动位置。
                    result["transform" + x.toUpperCase()] = true;
                    value = value < leftBound ? leftBound : rightBound;
                }
            }
            // 对位置进行四舍五入以避免因 < 1px 误差产生的抖动。
            result[x] = Math.round(value);
        };
        proc("x", "width", /(?:bt|cc|tb)$/.test(align) ? margin : offset, align.charAt(1) === "c", align.charAt(0) === "l", align.charAt(1) === "r");
        proc("y", "height", /^(?:lr|cc|rl)/.test(align) ? margin : offset, align.charAt(4) === "c", align.charAt(3) === "t", align.charAt(4) === "b");
        dom_1.setRect(elem, result.scaleX || result.scaleY ? result : { x: result.x, y: result.y });
        return result;
    }
    exports.default = pin;
});
//# sourceMappingURL=pin.js.map