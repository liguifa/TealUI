define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 解析中国身份证号的信息。
     * @param value 要解析的身份证号。
     * @return 返回一个 JSON，如：
     * ```json
     * {
     *      "valid": true,      // 表示身份证信息合法。
     *      "birthday": Date(), // 表示生日。
     *      "sex": false        // 表示性别。true 表示 '男'。
     * }
     * ```
     * @example parseChineseId("152500198909267865")
     * @desc 本函数只验证身份证的数值特征，因此只适用于过滤无效的身份证号，并不能判定身份证是否真实存在。
     */
    function parseChineseId(value) {
        const province = +value.substr(0, 2);
        const city = +value.substr(2, 2);
        const county = +value.substr(4, 2);
        // 身份证 6 - 13 表示生日。
        const birthdayYear = +value.substr(6, 4);
        const birthdayMonth = +value.substr(10, 2) - 1;
        const birthdayDay = +value.substr(12, 2);
        const birthday = new Date(birthdayYear, birthdayMonth, birthdayDay);
        // 身份证 17 表示检验码。
        let valid = province > 10 && city >= 0 && county >= 0 &&
            birthday.getFullYear() === birthdayYear &&
            birthday.getMonth() === birthdayMonth &&
            birthday.getDate() === birthdayDay;
        if (valid) {
            let code = 0;
            for (let i = 0; i < 18; i++) {
                const bit = value.charCodeAt(17 - i);
                code += ((1 << i) % 11) * (!i && (bit | 32) === 120 /*x*/ ? 10 : bit > 47 && bit < 58 ? bit - 48 : NaN);
            }
            valid = code % 11 === 1;
        }
        // 身份证 16 表示性别。
        return {
            /**
             * 判断当前身份证是否合法。
             */
            valid,
            /**
             * 获取当前身份证的省份（自治区、直辖市）序号。
             */
            province,
            /**
             * 获取当前身份证的地级市（州、盟）序号。
             */
            city,
            /**
             * 获取当前身份证的县级市（区、旗）序号。
             */
            county,
            /**
             * 获取当前身份证的生日。
             */
            birthday,
            /**
             * 获取当前身份证的性别。true 表示 '男', false 表示 '女'。
             */
            sex: value.charCodeAt(16) % 2 === 1
        };
    }
    exports.default = parseChineseId;
});
//# sourceMappingURL=chineseId.js.map