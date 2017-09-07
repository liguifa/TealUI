define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 线性渐变。
     * @param x 要渐变的值。
     * @return 返回渐变后的值。
     */
    function linear(x) {
        return x;
    }
    exports.linear = linear;
    /**
     * 抛物线渐变。
     * @param x 要渐变的值。
     * @param base 渐变的基数。
     * @return 返回渐变后的值。
     */
    function power(x, base = 3) {
        return Math.pow(x, base);
    }
    exports.power = power;
    /**
     * 指数渐变。
     * @param x 要渐变的值。
     * @return 返回渐变后的值。
     */
    function exponential(x) {
        return Math.pow(2, 8 * (x - 1));
    }
    exports.exponential = exponential;
    /**
     * 双三角渐变。
     * @param x 要渐变的值。
     * @return 返回渐变后的值。
     */
    function circular(x) {
        return 1 - Math.sin(Math.acos(x));
    }
    exports.circular = circular;
    /**
     * 上三角渐变。
     * @param x 要渐变的值。
     * @return 返回渐变后的值。
     */
    function sinusoidal(x) {
        return 1 - Math.sin((1 - x) * Math.PI / 2);
    }
    exports.sinusoidal = sinusoidal;
    /**
     * 后退渐变。
     * @param x 要渐变的值。
     * @param base 渐变的基数。
     * @return 返回渐变后的值。
     */
    function back(x, base = 1.618) {
        return Math.pow(x, 2) * ((base + 1) * x - base);
    }
    exports.back = back;
    /**
     * 弹跳渐变。
     * @param x 要渐变的值。
     * @return 返回渐变后的值。
     */
    function bounce(x) {
        for (let i = 0, j = 1; 1; i += j, j /= 2) {
            if (x >= (7 - 4 * i) / 11) {
                return j * j - Math.pow((11 - 6 * i - 11 * x) / 4, 2);
            }
        }
    }
    exports.bounce = bounce;
    /**
     * 弹力渐变。
     * @param x 要渐变的值。
     * @param base 渐变的基数。
     * @return 返回渐变后的值。
     */
    function elastic(x, base = 1) {
        return Math.pow(2, 10 * --x) * Math.cos(20 * x * Math.PI * x / 3);
    }
    exports.elastic = elastic;
    /**
     * 返回一个源渐变曲线。
     * @param transition 渐变函数。
     * @return 返回渐变函数。
     */
    function easeIn(transition) {
        return transition;
    }
    exports.easeIn = easeIn;
    /**
     * 返回一个反向渐变曲线。
     * @param transition 渐变函数。
     * @return 返回渐变函数。
     */
    function easeOut(transition) {
        return function (x) {
            return 1 - transition(1 - x);
        };
    }
    exports.easeOut = easeOut;
    /**
     * 返回一个先正向再反向渐变曲线。
     * @param transition 渐变函数。
     * @return 返回渐变函数。
     */
    function easeInOut(transition) {
        return function (x) {
            return (x <= 0.5) ? transition(2 * x) / 2 : (2 - transition(2 * (1 - x))) / 2;
        };
    }
    exports.easeInOut = easeInOut;
});
//# sourceMappingURL=transitions.js.map