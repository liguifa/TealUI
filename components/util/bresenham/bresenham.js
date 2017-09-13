define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 创建一个贝塞尔曲线。
     * @param x0 起始点的水平坐标。
     * @param y0 起始点的垂直坐标。
     * @param x1 结束点的水平坐标。
     * @param y1 结束点的垂直坐标。
     * @param callback 所有生成的点的回调函数。
     * @return 如果未提供回调函数则返回生成的点坐标。
     */
    function bresenham(x0, y0, x1, y1, callback) {
        let result;
        if (!callback) {
            result = [];
        }
        const dx = x1 - x0;
        const dy = y1 - y0;
        const adx = Math.abs(dx);
        const ady = Math.abs(dy);
        const sx = dx > 0 ? 1 : -1;
        const sy = dy > 0 ? 1 : -1;
        let eps = 0;
        if (adx > ady) {
            for (let x = x0, y = y0; sx < 0 ? x >= x1 : x <= x1; x += sx) {
                if (callback) {
                    callback(x, y);
                }
                else {
                    result.push({ x, y });
                }
                eps += ady;
                if ((eps << 1) >= adx) {
                    y += sy;
                    eps -= adx;
                }
            }
        }
        else {
            for (let x = x0, y = y0; sy < 0 ? y >= y1 : y <= y1; y += sy) {
                if (callback) {
                    callback(x, y);
                }
                else {
                    result.push({ x, y });
                }
                eps += adx;
                if ((eps << 1) >= ady) {
                    x += sx;
                    eps -= ady;
                }
            }
        }
        return result;
    }
    exports.default = bresenham;
});
//# sourceMappingURL=bresenham.js.map