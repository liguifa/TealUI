define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const dateFormators = {
        __proto__: null,
        y: (date, format) => {
            const year = date.getFullYear();
            return format.length < 3 ? year % 100 : year;
        },
        M: (date) => date.getMonth() + 1,
        d: (date) => date.getDate(),
        H: (date) => date.getHours(),
        m: (date) => date.getMinutes(),
        s: (date) => date.getSeconds(),
        e: (date) => "日一二三四五六".charAt(date.getDay())
    };
    /**
     * 格式化指定的日期对象。
     * @param date 要处理的日期对象。
     * @param format 格式字符串。其中以下字符(区分大小写)会被替换：
     *
     * 字符| 意义        | 示例
     * ----|------------|--------------------
     * y   | 年         | yyyy: 1999, yy: 99
     * M   | 月         | MM: 09, M: 9
     * d   | 日         | dd: 09, d: 9
     * H   | 时(24小时制)| HH: 13, H: 13
     * m   | 分         | mm: 06, m: 6
     * s   | 秒         | ss: 06, s: 6
     * e   | 周         | 周e: 周一
     *
     * @return 返回格式化后的字符串。
     * @example format(new Date("2016/01/01 00:00:00")) // "2016/01/01 00:00:00"
     * @example format(new Date("2016/01/01 00:00:00"), "yyyyMMdd") // "20160101"
     * @see https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
     */
    function format(date = new Date(), format = "yyyy/MM/dd HH:mm:ss") {
        return format.replace(/([yMdHms])\1*/g, (all, key) => {
            key = dateFormators[key](date, all) + "";
            while (key.length < all.length) {
                key = "0" + key;
            }
            return key;
        });
    }
    exports.format = format;
    /**
     * 将指定对象解析为日期对象。
     * @param value 要解析的对象。
     * @param format 格式字符串。其中以下字符(区分大小写)会被替换：
     *
     * 字符| 意义 | 示例
     * ----|-----|------
     * y   | 年  | 2014
     * M   | 月  | 9
     * d   | 日  | 9
     * H   | 时  | 9
     * y   | 分  | 6
     * y   | 秒  | 6
     * @return 返回分析出的日期对象。
     * @example parse("2014-1-1") // new Date("2014/1/1")
     * @example parse("20140101") // new Date("2014/1/1")
     * @example parse("2014年1月1日", "yyyy年MM月dd日") // new Date("2014/1/1")
     */
    function parse(value, format) {
        if (value && !(value instanceof Date)) {
            if (format) {
                const groups = [0];
                const obj = {};
                const match = new RegExp(format.replace(/([-.*+?^${}()|[\]\/\\])/g, "\$1")
                    .replace(/([yMdHms])\1*/g, (all, w) => {
                    groups.push(w);
                    return "\\s*(\\d+)?\\s*";
                })).exec(value);
                if (match) {
                    for (let i = 1; i < match.length; i++) {
                        obj[groups[i]] = +match[i];
                    }
                }
                value = new Date(obj.y || new Date().getFullYear(), obj.M ? obj.M - 1 : new Date().getMonth(), obj.d || 1, obj.H || 0, obj.m || 0, obj.s || 0);
            }
            else {
                const obj = new Date(value);
                value = +obj ? obj : new Date(String(value).replace(/(\d{4})\D*(\d\d?)\D*(\d\d?).*(\d\d?)\D*(\d\d?)\D*(\d\d?)/, "$1/$2/$3 $4:$5:$6").replace(/(\d{4})\D*(\d\d?)\D*(\d\d?)/, "$1/$2/$3"));
            }
        }
        return value;
    }
    exports.parse = parse;
    /**
     * 创建当前日期对象的副本。
     * @return 返回新日期对象。
     * @example clone(new Date("2014/1/1")) // new Date("2014/1/1")
     */
    function clone(date) {
        return new Date(+date);
    }
    exports.clone = clone;
    /**
     * 计算日期添加指定年数后的新日期。
     * @param value 要添加的年数。如果小于 0 则倒数。
     * @return 返回新日期对象。
     * @example addYear(new Date("2014/1/1"), 1) // new Date("2015/1/1")
     */
    function addYear(date, value) {
        return addMonth(date, value * 12);
    }
    exports.addYear = addYear;
    /**
     * 计算日期添加指定月数后的新日期。
     * @param value 要添加的月数。如果小于 0 则倒数。
     * @return 返回新日期对象。
     * @example addMonth(new Date("2014/1/1"), 1) // new Date("2014/2/1")
     */
    function addMonth(date, value) {
        const result = new Date(+date);
        result.setMonth(result.getMonth() + value);
        if (date.getDate() !== result.getDate()) {
            result.setDate(0);
        }
        return result;
    }
    exports.addMonth = addMonth;
    /**
     * 计算日期添加指定周后的新日期。
     * @param value 要添加的周数。如果小于 0 则倒数。
     * @return 返回新日期对象。
     * @example addWeek(new Date("2014/1/1"), 1) // new Date("2014/1/8")
     */
    function addWeek(date, value) {
        return new Date(+date + value * 604800000);
    }
    exports.addWeek = addWeek;
    /**
     * 计算日期添加指定天数后的新日期。
     * @param value 要添加的天数。如果小于 0 则倒数。
     * @return 返回新日期对象。
     * @example addDay(new Date("2014/1/1"), 1) // new Date("2014/1/2")
     */
    function addDay(date, value) {
        return new Date(+date + value * 86400000);
    }
    exports.addDay = addDay;
    /**
     * 计算日期添加指定小时后的新日期。
     * @param value 要添加的小时数。如果小于 0 则倒数。
     * @return 返回新日期对象。
     * @example addHours(new Date("2014/1/1"), 1) // new Date("2014/1/1 01:00:00")
     */
    function addHours(date, value) {
        return new Date(+date + value * 3600000);
    }
    exports.addHours = addHours;
    /**
     * 计算日期添加指定分数后的新日期。
     * @param value 要添加的分钟数。如果小于 0 则倒数。
     * @return 返回新日期对象。
     * @example addMinutes(new Date("2014/1/1"), 1) // new Date("2014/1/1 00:01:00")
     */
    function addMinutes(date, value) {
        return new Date(+date + value * 60000);
    }
    exports.addMinutes = addMinutes;
    /**
     * 计算日期添加指定秒后的新日期。
     * @param value 要添加的秒数。如果小于 0 则倒数。
     * @return 返回新日期对象。
     * @example addSeconds(new Date("2014/1/1"), 1) // new Date("2014/1/1 00:00:01")
     */
    function addSeconds(date, value) {
        return new Date(+date + value * 1000);
    }
    exports.addSeconds = addSeconds;
    /**
     * 计算日期添加指定毫秒后的新日期。
     * @param value 要添加的毫秒数。如果小于 0 则倒数。
     * @return 返回新日期对象。
     * @example addMilliseconds(new Date("2014/1/1"), 1000) // new Date("2014/1/1 00:00:01")
     */
    function addMilliseconds(date, value) {
        return new Date(+date + value);
    }
    exports.addMilliseconds = addMilliseconds;
    /**
     * 获取日期的日期部分。
     * @return 返回新日期对象，其小时部分已被清零。
     * @example toDay(new Date("2014/1/1 12:00:00")) // new Date("2014/1/1")
     */
    function toDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    exports.toDay = toDay;
    /**
     * 计算当前日期到同年某月某日的剩余天数。如果今年指定日期已过，则计算到明年同月日的剩余天数。
     * @param month 月。
     * @param day 天。
     * @return 返回剩余天数。
     * @example dayLeft(new Date("2014/12/3"), 12, 5) // 2
     * @example dayLeft(new Date("2014/12/4"), 12, 5) // 1
     * @example dayLeft(new Date("2014/12/5"), 12, 5) // 0
     * @example dayLeft(new Date("2014/12/6"), 12, 5) // 364
     */
    function dayLeft(date, month, day) {
        const tmp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let offset = new Date(date.getFullYear(), month - 1, day) - tmp;
        if (offset < 0) {
            offset = new Date(date.getFullYear() + 1, month - 1, day) - tmp;
        }
        return offset / 86400000;
    }
    exports.dayLeft = dayLeft;
    /**
     * 获取两个日期相差的天数。
     * @param x 比较的第一个日期。
     * @param y 比较的第二个日期
     * @return 返回 *dateY* 减去 *dateX* 相差的天数。不足一天的部分被忽略。
     * @example compareDay(new Date(2014, 1, 1), new Date(2014, 1, 2)) // 1
     */
    function compareDay(x, y) {
        return Math.floor((y - x) / 86400000);
    }
    exports.compareDay = compareDay;
    /**
     * 判断指定的年份是否是闰年。
     * @param year 要判断的年份。
     * @return 如果 *year* 是闰年，则返回 true，否则返回 false。
     * @example isLeapYear(2004) // true
     * @example isLeapYear(2000) // true
     * @example isLeapYear(2100) // false
     * @example isLeapYear(2002) // false
     */
    function isLeapYear(year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }
    exports.isLeapYear = isLeapYear;
    /**
     * 判断指定的数值所表示的日期是否合法（如2月30日是不合法的）。
     * @param year 要判断的年。
     * @param month 要判断的月。
     * @param day 要判断的日。
     * @param hour 要判断的时。
     * @param minute 要判断的分。
     * @param second 要判断的秒。
     * @param milliSecond 要判断的毫秒。
     * @return 如果指定的数值合法则返回 true，否则返回 false。
     * @example isValid(2004, 2, 29) // true
     */
    function isValid(year, month, day = 1, hour = 0, minute = 0, second = 0, milliSecond = 0) {
        const date = new Date(year, month - 1, day, hour, minute, second, milliSecond);
        return year === date.getFullYear() && month === date.getMonth() + 1 && day === date.getDate() && hour === date.getHours() && minute === date.getMinutes() && second === date.getSeconds() && milliSecond === date.getMilliseconds();
    }
    exports.isValid = isValid;
    /**
     * 获取指定年的指定月有多少天。
     * @param year 指定的年。
     * @param month 指定的月。
     * @return 返回指定年的指定月的天数。
     * @example getDayInMonth(2001, 1) // 31
     * @example getDayInMonth(2001, 2) // 28
     * @example getDayInMonth(2004, 2) // 29
     */
    function getDayInMonth(year, month) {
        return (new Date(year, month) - new Date(year, month - 1)) / 86400000;
    }
    exports.getDayInMonth = getDayInMonth;
    /**
     * 获取日期相差的周数。
     * @param base 作为第一周的日期。如果未指定则使用今年第一天作为第一周。
     * @return 返回周数。
     * @example getWeek(new Date("2014/1/15")) // 3
     * @example getWeek(new Date("2014/1/15"), new Date("2014/1/1")) // 3
     */
    function getWeek(date, base = new Date(date.getFullYear(), 0, 1)) {
        return Math.floor((date - base) / 604800000) + 1;
    }
    exports.getWeek = getWeek;
    /**
     * 获取日期的时区部分。
     * @return 返回时区部分。
     * @example getTimezone(new Date("Fri Feb 17 2017 16:54:41 GMT+0800")) // "GMT"
     */
    function getTimezone(date) {
        return date.toString()
            .replace(/^.*? ([A-Z]{3}).[0-9]{4}.*$/, "$1")
            .replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/, "$1$2$3");
    }
    exports.getTimezone = getTimezone;
    /**
     * 获取当月第一天。
     * @return 返回新日期对象。
     * @example toFirstDay(new Date("2016/2/15")) // new Date("2016/2/1")
     */
    function toFirstDay(date) {
        const result = new Date(+date);
        result.setDate(1);
        return result;
    }
    exports.toFirstDay = toFirstDay;
    /**
     * 获取当月最后一天。
     * @return 返回新日期对象。
     * @example toLastDay(new Date("2016/2/15")) // new Date("2016/2/29")
     */
    function toLastDay(date) {
        const result = new Date(+date);
        result.setDate(1);
        result.setMonth(result.getMonth() + 1);
        result.setDate(result.getDate() - 1);
        return result;
    }
    exports.toLastDay = toLastDay;
});
//# sourceMappingURL=date.js.map