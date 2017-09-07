define(["require", "exports", "util/query"], function (require, exports, query_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 表示一个 AJAX 请求。
     */
    class Ajax {
        /**
         * 发送当前的请求。
         * @return 如果请求发送成功则返回 true，否则返回 false。
         */
        send() {
            // 设置属性默认值。
            this.type = this.type || "GET";
            this.url = this.url || location.href;
            if (this.data != null && !(this.data instanceof FormData)) {
                this.contentType = this.contentType || "application/x-www-form-urlencoded";
                if (typeof this.data === "object") {
                    this.data = this.contentType === "application/json" && this.type !== "GET" ? JSON.stringify(this.data) : query_1.formatQuery(this.data);
                }
                if (this.type === "GET") {
                    this.url += (this.url.indexOf("?") >= 0 ? "&" : "?") + this.data;
                    this.data = null;
                }
            }
            this.async = this.async !== false;
            // 准备请求。
            const xhr = this.xhr = new XMLHttpRequest();
            const end = this._end = (message, inerternalError) => {
                try {
                    // 不重复执行回调。
                    // 忽略 onreadystatechange 最后一次之前的调用。
                    if (!this._end || (!inerternalError && xhr.readyState !== 4)) {
                        return;
                    }
                    delete this._end;
                    // 删除 readystatechange  。
                    xhr.onreadystatechange = null;
                    // 判断是否存在错误。
                    if (inerternalError) {
                        this.status = inerternalError;
                        // 手动中止请求。
                        if (xhr.readyState !== 4) {
                            xhr.abort();
                        }
                    }
                    else {
                        this.status = xhr.status;
                        try {
                            this.statusText = xhr.statusText;
                        }
                        catch (firefoxCrossDomainError) {
                            // 如果跨域，火狐会报错。
                            this.statusText = "";
                        }
                        if (checkStatus(this.status)) {
                            try {
                                this.responseText = xhr.responseText;
                            }
                            catch (ieResponseTextError) {
                                // IE6-9：请求二进制格式的文件报错。
                                this.responseText = "";
                            }
                            message = null;
                        }
                        else {
                            message = this.status + ": " + this.statusText;
                        }
                    }
                }
                catch (firefoxAccessError) {
                    return end(firefoxAccessError, -5);
                }
                // 执行用户回调。
                if (message) {
                    this.error && this.error(message, this);
                }
                else {
                    this.success && this.success(this.responseText, this);
                }
                this.complete && this.complete(message, this);
            };
            // 发送请求。
            try {
                if (this.username) {
                    xhr.open(this.type, this.url, this.async, this.username, this.password);
                }
                else {
                    xhr.open(this.type, this.url, this.async);
                }
            }
            catch (ieOpenError) {
                // IE: 地址错误时可能产生异常。
                end(ieOpenError, -3);
                return false;
            }
            for (const header in this.headers) {
                try {
                    xhr.setRequestHeader(header, this.headers[header]);
                }
                catch (firefoxSetHeaderError) {
                    // FF: 跨域时设置头可能产生异常。
                }
            }
            if (this.contentType) {
                try {
                    xhr.setRequestHeader("Content-Type", this.contentType);
                }
                catch (firefoxSetHeaderError) {
                    // FF: 跨域时设置头可能产生异常。
                }
            }
            if (this.withCredentials) {
                xhr.withCredentials = true;
            }
            try {
                xhr.send(this.data);
            }
            catch (sendError) {
                // 地址错误时产生异常 。
                end(sendError, -4);
                return false;
            }
            // 同步时火狐不会自动调用 onreadystatechange
            if (!this.async) {
                end(null, 0);
                return true;
            }
            // 绑定 onreadystatechange， 让 xhr 根据请求情况调用 done。
            xhr.onreadystatechange = end;
            if (this.timeout >= 0) {
                setTimeout(() => {
                    end("Timeout", -2);
                }, this.timeout);
            }
            return true;
        }
        /**
         * 终止当前请求。
         */
        abort() {
            this._end && this._end("Aborted", -1);
        }
    }
    exports.Ajax = Ajax;
    /**
     * 判断一个 HTTP 状态码是否表示正确响应。
     * @param status 要判断的状态码。
     * @return 如果正确则返回true, 否则返回 false 。一般地， 200、304、1223 被认为是正确的状态吗。
     */
    function checkStatus(status) {
        if (!status) {
            const protocol = window.location.protocol;
            // CH: status 在有些协议不存在。
            return protocol === "file:" || protocol === "chrome:" || protocol === "app:";
        }
        return status >= 200 && status < 300 || status == 304 || status == 1223;
    }
    exports.checkStatus = checkStatus;
    /**
     * 发送一个 Ajax 请求。
     * @param options 发送的选项。
     * @return 如果未设置任何回调函数则返回一个确认对象。
     */
    function ajax(options) {
        const ajax = new Ajax();
        Object.assign(ajax, options);
        if (!ajax.success && !ajax.error && !ajax.complete) {
            return new Promise((resolve, reject) => {
                ajax.success = resolve;
                ajax.error = reject;
                ajax.send();
            });
        }
        ajax.send();
    }
    exports.default = ajax;
});
//# sourceMappingURL=ajax.js.map