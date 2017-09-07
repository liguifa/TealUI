define(["require", "exports", "./md5"], function (require, exports, md5_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 将字节数组转为 Base64。
     * @param value 要解码的二进制数组。
     * @return 返回字符串。
     * @private
     */
    function binaryToBase64(value, base64Padding = "") {
        let result = "";
        for (let i = 0; i < value.length * 4; i += 3) {
            const triplet = (value[i >> 2] >> i % 4 * 8 & 255) << 16 | (value[i + 1 >> 2] >> (i + 1) % 4 * 8 & 0xff) << 8 | value[i + 2 >> 2] >> (i + 2) % 4 * 8 & 0xff;
            for (let j = 0; j < 4; j++) {
                result += i * 8 + j * 6 > value.length * 32 ? base64Padding : ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((triplet >> 6 * (3 - j)) & 0x3F));
            }
        }
        return result;
    }
    exports.binaryToBase64 = binaryToBase64;
    /**
     * 使用 MD5 和 Base64 算法加密指定字符串。
     * @param value 要计算的字符串。
     * @return 返回加密后的字符串，其中只包含小写字母。
     * @example base64Md5("abc") // "kAFQmDzST7DWlj99KOF/cg"
     */
    function base64Md5(value) {
        return binaryToBase64(md5_1.raw(value));
    }
    exports.base64Md5 = base64Md5;
    /**
     * 使用 HMAC-MD5 算法加密指定字符串。
     * @param value 要计算的字符串。
     * @param key 加密的密钥。
     * @return 返回加密后的字符串，其中只包含小写字母。
     * @example hmacMd5("abc", "key") // "d2fe98063f876b03193afb49b4979591"
     */
    function hmacMd5(value, key) {
        return md5_1.binaryToString(hmacRaw(value, key));
    }
    exports.hmacMd5 = hmacMd5;
    /**
     * 使用 HMAC-MD5 和 Base64 算法加密指定字符串。
     * @param value 要计算的字符串。
     * @param key 加密的密钥。
     * @return 返回加密后的字符串，其中只包含小写字母。
     * @example base64HmacMd5("abc", "key") // "0v6YBj+HawMZOvtJtJeVkQ"
     */
    function base64HmacMd5(value, key) {
        return binaryToBase64(hmacRaw(value, key));
    }
    exports.base64HmacMd5 = base64HmacMd5;
    /**
     * 执行 HMAC-MD5 加密算法。
     * @param value 要计算的字符串。
     * @param key 加密的密钥。
     * @private
     */
    function hmacRaw(value, key) {
        value = unescape(encodeURIComponent(value));
        key = unescape(encodeURIComponent(key));
        let bkey = md5_1.stringToBinary(key);
        if (bkey.length > 16)
            bkey = md5_1.calc(bkey, key.length * 8);
        const ipad = [];
        const opad = [];
        for (let i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        return md5_1.calc(opad.concat(md5_1.calc(ipad.concat(md5_1.stringToBinary(value)), 512 + value.length * 8)), 512 + 128);
    }
    exports.hmacRaw = hmacRaw;
});
//# sourceMappingURL=md5-more.js.map